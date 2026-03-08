# PRD — NexCell Solutions Frontend Engineering Internship Assessment

## Document purpose
This PRD is written for Antigravity as the build specification for the NexCell “AI Activity Dashboard” assessment. The goal is to produce a polished, fully working, interview-defensible submission that meets the brief exactly, avoids unnecessary scope, and maximizes marks for frontend quality, completeness, code quality, and backend awareness.

---

## 1. Product summary
Build a single-page dashboard in **Next.js 14 App Router** using **TypeScript**, **Tailwind CSS**, and **at least 2 shadcn/ui components**.

The app must:
- expose a local API route at `app/api/activities/route.ts`
- return 10 sample AI activity objects
- fetch those activities from the frontend
- render a clean activity monitoring dashboard at `/dashboard`
- support search and status filtering
- show summary stats
- open a detail modal or side panel on row click
- handle loading, empty state, and responsive layouts gracefully

This is a **small but complete** frontend-focused engineering task. Do not overbuild.

---

## 2. Primary objective
Deliver a clean, reliable, strongly typed submission that feels production-aware and easy to review.

Success means:
- all brief requirements are implemented exactly
- code is easy to read and explain line by line
- UI feels deliberate, modern, and uncluttered
- TypeScript is strict and uses **no `any` anywhere**
- README is concise and professional

---

## 3. Non-goals
Do **not** add scope that risks the deadline.

Avoid:
- authentication
- database setup
- real backend services
- complex charts
- pagination
- sorting unless time remains
- drag and drop
- animations beyond subtle UI polish
- global state libraries unless clearly necessary

---

## 4. Target evaluator mindset
The reviewer is likely checking four things quickly:
1. Did the candidate follow the brief exactly?
2. Is the code typed, structured, and readable?
3. Does the UI feel polished enough for a frontend intern?
4. Can the candidate explain why each decision was made?

Design every implementation choice around those four questions.

---

## 5. Tech stack and hard constraints

### Required stack
- Next.js 14 with App Router
- TypeScript
- Tailwind CSS
- shadcn/ui (minimum two components)
- data fetching from own API route using `fetch()` or TanStack Query

### Hard constraints
- no `any`
- define `Activity` type in `lib/types.ts`
- API route must return exactly 10 sample activities
- statuses must include a mix of:
  - `success`
  - `failed`
  - `processing`
- `/dashboard` must be responsive and usable on mobile + desktop
- loading state required
- empty state required
- detail modal or side sheet required

### Recommendation
Use **native `fetch()`** with a client-side loading state to minimize setup risk and dependency overhead.

---

## 6. UX principles
The dashboard should feel like an internal AI SaaS operations screen.

### Visual goals
- crisp spacing
- clean cards
- strong information hierarchy
- readable table
- fast scan of statuses
- subtle, professional styling
- no visual clutter

### UX goals
- filters should feel instant
- row click target should be obvious
- empty state should reassure users, not confuse them
- loading should look intentional
- mobile layout should remain usable, even if simplified

---

## 7. Information architecture

### Route map
- `/dashboard` → main dashboard page
- `/api/activities` → local API route returning JSON array

### Page sections
1. Header area
2. Stats strip
3. Filter controls
4. Activity table
5. Activity detail modal/sheet

---

## 8. Functional requirements

### 8.1 API route
**Path:** `app/api/activities/route.ts`

Must return `Response.json(activities)` where `activities` is an array of 10 items.

Each item must match:

```ts
export type ActivityStatus = "success" | "failed" | "processing";

export interface Activity {
  id: string;
  user: string;
  type: string;
  status: ActivityStatus;
  createdAt: string;
  description: string;
}
```

### Dataset requirements
- exactly 10 rows
- realistic agent-style names like `agent_01`
- realistic activity types like:
  - `lead_analysis`
  - `message_reply`
  - `document_parse`
  - `meeting_summary`
  - `crm_sync`
- mix of all three statuses
- valid ISO 8601 timestamps
- clear one-line descriptions

### Recommended sample dataset
Use a hardcoded in-memory array with varied timestamps and statuses.

---

### 8.2 Dashboard page
**Path:** `app/dashboard/page.tsx`

The page should render a top-level dashboard shell and load activities from `/api/activities`.

Recommended split:
- server page component for layout shell
- client component for interactive dashboard state

This gives clean separation while allowing client-side filters and modal state.

---

### 8.3 Stats strip
Render three stat cards:
- Total Activities
- Successful Activities
- Failed Activities

Computation rules:
- Total = full fetched dataset length
- Successful = count of `status === "success"`
- Failed = count of `status === "failed"`

Important:
- stats should be based on the fetched dataset, not hardcoded
- stats should remain stable from the original fetched data, not shrink with filters, unless explicitly designed otherwise

**Recommendation:** base stats on the full dataset, not filtered rows.

---

