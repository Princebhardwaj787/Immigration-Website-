import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import { ApiError } from '../utils/ApiError';
import { Admin } from '../models/Admin';

export interface AuthRequest extends Request {
  admin?: { id: string; email: string; name: string; role: string };
}

export const signToken = (payload: { id: string; email: string }) =>
  jwt.sign(payload, env.jwtSecret, { expiresIn: env.jwtExpiresIn as jwt.SignOptions['expiresIn'] });

/** Reads the JWT from the httpOnly cookie or an Authorization header. */
export const requireAuth = async (
  req: AuthRequest,
  _res: Response,
  next: NextFunction,
) => {
  try {
    const bearer = req.headers.authorization;
    const token =
      (bearer && bearer.startsWith('Bearer ') ? bearer.slice(7) : null) ||
      (req.cookies?.admin_token as string | undefined);

    if (!token) throw ApiError.unauthorized();

    let decoded: { id: string; email: string };
    try {
      decoded = jwt.verify(token, env.jwtSecret) as { id: string; email: string };
    } catch {
      throw ApiError.unauthorized('Session expired. Please sign in again.');
    }

    const admin = await Admin.findById(decoded.id).lean();
    if (!admin) throw ApiError.unauthorized('Session no longer valid.');

    req.admin = {
      id: String(admin._id),
      email: admin.email,
      name: admin.name,
      role: admin.role,
    };
    next();
  } catch (err) {
    next(err);
  }
};
