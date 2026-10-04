import { Router } from 'express';
import { requireAuth } from '../middleware/auth';
import { validateBody } from '../middleware/validate';
import {
  leadStatusSchema,
  noteSchema,
  serviceSchema,
  countrySchema,
  faqSchema,
  testimonialSchema,
  blogSchema,
} from '../middleware/schemas';
import {
  listLeads,
  getLead,
  updateLeadStatus,
  addLeadNote,
  archiveLead,
  deleteLead,
  leadMeta,
  listMessages,
} from '../controllers/leadController';
import { getStats } from '../controllers/statsController';
import {
  adminListServices,
  createService,
  updateService,
  deleteService,
  adminListCountries,
  createCountry,
  updateCountry,
  deleteCountry,
  adminListFaqs,
  createFaq,
  updateFaq,
  deleteFaq,
  adminListTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
  adminListPosts,
  createPost,
  updatePost,
  deletePost,
} from '../controllers/contentController';

const router = Router();

// Everything under /api/admin requires a valid admin session.
router.use(requireAuth);

/* Dashboard */
router.get('/stats', getStats);

/* Leads */
router.get('/leads', listLeads);
router.get('/leads/meta', leadMeta);
router.get('/leads/:id', getLead);
router.patch('/leads/:id/status', validateBody(leadStatusSchema), updateLeadStatus);
router.post('/leads/:id/notes', validateBody(noteSchema), addLeadNote);
router.patch('/leads/:id/archive', archiveLead);
router.delete('/leads/:id', deleteLead);
router.get('/messages', listMessages);

/* Services */
router.get('/services', adminListServices);
router.post('/services', validateBody(serviceSchema), createService);
router.put('/services/:id', validateBody(serviceSchema), updateService);
router.delete('/services/:id', deleteService);

/* Countries */
router.get('/countries', adminListCountries);
router.post('/countries', validateBody(countrySchema), createCountry);
router.put('/countries/:id', validateBody(countrySchema), updateCountry);
router.delete('/countries/:id', deleteCountry);

/* FAQs */
router.get('/faqs', adminListFaqs);
router.post('/faqs', validateBody(faqSchema), createFaq);
router.put('/faqs/:id', validateBody(faqSchema), updateFaq);
router.delete('/faqs/:id', deleteFaq);

/* Testimonials */
router.get('/testimonials', adminListTestimonials);
router.post('/testimonials', validateBody(testimonialSchema), createTestimonial);
router.put('/testimonials/:id', validateBody(testimonialSchema), updateTestimonial);
router.delete('/testimonials/:id', deleteTestimonial);

/* Blog */
router.get('/blog', adminListPosts);
router.post('/blog', validateBody(blogSchema), createPost);
router.put('/blog/:id', validateBody(blogSchema), updatePost);
router.delete('/blog/:id', deletePost);

export default router;
