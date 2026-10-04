import { Router } from 'express';
import {
  createConsultation,
  createEligibility,
  createContact,
} from '../controllers/leadController';
import {
  listServices,
  getService,
  listCountries,
  getCountry,
  listFaqs,
  listTestimonials,
  listPosts,
  getPost,
} from '../controllers/contentController';
import { listChecklists, getChecklist } from '../controllers/checklistController';
import { validateBody } from '../middleware/validate';
import {
  consultationSchema,
  eligibilitySchema,
  contactSchema,
} from '../middleware/schemas';
import { formLimiter } from '../middleware/rateLimit';

const router = Router();

/* Forms (rate limited) */
router.post('/leads', formLimiter, validateBody(consultationSchema), createConsultation);
router.post('/eligibility', formLimiter, validateBody(eligibilitySchema), createEligibility);
router.post('/contact', formLimiter, validateBody(contactSchema), createContact);

/* Content */
router.get('/services', listServices);
router.get('/services/:slug', getService);
router.get('/countries', listCountries);
router.get('/countries/:slug', getCountry);
router.get('/faqs', listFaqs);
router.get('/testimonials', listTestimonials);
router.get('/blog', listPosts);
router.get('/blog/:slug', getPost);
router.get('/checklists', listChecklists);
router.get('/checklists/:visaType', getChecklist);

export default router;
