# Tech Stack

## Demo

| Layer | Choice | Why |
| --- | --- | --- |
| Framework | **Next.js 16 (App Router)** | One codebase for UI and API. Server Components render data-heavy pages on the server, so less JavaScript ships to the browser |
| Language | **TypeScript** (strict) | Shared types (`src/types`) between API, data layer and UI catch mistakes at build time |
| UI | **React 19** | Server Components by default. Client components only where there's interaction (filters, status change, login form) |
| Styling | **Tailwind CSS v4** | Design tokens in `styles/theme.css` become utilities (`bg-surface`, `text-caption`, `font-display`). Reusable class strings live in `styles/classes/*.ts` and are combined with `appendClass()`. No custom CSS per component |
| Class helpers | **clsx + tailwind-merge** | Wrapped as `appendClass()`: conditional classes, and later classes override conflicting earlier ones |
| Validation | **Zod** | One schema (`lib/schemas.ts`) validates bookings in the form and in the API |
| Data fetching | **TanStack Query v5** | Caching, request de-duplication, retries, background refetch, optimistic updates with rollback. Wrapped in feature hooks (`useJobs`, `useCustomers`…) so components never call `fetch` |
| Icons | **lucide-react** | Lightweight, tree-shaken SVG icons |
| Fonts | `next/font`: **Barlow Semi Condensed** (headings), **IBM Plex Sans** (body), **IBM Plex Mono** (data) | Industrial, signage-inspired look that suits field operations. Self-hosted automatically, no layout shift. Defined once in `src/styles/fonts.ts` |
| Auth (demo) | httpOnly cookie + `proxy.ts` | Shows the protected-route pattern without an external provider |
| Data (demo) | Static TypeScript files in `src/data` served through `/api/*` | Same API shape the real backend will have |

No UI kit and no chart library. The dashboard's chart and dispatch board are built with Tailwind,
which keeps the bundle small and the design distinctive.

**Why not Material UI?** MUI would add a second styling system alongside Tailwind and a
heavier bundle, and its default look is very recognisable. A small in-house component set on
Tailwind gives full control over the brand.

## Production additions

| Need | Recommended |
| --- | --- |
| Database | **PostgreSQL** (AWS RDS / Aurora, Cloud SQL, or Neon) |
| ORM / queries | **Drizzle ORM** or Prisma: typed queries, migrations |
| Cache | **Redis** (ElastiCache / Upstash / Memorystore) for dashboard aggregates and sessions |
| Auth | **Auth.js**, Clerk or AWS Cognito: SSO, password reset, roles (owner / dispatcher / technician) |
| Background jobs | SQS / Cloud Tasks + worker (reminder SMS, invoices, reports) |
| Notifications | Twilio (SMS), Resend / SES (email) |
| Payments | Stripe (invoices, card on file, subscriptions for the SaaS itself) |
| Maps / routing | Google Maps Platform or Mapbox (technician routing, ETAs) |
| Observability | Sentry (errors), OpenTelemetry + CloudWatch / Grafana (metrics, logs) |
| Testing | Vitest + Testing Library (unit), Playwright (end-to-end) |
| CI/CD | GitHub Actions: lint → typecheck → test → build → deploy |