### 8.4 Filters
Provide:
1. text search input
2. status dropdown

#### Search behavior
Search should match against:
- `user`
- `type`

Case-insensitive.

#### Status dropdown values
- All
- Success
- Failed
- Processing

#### Combined filtering logic
Return rows where:
- row matches search text on `user` OR `type`
- row matches selected status unless status is `All`

Filtering must be client-side and instant.

---

### 8.5 Activity table
Columns required:
- Activity ID
- User
- Type
- Status
- Created Date

#### Table behavior
- rows clickable
- hover state on rows
- opens modal/sheet with selected activity
- mobile version should remain readable; horizontal scroll is acceptable if styled cleanly

#### Date formatting
Convert ISO timestamp into human-readable format like:
- `1 Mar 2026, 12:10`

Use `Intl.DateTimeFormat` or a small helper.

---

### 8.6 Status badge
Each status must be visually distinct and easy to scan.

Mapping:
- `success` → green
- `failed` → red
- `processing` → amber/yellow

Badge component should be reusable.

---

### 8.7 Detail modal or side panel
When a row is clicked, open a detail view showing:
- Activity ID
- User
- Type
- Status badge
- Created Date
- Description

### Recommendation
Use **shadcn/ui Dialog** for speed and reliability.

Optional alternative:
- `Sheet` if you want a right-side detail panel

Modal requirements:
- easy to close
- keyboard accessible
- no layout shift
- selected row state should be typed

---

### 8.8 Loading state
Show loading skeletons or spinner while fetching.

### Recommendation
Use **shadcn/ui Skeleton** and keep loading visuals close to final layout:
- 3 skeleton stat cards
- 1–2 skeleton rows or table placeholders

This feels more polished than a lone spinner.

---

### 8.9 Empty state
When filters produce zero matches, show a clean empty state message.

Suggested copy:
- `No activities match your current filters.`
- `Try adjusting the search term or status.`

This should appear inside the table area, not as a broken blank screen.

---

### 8.10 Error handling
The brief does not explicitly require a visible error state, but adding one is strong practice.

Add a small inline fallback such as:
- `Failed to load activities. Please refresh and try again.`

Keep implementation simple.

---

## 9. Suggested component architecture

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
    StatCard.tsx
    ActivityFilters.tsx
    ActivityTable.tsx
    ActivityDetailDialog.tsx
    StatusBadge.tsx
lib/
  types.ts
  activities.ts
  formatters.ts
