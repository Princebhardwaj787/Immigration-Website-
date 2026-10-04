import { Router } from 'express';
import { login, logout, me, requireAuth } from '../controllers/authController';
import { authLimiter } from '../middleware/rateLimit';
import { validateBody } from '../middleware/validate';
import { loginSchema } from '../middleware/schemas';

const router = Router();

router.post('/login', authLimiter, validateBody(loginSchema), login);
router.post('/logout', logout);
router.get('/me', requireAuth, me);

export default router;
