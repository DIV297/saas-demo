# HomeCrew — Home Services Management (Demo)

A working prototype of a B2B dashboard for home-services companies (plumbing, HVAC,
cleaning, etc.): customers, work orders, crew dispatch and scheduling.

**Demo login:** `demo@homecrew.app` / `demo1234` (there's a "Fill in" shortcut on the login screen)

## What's in the demo

| Screen | What it shows |
| --- | --- |
| **Login** | Cookie-based sign-in, protected routes, sign-out |
| **Overview** | KPIs (customers, active jobs, upcoming appointments, revenue + 4-week trend), a **dispatch timeline** that scrolls continuously across days (opens at *now*, loads more days as you scroll, pinned names and day labels), upcoming appointments, recently completed work |
| **Work orders** | All jobs with customer, service, technician, date/time and status. In progress first, then upcoming. Filter by status, search, and **change status inline** following real job rules: jobs start (In progress) automatically at their booked time, completing or cancelling asks for confirmation (completing is final), and moving a job back to Scheduled asks for a new date and time. Enforced by the API too |
| **Schedule** | Week calendar (sticky header, slide/swipe between weeks, past days fold away). **Book a job** from any day; **click a job to edit or cancel it** (cancelled jobs are kept in history and can be restored). Agenda list on phones |
| **Customers** | Search plus **filters by plan type and location** → profile page with contact details, site notes, lifetime value and a **status-filterable service history** |

The sidebar collapses to an icon rail (remembered across visits), the account menu sits under your name, and any truncated text shows in full on hover.
Pages open in ~30–70 ms with a short ease-in animation that never delays content; on slow connections a thin yellow progress bar appears. Motion is turned off for users who prefer reduced motion. Every page has breadcrumbs.

Security headers (CSP with nonces, HSTS, nosniff, frame protection…) are on every response. See [Production → Security](docs/PRODUCTION.md#4-security).

Dummy data is set in India: times in **IST**, amounts in **₹** (Indian number format), customers in Mumbai, Pune, Bengaluru and Delhi.

Desktop-first, fully usable on mobile (bottom tab bar, tables turn into cards, calendar turns into an agenda).

## Tech stack (short version)

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · TanStack Query · Zod · lucide-react.
Details and reasoning: [docs/TECH_STACK.md](docs/TECH_STACK.md).

## Run locally

```bash
npm install
npm run dev          # http://localhost:3000
npm run build && npm start   # production build
```

Requires Node 20+. No database or env vars needed. Dummy data in `src/data/` seeds an in-memory
store (`src/server/db.ts`) that stands in for PostgreSQL.

> **Dev server acting stale** (e.g. an API route fails after installing a package)? Stop it,
> clear the cache and restart: `rm -rf .next/dev && npm run dev`. Next.js allows only one dev
> server per project, so make sure the old one is really stopped first.

## Deploy the demo

The fastest option is **Vercel**: import the repo and deploy with no config.
It also runs anywhere Node runs (`npm run build && npm start`) or in a container on Cloud Run / AWS App Runner.

> Bookings and status changes are held in memory, so they reset when the server restarts. That's expected for a demo with no database.

## Project structure

```
src/
├── app/                    # Next.js App Router: pages + API routes
│   ├── (app)/              # Authenticated screens share one layout (sidebar + topbar)
│   │   ├── dashboard/
│   │   ├── jobs/
│   │   ├── schedule/
│   │   └── customers/[id]/
│   ├── login/
│   └── api/                # REST endpoints: auth, customers, jobs, stats
├── components/
│   │                       # Each folder has a styles.ts with its component-specific classes
│   ├── ui/                 # Reusable primitives: Button, Card, Dialog, TextField, Dropdown (brand select,
│   │                       #   optional search) + SelectField, Segmented, Tooltip, StatusBadge, Avatar…
│   ├── layout/             # AppShell, ShellFrame (collapsible sidebar), Sidebar, Topbar, Logo
│   ├── dashboard/          # StatGrid, StatCard, RevenueBars, DispatchBoard, UpcomingList
│   ├── jobs/               # JobsBoard, JobTable, StatusTabs, StatusSelect, JobDetailsDialog, EditJobForm,
│   │                       #   JobFields (customer/technician/time fields shared by booking + editing)
│   ├── customers/          # CustomerDirectory (search + filters), CustomerTable, CustomerProfile
│   ├── schedule/           # ScheduleBoard, WeekCalendar, WeekNav, BookingDialog
│   └── auth/               # LoginForm, BrandPanel
├── hooks/                  # API hooks on TanStack Query (useJobs, useCreateJob…) + useClickOutside
├── data/                   # Dummy data (customers, technicians, jobs)
├── server/
│   ├── db.ts               # In-memory data store (stand-in for PostgreSQL)
│   └── repositories/       # Data-access layer. The only code that touches the store
├── lib/                    # App wiring: API client, query keys, Zod schemas, constants, auth, security
├── utils/                  # Pure helpers (no React): IST dates, formatting, job status rules, options,
│                           #   timeline/calendar maths, positioning. Components only render and handle events
├── styles/
│   ├── theme.css           # Design tokens (colours, type scale, fonts) → Tailwind utilities
│   ├── fonts.ts            # Typefaces (Barlow Semi Condensed, IBM Plex Sans/Mono)
│   ├── globals.css         # Tailwind entry + base element styles
│   └── classes/            # Reusable class strings (layout, typography, buttons…) + appendClass()
├── types/                  # Shared TypeScript types
└── proxy.ts                # Auth redirect + per-request Content-Security-Policy
```

## Docs

- [Tech stack](docs/TECH_STACK.md): what's used and why
- [Production & scaling](docs/PRODUCTION.md): how this becomes a production SaaS
