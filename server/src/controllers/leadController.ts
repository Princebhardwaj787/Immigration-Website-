import { asyncHandler } from '../middleware/error';
import { Lead, LEAD_STATUSES } from '../models/Lead';
import { ContactMessage } from '../models/ContactMessage';
import { sendMail, notifyAdmin } from '../services/email';
import { escapeRegex } from '../utils/slugify';
import { ApiError } from '../utils/ApiError';
import type { AuthRequest } from '../middleware/auth';

/* ------------------------------------------------------------------ */
/* Public lead endpoints                                              */
/* ------------------------------------------------------------------ */

/** POST /api/leads - consultation booking */
export const createConsultation = asyncHandler(async (req, res) => {
  const lead = await Lead.create({ ...req.body, source: 'consultation' });

  await sendMail({
    to: lead.email,
    subject: 'Your consultation request has been received',
    text:
      `Hello ${lead.name},\n\n` +
      'Thank you. Your consultation request has been received. Our team will ' +
      'contact you regarding the next available appointment.\n\n' +
      'If you need to reach us sooner, please reply to this email or call us.\n\n' +
      'Note: This message is an acknowledgement only and does not constitute ' +
      'immigration or legal advice, nor does it guarantee any visa outcome.\n',
  });
  await notifyAdmin(
    `New consultation request — ${lead.name}`,
    `Visa type: ${lead.visaType}\nCountry: ${lead.country}\nEmail: ${lead.email}\nPhone: ${lead.phone}`,
  );

  res.status(201).json({
    success: true,
    message:
      'Thank you. Your consultation request has been received. Our team will contact you regarding the next available appointment.',
    id: lead.id,
  });
});

/** POST /api/eligibility - eligibility checker submission */
export const createEligibility = asyncHandler(async (req, res) => {
  const { ageRange, residence, destination, purpose, education, experience, budget, timeline, ...rest } =
    req.body;

  const lead = await Lead.create({
    ...rest,
    source: 'eligibility',
    country: residence,
    visaType: purpose,
    message:
      `Eligibility check request. Destination: ${destination} | Purpose: ${purpose} | ` +
      `Age: ${ageRange} | Education: ${education} | Experience: ${experience} | ` +
      `Budget: ${budget} | Timeline: ${timeline}`,
    eligibility: { ageRange, residence, destination, purpose, education, experience, budget, timeline },
  });

  await notifyAdmin(
    `Eligibility check — ${rest.name}`,
    `Destination: ${destination} | Purpose: ${purpose}`,
  );

  res.status(201).json({ success: true, id: lead.id });
});

/** POST /api/contact - general contact form */
export const createContact = asyncHandler(async (req, res) => {
  const msg = await ContactMessage.create(req.body);

  await sendMail({
    to: msg.email,
    subject: 'We have received your message',
    text:
      `Hello ${msg.name},\n\nThank you for contacting FlyNest Overseas Consultancy. ` +
      'A member of our team will respond as soon as possible.\n\n' +
      'Note: This is an acknowledgement only and does not constitute immigration or legal advice.\n',
  });
  await notifyAdmin(`New contact message — ${msg.name}`, msg.message.slice(0, 500));

  res.status(201).json({
    success: true,
    message: 'Thank you. Your message has been received — our team will get back to you shortly.',
    id: msg.id,
  });
});

/* ------------------------------------------------------------------ */
/* Admin lead endpoints                                               */
/* ------------------------------------------------------------------ */

/** GET /api/admin/leads?search=&visaType=&country=&status=&page= */
export const listLeads = asyncHandler(async (req: AuthRequest, res) => {
  const search = String(req.query.search || '').trim();
  const visaType = String(req.query.visaType || '').trim();
  const country = String(req.query.country || '').trim();
  const status = String(req.query.status || '').trim();
  const includeArchived = req.query.archived === 'true';
  const page = Math.max(1, Number(req.query.page) || 1);
  const limit = Math.min(50, Math.max(1, Number(req.query.limit) || 20));

  const filter: Record<string, unknown> = {};
  if (!includeArchived) filter.archived = false;
  if (visaType) filter.visaType = visaType;
  if (country) filter.country = country;
  if (status) filter.status = status;
  if (search) {
    const rx = new RegExp(escapeRegex(search), 'i');
    filter.$or = [{ name: rx }, { email: rx }, { phone: rx }];
  }

  const [items, total] = await Promise.all([
    Lead.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean(),
    Lead.countDocuments(filter),
  ]);

  res.json({
    success: true,
    data: items.map((l) => ({ ...l, id: l._id })),
    pagination: { page, limit, total, pages: Math.ceil(total / limit) },
  });
});

/** GET /api/admin/leads/:id */
export const getLead = asyncHandler(async (req, res) => {
  const lead = await Lead.findById(req.params.id).lean();
  if (!lead) throw ApiError.notFound('Lead not found.');
  res.json({ success: true, data: { ...lead, id: lead._id } });
});

/** PATCH /api/admin/leads/:id/status */
export const updateLeadStatus = asyncHandler(async (req, res) => {
  const lead = await Lead.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true },
  );
  if (!lead) throw ApiError.notFound('Lead not found.');
  res.json({ success: true, data: { ...lead.toObject(), id: lead.id } });
});

/** POST /api/admin/leads/:id/notes */
export const addLeadNote = asyncHandler(async (req, res) => {
  const lead = await Lead.findById(req.params.id);
  if (!lead) throw ApiError.notFound('Lead not found.');
  const author = (req as AuthRequest).admin?.name || 'admin';
  lead.notes.push({ body: req.body.body, author } as never);
  await lead.save();
  res.json({ success: true, data: { ...lead.toObject(), id: lead.id } });
});

/** PATCH /api/admin/leads/:id/archive */
export const archiveLead = asyncHandler(async (req, res) => {
  const lead = await Lead.findByIdAndUpdate(
    req.params.id,
    { archived: req.body.archived !== false },
    { new: true },
  );
  if (!lead) throw ApiError.notFound('Lead not found.');
  res.json({ success: true, data: { ...lead.toObject(), id: lead.id } });
});

/** DELETE /api/admin/leads/:id */
export const deleteLead = asyncHandler(async (req, res) => {
  const lead = await Lead.findByIdAndDelete(req.params.id);
  if (!lead) throw ApiError.notFound('Lead not found.');
  res.json({ success: true, message: 'Lead deleted.' });
});

/** GET /api/admin/leads/meta - distinct filter values */
export const leadMeta = asyncHandler(async (_req, res) => {
  const [visaTypes, countries, statuses] = await Promise.all([
    Lead.distinct('visaType'),
    Lead.distinct('country'),
    Promise.resolve([...LEAD_STATUSES]),
  ]);
  res.json({
    success: true,
    data: {
      visaTypes: visaTypes.filter(Boolean).sort(),
      countries: countries.filter(Boolean).sort(),
      statuses,
    },
  });
});

/** GET /api/admin/messages - contact form submissions */
export const listMessages = asyncHandler(async (_req, res) => {
  const items = await ContactMessage.find().sort({ createdAt: -1 }).limit(100).lean();
  res.json({ success: true, data: items.map((m) => ({ ...m, id: m._id })) });
});
