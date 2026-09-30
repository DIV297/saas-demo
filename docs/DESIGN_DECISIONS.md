# Design decisions

What we built, why it looks and behaves the way it does, and how the code is organised to keep it that way.

## 1. Product & UX

**Built around a dispatcher's day.** The Overview opens on a live dispatch timeline scrolled to *now*, with technician names and day labels pinned while you scroll across days. Work orders list what needs attention first (in progress, then upcoming) and push finished work to the bottom.

**Filtering that saves clicks.** Every list can be narrowed the way people actually look for things: work orders by status and free-text search, customers by plan type, location and search. Each filter shows how many items it will return, filters combine, and "Clear filters" resets everything in one go. Long pickers (customers, technicians) have a search box, and the technicians who match the job's trade are listed first.

**Real job rules, not just a status field.** A job becomes *In progress* by itself at its booked time. *Completed* is final. Moving a job back to *Scheduled* asks for a new future date and time. Cancelling or completing always asks for confirmation. The same rules run in the browser and in the API, so they can't be bypassed.

**Feels like an app on mobile.** On phones the sidebar becomes a bottom tab bar within thumb reach. Tables turn into readable cards, the week calendar turns into an agenda you can swipe between weeks, and filter tabs become a single dropdown. Popups size their buttons for touch. On desktop, headings, toolbars, table headers and calendar day names stay pinned, so controls never scroll out of reach.

**Fast and calm.** Pages appear in tens of milliseconds, with no loading skeletons or artificial delays. Motion is short and purposeful (weeks slide in the direction you navigate), and it is switched off for users who prefer reduced motion.

**Local context.** Times are in IST, money is in ₹ with Indian digit grouping, and customers are in Mumbai, Pune, Bengaluru and Delhi. The demo reads like a real Indian home-services business rather than a template.

## 2. Visual language

**One brand colour, used with intent.** Safety yellow is the colour of hi-vis vests and site signage, the world our users work in. It marks only what matters: the current page, the selected filter, primary actions, *today* in the calendar and the marker beside each heading. Everything else is near-black ink on a crisp light background with white cards, so the yellow always means something.

**Status colours carry meaning, not decoration.** Grey means scheduled, yellow means in progress (with a live pulse), green means completed and red means cancelled. They are used the same way everywhere and always come with a label or dot, never colour alone.

**Type and icons with character.** Headings use a condensed, signage-style face (Barlow Semi Condensed), body text uses IBM Plex Sans, and IDs and times use Plex Mono. There are only two text sizes for content, plus headings, which keeps screens quiet. Technicians are shown by their trade icon (droplet for plumbing, bolt for electrical) instead of generic initials.

**Space over lines.** Rows are separated by soft striping and spacing, not hairline dividers, and page headers are a single compact line (breadcrumbs › title · count) to leave room for the actual work.

## 3. Code

**Design tokens, then Tailwind.** Colours, type sizes, fonts, spacing and animations are defined once in `src/styles/theme.css` and become Tailwind utilities (`bg-brand`, `text-secondary`, `h-topbar`). Changing the brand means changing a token, not hunting through files.

**Reusable class variables instead of utility soup.** Common patterns live as named constants in `src/styles/classes/` (`panel`, `pageTitle`, `linkAccent`, `table`…). Each feature folder has a `styles.ts` with one object per component, and classes are combined with `appendClass()` (clsx + tailwind-merge), so conditional styles stay readable:

```tsx
<button className={appendClass(s.trigger, isFiltered && s.triggerActive, className)} />
```

JSX stays about structure; the styling is named, documented and reused.

**Shared building blocks.** One brand `Dropdown` powers every select in the app: filters, form fields and the status pill. One `Dialog` (plus `ConfirmDialog` and `DialogFooter`) serves every popup. The booking and edit forms share the same field components. Fixing or restyling one of these fixes it everywhere.

**Components render; utilities think.** Pure logic lives in `src/utils/`: IST date handling, formatting, job status rules, timeline and calendar maths, menu positioning. Components only render and handle events, and the logic can be read and tested on its own.

**Clear data flow.** The UI talks to the API only through TanStack Query hooks (`useJobs`, `useUpdateJob`…), with optimistic updates where it helps. The API validates input with Zod schemas shared with the forms, and reads and writes through a small repository layer that will switch to PostgreSQL without touching the UI. Security headers (CSP with per-request nonces, HSTS, frame and MIME protection) are applied to every response.

See also: [Tech stack](TECH_STACK.md) · [Production & scaling](PRODUCTION.md)
