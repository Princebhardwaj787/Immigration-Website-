import type { Model } from 'mongoose';
import type { Request } from 'express';
import { asyncHandler } from '../middleware/error';
import { ApiError } from '../utils/ApiError';
import { Service } from '../models/Service';
import { Country } from '../models/Country';
import { Faq } from '../models/Faq';
import { Testimonial } from '../models/Testimonial';
import { BlogPost, BLOG_CATEGORIES } from '../models/BlogPost';
import { slugify } from '../utils/slugify';

/* ------------------------------------------------------------------ */
/* Generic CRUD factory (admin-facing)                                */
/* ------------------------------------------------------------------ */

type CrudOptions = {
  /** Field used to look up a single record in :slug params. */
  slugField?: string;
  /** Shape a record for the client (strip internals if needed). */
  shape?: (doc: any) => any;
};

function crud(model: Model<any>, opts: CrudOptions = {}) {
  const shape = opts.shape || ((d: any) => d);

  const list = asyncHandler(async (req, res) => {
    const includeAll = req.query.all === 'true';
    const filter = includeAll ? {} : { published: true };
    const docs = await model.find(filter).sort({ order: 1, createdAt: -1 }).lean();
    res.json({ success: true, data: docs.map((d) => ({ ...shape(d), id: d._id })) });
  });

  const getOne = asyncHandler(async (req, res) => {
    const key = String(req.params.slug);
    const filter = opts.slugField
      ? { [opts.slugField]: key.toLowerCase() }
      : { _id: key };
    const doc: any = await model.findOne(filter).lean();
    if (!doc) throw ApiError.notFound('Resource not found.');
    res.json({ success: true, data: { ...shape(doc), id: doc._id } });
  });

  const create = asyncHandler(async (req, res) => {
    const body = { ...req.body };
    if (opts.slugField && !body[opts.slugField]) {
      body[opts.slugField] = slugify(body.title || body.name || String(Date.now()));
    }
    if (opts.slugField && typeof body[opts.slugField] === 'string') {
      body[opts.slugField] = slugify(body[opts.slugField]);
    }
    const doc = await model.create(body);
    res.status(201).json({ success: true, data: { ...shape(doc.toObject()), id: String(doc._id) } });
  });

  const update = asyncHandler(async (req, res) => {
    const body = { ...req.body };
    if (opts.slugField && typeof body[opts.slugField] === 'string') {
      body[opts.slugField] = slugify(body[opts.slugField]);
    }
    const doc = await model.findByIdAndUpdate(req.params.id, body, {
      new: true,
      runValidators: true,
    });
    if (!doc) throw ApiError.notFound('Resource not found.');
    res.json({ success: true, data: { ...shape(doc.toObject()), id: String(doc._id) } });
  });

  const remove = asyncHandler(async (req, res) => {
    const doc = await model.findByIdAndDelete(req.params.id);
    if (!doc) throw ApiError.notFound('Resource not found.');
    res.json({ success: true, message: 'Deleted.' });
  });

  return { list, getOne, create, update, remove };
}

/* ------------------------------------------------------------------ */
/* Services                                                           */
/* ------------------------------------------------------------------ */

const services = crud(Service, { slugField: 'slug' });

export const listServices = asyncHandler(async (_req, res) => {
  const docs = await Service.find({ published: true }).sort({ order: 1 }).lean();
  res.json({ success: true, data: docs.map((d) => ({ ...d, id: d._id })) });
});

export const getService = services.getOne;
export const adminListServices = services.list;
export const createService = services.create;
export const updateService = services.update;
export const deleteService = services.remove;

/* ------------------------------------------------------------------ */
/* Countries                                                           */
/* ------------------------------------------------------------------ */

const countries = crud(Country, { slugField: 'slug' });

export const listCountries = asyncHandler(async (_req, res) => {
  const docs = await Country.find({ published: true })
    .sort({ order: 1, name: 1 })
    .lean();
  res.json({
    success: true,
    data: docs.map((d) => ({
      id: d._id,
      slug: d.slug,
      name: d.name,
      image: d.image,
      tagline: d.tagline,
      visaCategories: d.visaCategories,
      popularPurposes: d.popularPurposes,
    })),
  });
});

export const getCountry = countries.getOne;
export const adminListCountries = countries.list;
export const createCountry = countries.create;
export const updateCountry = countries.update;
export const deleteCountry = countries.remove;

/* ------------------------------------------------------------------ */
/* FAQs                                                                */
/* ------------------------------------------------------------------ */

const faqs = crud(Faq);

export const listFaqs = asyncHandler(async (_req, res) => {
  const docs = await Faq.find({ published: true }).sort({ order: 1, createdAt: 1 }).lean();
  res.json({ success: true, data: docs.map((d) => ({ ...d, id: d._id })) });
});

export const adminListFaqs = faqs.list;
export const createFaq = faqs.create;
export const updateFaq = faqs.update;
export const deleteFaq = faqs.remove;

/* ------------------------------------------------------------------ */
/* Testimonials                                                        */
/* ------------------------------------------------------------------ */

const testimonials = crud(Testimonial);

export const listTestimonials = asyncHandler(async (_req, res) => {
  const docs = await Testimonial.find({ published: true })
    .sort({ order: 1, createdAt: -1 })
    .lean();
  res.json({ success: true, data: docs.map((d) => ({ ...d, id: d._id })) });
});

export const adminListTestimonials = testimonials.list;
export const createTestimonial = testimonials.create;
export const updateTestimonial = testimonials.update;
export const deleteTestimonial = testimonials.remove;

/* ------------------------------------------------------------------ */
/* Blog                                                                */
/* ------------------------------------------------------------------ */

const blog = crud(BlogPost, { slugField: 'slug' });

export const listPosts = asyncHandler(async (req: Request, res) => {
  const page = Math.max(1, Number(req.query.page) || 1);
  const limit = Math.min(24, Math.max(1, Number(req.query.limit) || 9));
  const category = String(req.query.category || '').trim();

  const filter: Record<string, unknown> = { published: true };
  if (category && (BLOG_CATEGORIES as readonly string[]).includes(category)) {
    filter.category = category;
  }

  const [items, total] = await Promise.all([
    BlogPost.find(filter)
      .select('-content')
      .sort({ publishedAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean(),
    BlogPost.countDocuments(filter),
  ]);

  res.json({
    success: true,
    data: items.map((d) => ({ ...d, id: d._id })),
    categories: BLOG_CATEGORIES,
    pagination: { page, limit, total, pages: Math.ceil(total / limit) },
  });
});

export const getPost = asyncHandler(async (req, res) => {
  const doc = await BlogPost.findOne({
    slug: String(req.params.slug).toLowerCase(),
    published: true,
  }).lean();
  if (!doc) throw ApiError.notFound('Article not found.');

  const related = await BlogPost.find({
    published: true,
    category: doc.category,
    _id: { $ne: doc._id },
  })
    .select('-content')
    .limit(3)
    .lean();

  res.json({
    success: true,
    data: { ...doc, id: doc._id },
    related: related.map((r) => ({ ...r, id: r._id })),
  });
});

export const adminListPosts = blog.list;
export const createPost = blog.create;
export const updatePost = blog.update;
export const deletePost = blog.remove;
