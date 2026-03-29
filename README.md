# Bread-Crumb Playground

A TanStack Router + React playground for building and testing breadcrumb behavior on deep nested routes.

The app is set up to help you test:
- automatic breadcrumb generation from pathname
- active segment highlighting
- deep route navigation with dynamic params
- animation behavior while navigating between nested pages

## Tech Stack

- React 19
- TanStack Router (file-based routing)
- Vite
- TypeScript
- Tailwind CSS v4
- Motion (`motion/react`)

## Quick Start

```bash
pnpm install
pnpm dev
```

App runs at:
- `http://localhost:3000`

## Available Scripts

```bash
pnpm dev       # Start dev server
pnpm build     # Production build
pnpm preview   # Preview production build
pnpm test      # Run Vitest
pnpm lint      # Run ESLint
pnpm format    # Check Prettier formatting
pnpm check     # Prettier write + ESLint fix
```

## Route Structure

Current route surface:

- `/`
- `/docs`
- `/docs/$sectionSlug`
- `/docs/$sectionSlug/$topicSlug`
- `/docs/$sectionSlug/$topicSlug/$articleSlug`

Example deep route:
- `/docs/guides/routing/file-based-routing`

## Breadcrumb Behavior

`MainCrumb` reads the current pathname and builds breadcrumbs automatically.

Behavior:
- always includes `Home`
- converts slug segments to human-readable labels
- marks only the last segment as active
- active breadcrumb is rendered as plain text
- previous segments are rendered as links

Main implementation file:
- `src/components/nav/MainCrumb.tsx`

## Project Structure

- `src/routes` - file-based route definitions
- `src/components/nav/MainCrumb.tsx` - breadcrumb logic + animation
- `src/components/ui/breadcrumb.tsx` - breadcrumb UI primitives
- `src/content.docsCatalog.ts` - docs content data used by route pages
- `src/styles.css` - global styling/theme

## Build Status (local)

Verified locally:
- `pnpm exec tsc --noEmit` passes
- `pnpm build` passes

Current lint note:
- `pnpm lint` reports 2 existing import-style errors in:
  - `src/components/ui/breadcrumb.tsx`
  - `src/lib/utils.ts`

## Push to Your Repository

If your remote is already configured:

```bash
git add .
git commit -m "docs: update README for breadcrumb playground"
git push
```

If this is a new remote repository:

```bash
git remote add origin <your-repo-url>
git branch -M main
git push -u origin main
```
