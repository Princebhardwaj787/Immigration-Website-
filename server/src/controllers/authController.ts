import bcrypt from 'bcryptjs';
import { asyncHandler } from '../middleware/error';
import { requireAuth, signToken, type AuthRequest } from '../middleware/auth';
import { Admin } from '../models/Admin';
import { env } from '../config/env';
import { ApiError } from '../utils/ApiError';

const cookieOptions = () => ({
  httpOnly: true,
  secure: env.cookieSecure,
  sameSite: 'lax' as const,
  maxAge: 7 * 24 * 60 * 60 * 1000,
  path: '/',
});

/** POST /api/auth/login */
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email: email.toLowerCase() });
  // Constant-shape failure message: never reveal whether the account exists.
  if (!admin) throw ApiError.unauthorized('Invalid email or password.');

  const ok = await bcrypt.compare(password, admin.passwordHash);
  if (!ok) throw ApiError.unauthorized('Invalid email or password.');

  admin.lastLoginAt = new Date();
  await admin.save();

  const token = signToken({ id: admin.id, email: admin.email });
  res.cookie('admin_token', token, cookieOptions());

  res.json({
    success: true,
    data: { id: admin.id, name: admin.name, email: admin.email, role: admin.role },
  });
});

/** POST /api/auth/logout */
export const logout = asyncHandler(async (_req, res) => {
  res.clearCookie('admin_token', { ...cookieOptions(), maxAge: 0 });
  res.json({ success: true, message: 'Signed out.' });
});

/** GET /api/auth/me */
export const me = asyncHandler(async (req: AuthRequest, res) => {
  res.json({ success: true, data: req.admin });
});

export { requireAuth };
