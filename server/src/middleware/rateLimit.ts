import rateLimit from 'express-rate-limit';

const handler = (_req: any, res: any) => {
  res.status(429).json({
    success: false,
    message: 'Too many requests. Please wait a moment and try again.',
    code: 'RATE_LIMITED',
  });
};

/** Global limiter for all API traffic. */
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 500,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  handler,
});

/** Stricter limiter for auth endpoints (brute-force protection). */
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  handler,
});

/** Limiter for public form submissions (lead spam protection). */
export const formLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 12,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  handler,
});
