# Career Site

A static personal profile site built with [Astro](https://astro.build/), featuring an interactive journey banner.

## Prerequisites

- [Node.js](https://nodejs.org/) v18+

## Getting Started

```bash
cd career-site
npm install
npm run dev
```

The site will be available at `http://localhost:4321/`.

## Build

```bash
npm run build
npm run preview
```

The static output is generated in `dist/`.

## Project Structure

```
src/
├── data/companies.json     # All content (companies, roles, ratings, etc.)
├── components/             # UI components (JourneyBanner)
├── layouts/                # Shared page layout
├── pages/                  # File-based routing
│   ├── index.astro         # Landing page
│   └── company/[slug].astro  # Company detail pages
└── styles/                 # Global styles
public/
└── logos/                  # Company logo images
```

## Customization

All content lives in `src/data/companies.json`. Each company entry includes name, slug, rating, dates, location, roles, and a logo path. The site UI is driven entirely from this file.
