# FlyNest Overseas Consultancy — Immigration & Overseas Consultancy Platform

A production-style website for an immigration consultancy: public marketing site, visa/country
content, eligibility checker, consultation booking, blog, document checklists, plus a secure admin
dashboard for lead management and content administration.

> **Placeholder content notice** — company name, address, phone, email, social links, team profiles,
> testimonials and statistics are placeholders and are clearly marked as such in the UI. Replace them
> in `client/src/data/company.ts` (and the seed content) before launch. No licences, certifications,
> awards, government affiliations, success rates or visa guarantees are claimed anywhere in this
> project.

---

## Stack

| Layer     | Technology |
|-----------|------------|
| Frontend  | React 18 + Vite + TypeScript, Tailwind CSS, Framer Motion, Lucide icons, React Hook Form + Zod, React Router |
| Backend   | Node.js + Express (TypeScript), Mongoose, Zod validation, Helmet, CORS, rate limiting |
| Database  | MongoDB (local Docker by default — any MongoDB URI works, e.g. Atlas) |
| Auth      | JWT stored in an httpOnly cookie, bcrypt password hashing |
| Email     | Nodemailer (SMTP via `.env`); **logs to the console when SMTP is not configured** |
| PDF       | jsPDF, loaded dynamically only when a checklist is downloaded |

---

## Quick start

```bash
# 1. Install dependencies (root, client, server)
npm install
npm install --prefix client
npm install --prefix server

# 2. Start MongoDB
docker compose up -d

# 3. Configure the server
copy server\.env.example server\.env      # Windows
# cp server/.env.example server/.env      # macOS/Linux
# then edit JWT_SECRET, admin credentials, SMTP (optional)

# 4. Seed the database (admin account, services, countries, FAQs, demo testimonials, blog posts)
npm run seed

# 5. Run both apps in development
npm run dev
# API  → http://localhost:5000
# Web  → http://localhost:5174  (proxies /api to the server)
```

**Admin dashboard:** `http://localhost:5174/admin/login` (default `admin@example.com` / `Admin123!`
— change this in `server/.env` before deploying).

### Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Run API + client concurrently |
| `npm run build` | Build client and server for production |
| `npm start` | Run the built server (also serves the built client) |
| `npm run seed` | Idempotent database seed |

---

## Project structure

```
├─ client/                     # Vite React TS SPA
│  ├─ public/                  # robots.txt, favicon
│  └─ src/
│     ├─ components/
│     │  ├─ home/              # homepage sections
│     │  ├─ layout/            # Navbar, Footer, PublicLayout
│     │  └─ ui/                # Button, Field, Seo, States, SmartImage, Section…
│     ├─ layouts/              # AdminLayout (auth-guarded)
│     ├─ pages/                # public pages
│     │  ├─ admin/             # dashboard, leads, content, blog
│     │  └─ legal/             # privacy, terms, cookies, disclaimer, refunds
│     ├─ hooks/                # useFetch (loading/error/refetch)
│     ├─ services/api.ts       # fetch wrapper + shared types
│     ├─ data/                 # company details, site config, legal text
│     └─ utils/                # cn, slugify, date, content parser, PDF
│
├─ server/
│  └─ src/
│     ├─ config/               # env (validated), db
│     ├─ controllers/          # leads, auth, stats, content, checklists
│     ├─ middleware/           # auth (JWT), rate limits, zod validation, errors
│     ├─ models/               # Lead, Admin, Service, Country, Faq, Testimonial, BlogPost, ContactMessage
│     ├─ routes/               # public, auth, admin, seo (sitemap/robots/meta)
│     ├─ services/             # email, seed
│     └─ data/                 # general document checklists
│
└─ docker-compose.yml          # MongoDB
```

---

## Feature overview

**Public site** — Home (hero, trust indicators, visa categories, destinations, why us, eligibility
preview, 8-step process, testimonials, blog, FAQs, final CTA), About, Visa Services + per-service
landing pages (`/visa/study`, `/visa/work`, `/visa/business`, `/visa/tourist`, `/visa/dependent`,
`/visa/pr`), Countries (`/countries/:slug`), Eligibility checker (10 fields → informational
result), Consultation booking, Blog + articles, searchable FAQs, Contact (form, WhatsApp, map,
hours), legal pages, 404.

**Eligibility checker** — never claims eligibility. Result copy: *“Based on the information
provided, these visa categories may be relevant to you… Final eligibility depends on official
immigration requirements and individual circumstances.”* CTAs: request consultation, contact
consultant, download checklist (PDF).

