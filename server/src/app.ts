import path from 'path';
import fs from 'fs';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

import { env } from './config/env';
import { apiLimiter } from './middleware/rateLimit';
import { errorHandler, notFound, health } from './middleware/error';
import publicRoutes from './routes/public';
import authRoutes from './routes/auth';
import adminRoutes from './routes/admin';
import seoRoutes from './routes/seo';

export function createApp() {
  const app = express();

  app.disable('x-powered-by');
  if (env.trustProxy) app.set('trust proxy', 1);

  /* Security headers ------------------------------------------------ */
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          // Vite injects inline styles; Unsplash supplies imagery.
          styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
          fontSrc: ["'self'", 'https://fonts.gstatic.com', 'data:'],
          imgSrc: ["'self'", 'data:', 'blob:', 'https://images.unsplash.com', 'https://*.unsplash.com'],
          scriptSrc: ["'self'", "'unsafe-inline'"],
          connectSrc: ["'self'", ...env.corsOrigins],
          frameSrc: ["'self'", 'https://www.google.com', 'https://maps.google.com'],
          objectSrc: ["'none'"],
          upgradeInsecureRequests: env.isProd ? [] : null,
        },
      },
      crossOriginEmbedderPolicy: false,
      referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
    }),
  );

  app.use(
    cors({
      origin: (origin, cb) => {
        // Allow same-origin / curl (no origin header) and configured origins.
        if (!origin || env.corsOrigins.includes(origin)) return cb(null, true);
        cb(new Error('Not allowed by CORS'));
      },
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    }),
  );

  app.use(express.json({ limit: '100kb' }));
  app.use(express.urlencoded({ extended: false, limit: '100kb' }));
  app.use(cookieParser());

  if (!env.isProd) app.use(morgan('dev'));

  /* Health + rate limiting ------------------------------------------ */
  app.get('/api/health', health);
  app.use('/api', apiLimiter);

  /* Routes ----------------------------------------------------------- */
  app.use('/api', publicRoutes);
  app.use('/api/auth', authRoutes);
  app.use('/api/admin', adminRoutes);
  app.use(seoRoutes);

  /* Serve the built SPA in production (single-service deployment) ----- */
  const clientDist = path.resolve(__dirname, '../../client/dist');
  if (fs.existsSync(clientDist)) {
    app.use(
      express.static(clientDist, {
        index: false,
        maxAge: '1y',
        setHeaders: (res, filePath) => {
          // HTML must not be cached so new deploys show up immediately.
          if (filePath.endsWith('.html')) res.setHeader('Cache-Control', 'no-cache');
        },
      }),
    );
    app.get('*', (req, res, next) => {
      if (req.path.startsWith('/api')) return next();
      res.setHeader('Cache-Control', 'no-cache');
      res.sendFile(path.join(clientDist, 'index.html'));
    });
  }

  /* Errors ----------------------------------------------------------- */
  app.use(notFound);
  app.use(errorHandler);

  return app;
}
