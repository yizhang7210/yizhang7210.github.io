# Career Site

A static personal profile site built with [Astro](https://astro.build/), featuring an interactive journey banner.

## Prerequisites

- [Node.js](https://nodejs.org/) v18+
- XeLaTeX (e.g. TeX Live's `texlive-xetex`), only to rebuild the resume PDF

## Getting Started

```bash
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

## Resume

The resume's LaTeX source lives in `resume/` (Deedy template, compiled with XeLaTeX). After editing `resume/resume-Yi-Zhang.tex`, rebuild the PDF and commit it:

```bash
npm run resume   # compiles resume/ and copies the PDF to public/resume_yi_zhang.pdf
```

The site build also turns the same `.tex` into `/resume_yi_zhang.md` (see `src/resume.ts`), which the `get_resume` MCP tool serves. It fails the build on any LaTeX command it doesn't know how to render.

## Deployment

The site deploys automatically to GitHub Pages via the workflow in `.github/workflows/deploy.yml` on every push to `main`.

## Project Structure

```
src/
├── components/                    # UI components (JourneyBanner)
├── content/
│   ├── companies/                 # Company content (one markdown file per company)
│   └── pages/                     # Standalone page content (e.g. interview questions)
├── content.config.ts              # Content collection schema
├── layouts/                       # Shared page layout
├── pages/                         # File-based routing
│   ├── index.astro                # Landing page
│   ├── interview-questions.astro  # Interview questions page
│   └── company/[slug].astro       # Company detail pages
└── styles/                        # Global styles
public/
├── logos/                         # Company logo images
└── *.pdf                          # Slide decks and resume (built from resume/)
resume/                            # Resume LaTeX source, class file and fonts
```

## Customization

Company content lives in `src/content/companies/`, one markdown file per company. Each file has frontmatter for structured data (name, rating, scope, dates, location, logo) and a markdown body for prose content (background, work, takeaways, people). The journey banner on the landing page is driven entirely from this data.

Standalone pages (e.g. interview questions) live in `src/content/pages/`.
