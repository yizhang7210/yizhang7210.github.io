# Career Site Template

A static personal profile site built with [Astro](https://astro.build/), featuring an interactive journey banner that visualizes your career as a timeline.

See a live example at [yizhang7210.com](https://yizhang7210.com).

## Getting Started

1. Use this template to create your own repo
2. Install dependencies: `npm install`
3. Start the dev server: `npm run dev`
4. Open `http://localhost:4321/`

## Customization

### 1. Edit your profile (`src/content/about/about.md`)

Update your name, subtitle, links, and country colors in the frontmatter.

### 2. Add your companies (`src/content/companies/`)

Create one markdown file per company. Files are prefixed with a number for filesystem ordering (e.g., `01-first-company.md`).

Each file has:
- **Frontmatter**: name, logo, order, rating (1-10, overall experience), scope (1-10, responsibilities), city, country, dates
- **Body**: your story in markdown, using sections like The Work, Exit, Takeaways, People

See the example files for the full pattern.

### 3. Add company logos (`public/logos/`)

Drop square PNG images for each company, referenced by the `logo` field in frontmatter.

### 4. Add standalone pages (`src/content/pages/`)

Additional pages like interview questions. Each needs a corresponding `.astro` file in `src/pages/`.

### Markdown features

**Role cards** — wrap role content in a white card:
```html
<div class="role-card">

### Role Title (dates)

Content here...

</div>
```

**Skill pills** — add technology tags below a role title:
```html
<div class="skill-pills">
<span>Python</span> <span>AWS</span> <span>PostgreSQL</span>
</div>
```

**Highlight cards** — expandable behavioral interview stories:
```html
<details class="highlight-card">
<summary>Tell me about a time you...</summary>

**Situation:** ...
**Task:** ...
**Action:** ...
**Result:** ...

</details>
```

### Analytics

Add GoatCounter tracking by setting the `analytics.goatcounter` field in `about.md`. Omit the field to disable tracking.

## Deployment

The included GitHub Actions workflow deploys to GitHub Pages on every push to `main`. Enable GitHub Pages in your repo settings with source set to "GitHub Actions".

## Project Structure

```
src/
├── components/                    # UI components (JourneyBanner)
├── content/
│   ├── about/about.md             # Site configuration (name, links, colors)
│   ├── companies/                 # Company content (one file per company)
│   └── pages/                     # Standalone page content
├── content.config.ts              # Content collection schema
├── config.ts                      # Config helper
├── layouts/                       # Shared page layout
├── pages/                         # File-based routing
└── styles/                        # Global styles
public/
└── logos/                         # Company logo images
```
