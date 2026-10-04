export class ApiError extends Error {
  status: number;
  code: string;

  constructor(status: number, message: string, code = 'ERROR') {
    super(message);
    this.status = status;
    this.code = code;
  }

  static badRequest(msg = 'Invalid request.') {
    return new ApiError(400, msg, 'BAD_REQUEST');
  }
  static unauthorized(msg = 'Authentication required.') {
    return new ApiError(401, msg, 'UNAUTHORIZED');
  }
  static forbidden(msg = 'You do not have access to this resource.') {
    return new ApiError(403, msg, 'FORBIDDEN');
  }
  static notFound(msg = 'Resource not found.') {
    return new ApiError(404, msg, 'NOT_FOUND');
  }
  static conflict(msg = 'Resource already exists.') {
    return new ApiError(409, msg, 'CONFLICT');
  }
  static tooMany(msg = 'Too many requests. Please try again later.') {
    return new ApiError(429, msg, 'RATE_LIMITED');
  }
}
