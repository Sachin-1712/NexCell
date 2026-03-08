# NexCell AI Activity Dashboard

**Task Objective**: *Refining Dashboard UI*. Upgraded the visual design of the existing NexCell AI Activity Dashboard to a premium, professional dark-theme SaaS interface. Applied a refined deep navy and muted indigo color palette, improved typography and spacing, redesigned UI elements (stat cards, filters, tables, modals), and added subtle animations and hover states while maintaining core functionality, responsiveness, and strict TypeScript adherence.

A clean, single-page AI activity monitoring dashboard built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, and **shadcn/ui**.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000/dashboard](http://localhost:3000/dashboard) in your browser.

## Features

- **API Route** — `/api/activities` returns 10 typed mock activities
- **Summary Stats** — Total, Successful, and Failed activity counts
- **Filters** — Search by user or type, filter by status dropdown
- **Activity Table** — Clickable rows with color-coded status badges
- **Detail Dialog** — Opens on row click with full activity details
- **Loading State** — Skeleton placeholders while data loads
- **Empty State** — Clean message when filters return no results
- **Responsive** — Works on mobile, tablet, and desktop

## Tech Stack

- Next.js 14 (App Router)
- TypeScript (strict, zero `any`)
- Tailwind CSS
- shadcn/ui (Card, Input, Select, Dialog, Skeleton, Badge, Table)

## Assumptions

- Activity data is mock data returned from a local Next.js API route.
- Stats are computed from the full fetched dataset and are not affected by filters.
- Filters are client-side because the dataset is intentionally small.

## With more time

I would add automated tests (unit + integration), server-side pagination/sorting for larger datasets, and column sorting on the activity table.