```

### Notes
- Keep dashboard-specific components grouped under `components/dashboard`
- Put sample data in `lib/activities.ts` so both route and tests stay clean
- Put date formatting in `lib/formatters.ts`

---

## 10. shadcn/ui usage plan
Use at least two of these:
- `Card`
- `Input`
- `Select`
- `Table`
- `Dialog`
- `Badge`
- `Skeleton`

### Recommended minimum set
- Card
- Input
- Select
- Dialog
- Skeleton

That comfortably satisfies the brief and keeps the UI polished.

---

## 11. State model
In `DashboardClient.tsx`, keep state local and simple.

Recommended state:
```ts
const [activities, setActivities] = useState<Activity[]>([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState<string | null>(null);
const [search, setSearch] = useState("");
const [statusFilter, setStatusFilter] = useState<"all" | ActivityStatus>("all");
const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
```

Derived values with `useMemo`:
- stats counts
- filtered activities

This is enough. No global store needed.

---

## 12. Data flow
1. Dashboard client mounts
2. Fetch `/api/activities`
3. Parse JSON into `Activity[]`
4. Store results in local state
5. Compute stats and filtered rows
6. Clicking row sets `selectedActivity`
7. Dialog opens from selected state

---

## 13. Accessibility requirements
- semantic table markup if using table layout
- input should have placeholder and/or accessible label
- select should be keyboard accessible
- modal must trap focus via shadcn/ui defaults
- row hover must not be the only interaction signal
- ensure status colors have readable text contrast

---

## 14. Responsive behavior

### Desktop
- 3 stat cards in one row
- filters in one row if space allows
- full table visible

### Tablet
- stat cards can wrap 2 + 1
- filters may stack or compress

### Mobile
- stat cards stacked
- filters stacked vertically
- table can scroll horizontally
- modal should fit viewport cleanly

Do not attempt a second mobile-specific card view unless time remains.

---

## 15. Design guidance

### Page shell
- max width container
- generous padding
- title + short subtitle

### Tone
Professional internal tool, not marketing website.

### Suggested heading copy
- Title: `AI Activity Dashboard`
- Subtitle: `Monitor recent agent activity across AI workflows.`

### Visual polish ideas
- soft borders
- subtle shadows
- muted backgrounds
- badge colors with low-saturation backgrounds

---

## 16. Implementation steps for Antigravity

### Step 1 — Project setup
- create Next.js 14 app with App Router and TypeScript
- configure Tailwind CSS
- initialize shadcn/ui
- install only required components

### Step 2 — Types and data
- create `lib/types.ts`
- create `lib/activities.ts` with typed sample data array
- create `lib/formatters.ts` for date helper

### Step 3 — API route
- implement `app/api/activities/route.ts`
- return `Response.json(activities)`

### Step 4 — UI components
- build reusable `StatusBadge`
- build `StatCard`
- build `ActivityFilters`
- build `ActivityTable`
- build `ActivityDetailDialog`

### Step 5 — Dashboard client
- fetch data on mount
- show skeletons during loading
- show error fallback if fetch fails
- compute stats and filters
- wire table row click to dialog

### Step 6 — Styling and responsiveness
- polish spacing
- test mobile widths
- ensure empty state is visually clean

### Step 7 — README
Include:
- setup steps
- assumptions
- one improvement with more time

### Step 8 — Final QA
- no `any`
- lint clean
- types clean
- route works
- dashboard works
- modal works
- filters work
- README present

---

## 17. Acceptance criteria
The build is complete only if all are true:

### API
- [ ] `/api/activities` exists
- [ ] returns exactly 10 activities
- [ ] all activities conform to `Activity`
- [ ] statuses include success, failed, processing

### Dashboard
- [ ] `/dashboard` renders successfully
- [ ] 3 stats cards are present
- [ ] table shows required columns
- [ ] date is human readable
- [ ] status badge colors are correct

### Filters
- [ ] search filters by user
- [ ] search filters by type
- [ ] status dropdown filters correctly
- [ ] combined filters work together
- [ ] empty state appears when no matches

### Detail view
- [ ] clicking row opens detail dialog/sheet
- [ ] detail view shows all required fields
- [ ] dialog closes correctly

### Quality
- [ ] loading state present
- [ ] responsive on mobile and desktop
- [ ] no `any`
- [ ] README included

---

## 18. Evaluation-oriented coding guidance

### To maximize frontend score
- separate presentation from logic cleanly
- keep components focused
- avoid giant page files
- use consistent spacing and typography

### To maximize completeness score
- implement every required section exactly
- avoid partial features
- prefer complete simple solution over ambitious extras

### To maximize code quality score
- meaningful names
- helper functions for formatting/filtering where useful
- typed props everywhere
- no dead code

### To maximize backend awareness score
- clean API route
- handle loading and errors
- fetch from own route, not static import in UI

---

## 19. Suggested README structure

```md
# NexCell AI Activity Dashboard

## Run locally
1. npm install
2. npm run dev
3. Open http://localhost:3000/dashboard

## Assumptions
- Activity data is mock data returned from a local Next.js API route.
- Stats are calculated from the full fetched dataset.
- Filters are client-side because the dataset is intentionally small.

## With more time
I would add automated tests and server-side pagination/sorting for larger datasets.
```

Keep README short and crisp.

---

## 20. Suggested implementation details

### `lib/types.ts`
```ts
export type ActivityStatus = "success" | "failed" | "processing";

export interface Activity {
  id: string;
  user: string;
  type: string;
  status: ActivityStatus;
  createdAt: string;
  description: string;
}
```

### `lib/formatters.ts`
Create a helper:
```ts
export function formatActivityDate(value: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date(value));
}
```

---

## 21. Sample product decisions Antigravity should follow
- Use `Dialog` rather than inventing custom modal logic
- Use `Skeleton` rather than spinner-only loading
- Keep filters above the table
- Keep stats independent of filters
- Prefer `useMemo` for filtered rows
- Use a dedicated `StatusBadge` component
- Keep dataset and types isolated from route logic

---

## 22. Time-boxed execution plan

### 0–30 min
- setup
- shadcn init
- types
- sample data
- API route

### 30–75 min
- dashboard client
- fetch logic
- stats
- filters
- table

### 75–110 min
- dialog
- loading state
- empty state
- responsive polish

### 110–140 min
- README
- lint/type fixes
- manual QA

### Final 10–20 min
- GitHub repo cleanup
- commit history tidy
- final submission check

---

## 23. Risks and mitigations

### Risk: Overengineering
Mitigation: keep scope to brief only.

### Risk: Type issues slowing progress
Mitigation: define types first, then build.

### Risk: shadcn setup friction
Mitigation: install only needed components.

### Risk: date formatting inconsistency
Mitigation: centralize formatter helper.

### Risk: modal state bugs
Mitigation: use `Activity | null` selected state.

---

## 24. Stretch goals only if everything else is done
Optional, only if there is safe time left:
- add small error banner
- add activity count text above table
- add subtle transition on dialog open
- add basic tests

Do not do these if any core requirement is unfinished.

---

## 25. Definition of done
The final repo should feel like a strong internship submission:
- polished
- brief-compliant
- typed
- readable
- easy to demo in 2 minutes
- easy to defend in an interview

