# Skills.md — Antigravity Build Guidance

## Mission
Build the NexCell AI Activity Dashboard exactly to brief, with strong frontend polish and interview-ready code quality.

---

## Core engineering rules
- Use **Next.js 14 App Router**.
- Use **TypeScript** in strict mode.
- Use **Tailwind CSS** for styling.
- Use **at least 2 shadcn/ui components**.
- Use **no `any` anywhere**.
- Keep implementation simple, clean, and easy to explain.

---

## Product mindset
This is not a startup MVP and not a design portfolio piece.
It is an internship assessment.

Optimize for:
- correctness
- clarity
- completeness
- professionalism
- maintainability

Do not optimize for novelty.

---

## Coding standards

### Types
- Define all shared types in `lib/types.ts`.
- Use union types for status values.
- Type all component props explicitly.
- Use `Activity | null` for selected item state.
- Prefer derived values via `useMemo` where helpful.

### Components
- Each component should do one thing.
- Prefer small reusable UI parts over one huge file.
- Keep presentation and data logic reasonably separated.
- Use descriptive names.

### Styling
- Use Tailwind utility classes.
- Keep spacing consistent.
- Avoid flashy colors.
- Use professional neutral surfaces.
- Ensure red/green/amber badges remain readable.

### Accessibility
- Inputs and controls must be keyboard usable.
- Dialog should use shadcn defaults.
- Keep focus states visible.
- Do not rely on color alone for interaction cues.

---

## Required UX behaviors
- loading skeleton while fetching
- empty state when filters return zero rows
- clickable activity rows
- modal or sheet detail view
- responsive layout
- instant client-side filtering

---

## Recommended shadcn/ui components
- Card
- Input
- Select
- Dialog
- Skeleton
- Badge

Minimum acceptable combination:
- Card
- Input
- Select
- Dialog

Preferred combination:
- Card
- Input
- Select
- Dialog
- Skeleton
- Badge

---

## API expectations
Create:
- `app/api/activities/route.ts`

Return:
- exactly 10 sample activity objects
- typed against `Activity[]`
- using `Response.json(...)`

Do not:
- fetch from third-party API
- add a database
- add auth

---

## Filtering rules
Text search must match:
- `user`
- `type`

Status filter options:
- all
- success
- failed
- processing

Combined logic:
- row must satisfy selected status if not `all`
- row must satisfy text search if search input is non-empty

Use case-insensitive matching.

---

## Date formatting rule
Display dates in a human-readable format using a helper function.
Example target style:
- `1 Mar 2026, 12:10`

Keep formatting centralized in `lib/formatters.ts`.

---

## File organization preference
```txt
app/
  api/
    activities/
      route.ts
  dashboard/
    page.tsx
components/
  dashboard/
    DashboardClient.tsx
    ActivityFilters.tsx
    ActivityTable.tsx
    ActivityDetailDialog.tsx
    StatCard.tsx
    StatusBadge.tsx
lib/
  activities.ts
  formatters.ts
  types.ts
```

---

## Review checklist
Before considering the build finished, verify:
- no `any`
- no TypeScript errors
- no broken imports
- `/dashboard` loads successfully
- `/api/activities` returns JSON
- stats count correctly
- filters work together
- empty state appears correctly
- dialog shows selected activity details
- README exists and is concise

---

## README expectations
README must include:
- how to run locally
- assumptions made
- one improvement with more time

Tone:
- short
- technical
- professional

---

## Good decisions
- Reuse a `StatusBadge` component
- Use `Skeleton` for a polished loading state
- Keep stats computed from original dataset
- Keep filters local and simple
- Keep modal logic minimal and typed

---

## Bad decisions to avoid
- adding charts
- adding authentication
- adding server actions unnecessarily
- adding external state libraries
- over-animating the UI
- inventing custom modal logic when shadcn Dialog exists
- hardcoding stats separately from dataset

---

## Final principle
A smaller solution executed perfectly will score better than a bigger solution with rough edges.