**Admin dashboard** (`/admin`) — stats (total/new leads, consultation requests, breakdowns by visa
type, country and status, recent applications), lead management (search, filters, status changes,
internal notes, archive/delete, pagination), content management for services/countries/FAQs/
testimonials, and a blog editor.

**SEO** — per-route titles/descriptions/canonical/Open Graph/Twitter tags, JSON-LD (Organization,
Service, FAQPage, Article, BreadcrumbList), dynamic `sitemap.xml` + `robots.txt`, semantic HTML,
route-level code splitting.

### API routes

```
POST   /api/leads                consultation booking (rate limited)
POST   /api/eligibility          eligibility checker submission
POST   /api/contact              contact form
GET    /api/services[/:slug]     GET /api/countries[/:slug]
GET    /api/faqs  /api/testimonials
GET    /api/blog[/:slug]         GET /api/checklists[/:visaType]
POST   /api/auth/login|logout    GET /api/auth/me
GET    /api/admin/stats          leads CRUD + filters/meta + messages
CRUD   /api/admin/{services,countries,faqs,testimonials,blog}
GET    /sitemap.xml              GET /robots.txt
```

---

## Security

- Zod validation on every write endpoint (unknown keys rejected)
- Rate limiting: global API, strict on `/api/auth/login`, per-hour on public forms
- JWT in an **httpOnly, SameSite** cookie; bcrypt(12) password hashing; session invalidated server-side on delete
- Helmet security headers + CSP, CORS allowlist, `x-powered-by` disabled, JSON body capped at 100 kB
- Mongoose-only queries (user input never concatenated into queries); search terms regex-escaped
- Central error handler — raw errors are logged server-side and **never returned to clients**
- Secrets only in `server/.env` (git-ignored); nothing sensitive ships to the frontend
- Frontend normalises every API failure into a safe, human-readable message

## Compliance & content rules baked in

- No guaranteed visas, admissions, jobs or PR claims anywhere in the UI or copy
- Repeated, prominent disclaimer: general information only, requirements change, verify with the official authority
- Country pages state their content is general information and can change
- Testimonials are seeded as **demo content** and labelled in the UI until replaced
- Consent checkbox required on all lead forms; Privacy/Terms/Cookie/Disclaimer/Refund pages included
- Checklist pages labelled *“General checklist — requirements vary by destination and individual circumstances.”*

## Performance & accessibility

- Route-level `React.lazy` splitting; jsPDF loaded only on demand; vendor/motion chunks separated
- Lazy-loaded, responsive images with a branded gradient fallback if an external image fails
- Animations limited to transform/opacity and disabled under `prefers-reduced-motion`
- Keyboard navigation, skip link, visible focus rings, ARIA labels on menus/accordions/forms, heading hierarchy, WCAG AA contrast palette
- Responsive from 320 px → large desktop (mobile-first layouts, not shrunk desktop)

---

## Deployment

**Option A — single service (simplest, lowest cost):**

```bash
npm run build            # builds client/dist and server/dist
npm start                # Express serves the API and the built SPA
```

Deploy the whole folder to Render/Railway/Fly.io, set the environment variables from
`server/.env.example`, point `MONGODB_URI` at MongoDB Atlas (free tier), and set `SITE_URL` +
`CORS_ORIGIN` to your domain.

**Option B — split:** host the client on Vercel/Netlify (SPA rewrite to `index.html`) and the API
elsewhere; set `CORS_ORIGIN` accordingly.

### Environment variables (server/.env)

| Key | Purpose |
|-----|---------|
| `MONGODB_URI` | MongoDB connection string |
| `JWT_SECRET` | Long random string (required in production) |
| `CORS_ORIGIN` | Comma-separated allowed origins |
| `SMTP_HOST/PORT/USER/PASS/FROM` | Optional; emails log to console when unset |
| `ADMIN_NOTIFY_EMAIL` | Where new-lead notifications go |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` | Seeded admin login |
| `SITE_URL` | Canonical URLs + sitemap domain |

---

## Before launch — replace these

1. `client/src/data/company.ts` — name, address, phone, email, WhatsApp, socials, hours, map embed
2. `client/index.html` + `client/src/data/site.ts` — real domain (`SITE.url`), OG image, Twitter handle
3. `server/.env` — real `JWT_SECRET`, admin credentials, SMTP credentials, `SITE_URL`
4. Seeded testimonials → real client reviews (`isDemo: false`); team profiles on the About page
5. Legal pages (`client/src/data/legal.ts`) → reviewed by a professional for your jurisdiction
6. Optional: licence/registration numbers, once verified
