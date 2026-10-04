import dotenv from 'dotenv';

dotenv.config();

const bool = (v: string | undefined, fallback = false) =>
  v === undefined ? fallback : ['1', 'true', 'yes'].includes(v.toLowerCase());

export const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  isProd: process.env.NODE_ENV === 'production',
  port: Number(process.env.PORT || 5000),
  mongoUri:
    process.env.MONGODB_URI || 'mongodb://localhost:27017/flynest_consultancy',
  jwtSecret: process.env.JWT_SECRET || 'dev-only-insecure-secret-change-me',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  corsOrigins: (process.env.CORS_ORIGIN || 'http://localhost:5174')
    .split(',')
    .map((o) => o.trim())
    .filter(Boolean),
  smtp: {
    host: process.env.SMTP_HOST || '',
    port: Number(process.env.SMTP_PORT || 587),
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || '',
    from: process.env.SMTP_FROM || 'FlyNest Overseas Consultancy <no-reply@example.com>',
    notifyEmail: process.env.ADMIN_NOTIFY_EMAIL || '',
  },
  admin: {
    email: process.env.ADMIN_EMAIL || 'admin@example.com',
    password: process.env.ADMIN_PASSWORD || 'ChangeMe123!',
  },
  cookieSecure: bool(process.env.COOKIE_SECURE, process.env.NODE_ENV === 'production'),
  trustProxy: bool(process.env.TRUST_PROXY, false),
};
