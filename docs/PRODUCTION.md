# From Demo to Production SaaS

## 1. Data layer

- **PostgreSQL** as the system of record. The dashboard is read-heavy (lists, KPIs,
  calendars), which Postgres handles well with the right indexes.
- **Multi-tenancy:** every table has a `company_id`. Enforce it in the repository layer and
  with Postgres **Row-Level Security**, so one company can never read another's data.
- Core tables: `companies`, `users`, `customers`, `technicians`, `jobs`, `job_events`
  (status history / audit log), `invoices`.
- Indexes on the hot paths, e.g. `jobs (company_id, scheduled_at)` and `jobs (company_id, status)`.
- **Read replica** for dashboards and reports once traffic grows. Writes go to the primary.

## 2. Caching with Redis

| What | Strategy |
| --- | --- |
| Dashboard KPIs (`/api/stats`) | Cache per company for 30–60 s, invalidate when a job changes |
| Customer / technician lists | Cache-aside, invalidate on write |
| Sessions & rate limiting | Redis keys with TTL |

Next.js' own data cache and `revalidateTag()` can sit in front of this for rendered pages.

## 3. Hosting: two options, chosen by traffic

### Option A: Serverless (start here)

Best while traffic is low or spiky and the app is stateless (no long-lived user context
held in server memory; sessions live in cookies / Redis).

```
Users → CDN (CloudFront / Cloud CDN) → Next.js on Cloud Run  or  AWS Lambda (via OpenNext / SST)
                                            │
                                            ├── PostgreSQL (RDS / Cloud SQL, via connection pooler e.g. RDS Proxy / PgBouncer)
                                            └── Redis (ElastiCache / Memorystore / Upstash)
```

- Scales to zero, so you pay per request. No servers to patch.
- Cloud Run runs the same Docker image you'd run anywhere, so moving later is easy.
- Use a **connection pooler**, because serverless functions open many short DB connections.

### Option B: VMs / containers behind a load balancer (steady, high traffic)

Once traffic is steady and predictable, always-on instances are cheaper per request and
avoid cold starts.

```
Users → CDN → Load Balancer (ALB / Cloud Load Balancing)
                 ├── App instance 1 ┐
                 ├── App instance 2 ├── Auto-scaling group (EC2 / GCE) or ECS / Kubernetes
                 └── App instance N ┘
                         │
                         ├── PostgreSQL primary + read replica(s)
                         └── Redis cluster
```

- The load balancer spreads traffic and health-checks instances. Auto-scaling adds or
  removes instances on CPU / request count.
- The app stays stateless (no local sessions or files), so any instance can serve any user.
- Static assets are served by the CDN, not the app servers.

## 4. Security

### HTTP security headers (already in the demo)

Set in `next.config.ts` (static headers) and `src/proxy.ts` (per-request CSP). Definitions are in `src/lib/security.ts`.

| Header | Protects against |
| --- | --- |
| **Content-Security-Policy** (nonce + `strict-dynamic`) | **XSS.** Only scripts carrying the per-request nonce run, so injected `<script>` tags and inline handlers are blocked. Also `object-src 'none'`, `base-uri 'self'`, `form-action 'self'`, `frame-ancestors 'none'` |
| **Strict-Transport-Security** | Protocol downgrade / SSL-stripping: the browser always uses HTTPS |
| **X-Content-Type-Options: nosniff** | MIME-sniffing (a file served as text being run as script) |
| **X-Frame-Options: DENY** | Clickjacking (the app embedded in a hidden iframe) |
| **Referrer-Policy** | Leaking internal URLs / IDs to third-party sites |
| **Permissions-Policy** | Abuse of camera, mic, geolocation, payment APIs we don't use |
| **Cross-Origin-Opener-Policy** | Cross-window attacks (tab-nabbing, Spectre-style leaks) |
| `poweredByHeader: false` | Stops advertising the framework version to scanners |

Verify with `curl -I https://<domain>` or securityheaders.com (target grade: A).
When third parties are added (Stripe, Maps, Sentry), allow-list their domains in `buildCsp()`.
Start with `Content-Security-Policy-Report-Only` + a report endpoint before enforcing.

### XSS & injection beyond headers

- React escapes all rendered values by default. Never use `dangerouslySetInnerHTML` with user content (or sanitise with DOMPurify).
- Parameterised queries only (Drizzle/Prisma do this), so no SQL built from strings.
- Validate every API input with **Zod**, and reject unknown fields.

### Sessions, CSRF & auth

- Session cookie is `httpOnly` (JavaScript can't read it, so XSS can't steal it), `Secure`, and `SameSite=Lax` (blocks most CSRF). Add a CSRF token or Origin check on state-changing routes for defence in depth.
- Replace the demo login with a real provider (Auth.js / Clerk / Cognito): hashed passwords (argon2/bcrypt), MFA, SSO for larger customers, short-lived signed sessions.
- **Role-based access:** owner, office/dispatcher, technician (technicians only see their own jobs), checked on the server in every repository call, not just hidden in the UI.

### Platform

- **Rate limiting** (Redis) on login and write endpoints. **WAF** (AWS WAF / Cloud Armor) in front of the load balancer for bot, brute-force and OWASP Top-10 rules.
- Secrets in AWS Secrets Manager / GCP Secret Manager, never in the repo. Encryption at rest (RDS/KMS) and TLS everywhere.
- Dependency scanning (Dependabot / `npm audit`) in CI. Audit log of who changed what (`job_events`).

## 5. Reliability & operations

- CI/CD with GitHub Actions. Preview environment per pull request.
- Automated DB backups + point-in-time recovery. Migrations run in the pipeline.
- Sentry for errors. Metrics and alerts on latency, error rate, DB load.
- Infrastructure as code (Terraform / SST) so environments are reproducible.

## 6. Product features that come next

Job creation & editing, drag-and-drop scheduling, technician mobile view (PWA) with
check-in/out and photos, SMS/email reminders, quotes → invoices → payments (Stripe),
recurring jobs, reports, and customer self-booking.
