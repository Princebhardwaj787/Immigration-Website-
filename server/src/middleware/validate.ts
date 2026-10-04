import type { Request, Response, NextFunction } from 'express';
import type { ZodSchema } from 'zod';
import { ApiError } from '../utils/ApiError';

/**
 * Validates req.body against a Zod schema and replaces it with the parsed
 * (stripped/trimmed) value. Rejects unknown keys to avoid mass assignment.
 */
export const validateBody =
  (schema: ZodSchema) => (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      const first = result.error.issues[0];
      const field = first?.path?.join('.') || 'form';
      return next(
        ApiError.badRequest(`${field}: ${first?.message || 'Invalid value.'}`),
      );
    }
    req.body = result.data;
    next();
  };
