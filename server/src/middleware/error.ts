import type { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/ApiError';
import { env } from '../config/env';
import { logger } from '../utils/logger';

/** 404 for unmatched API routes. */
export const notFound = (req: Request, _res: Response, next: NextFunction) => {
  next(ApiError.notFound(`Route not found: ${req.method} ${req.originalUrl}`));
};

interface NormalizedError extends Error {
  status?: number;
  code?: string;
  statusCode?: number;
}

/**
 * Central error handler. Raw errors are logged server-side and never
 * exposed to the client.
 */
export const errorHandler = (
  err: NormalizedError,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const status = err.status || err.statusCode || 500;

  if (status >= 500) {
    logger.error(err.message, { stack: err.stack });
  }

  // Mongoose duplicate key
  if ((err as { code?: number }).code === 11000) {
    return res.status(409).json({
      success: false,
      message: 'A record with this value already exists.',
    });
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      message: 'Some submitted values are invalid. Please review the form.',
    });
  }

  // Mongoose CastError (bad ObjectId etc.)
  if (err.name === 'CastError') {
    return res.status(400).json({
      success: false,
      message: 'The provided identifier is not valid.',
    });
  }

  if (status >= 500) {
    return res.status(500).json({
      success: false,
      message: 'Something went wrong on our side. Please try again shortly.',
    });
  }

  res.status(status).json({
    success: false,
    message: err.message || 'Request failed.',
    code: err.code || 'ERROR',
  });
};

/** Wrap async routes so rejections reach the error handler. */
export const asyncHandler =
  (fn: (req: Request, res: Response, next: NextFunction) => Promise<unknown>) =>
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };

/** Health check + basic security headers sanity. */
export const health = (_req: Request, res: Response) => {
  res.json({ success: true, status: 'ok', env: env.nodeEnv, ts: Date.now() });
};
