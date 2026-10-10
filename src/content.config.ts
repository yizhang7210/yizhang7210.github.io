import { defineCollection, z } from 'astro:content';

const companies = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    logo: z.string(),
    order: z.number(),
    rating: z.number(),
    scope: z.number(),
    city: z.string(),
    country: z.string(),
    track: z.string().optional(),
    startDate: z.string(),
    endDate: z.string(),
  }),
});

const pages = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
  }),
});

const about = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    subtitle: z.string(),
    links: z.array(z.object({
      label: z.string(),
      url: z.string(),
    })),
    countryColors: z.record(z.string()),
    defaultCountryColor: z.string(),
    analytics: z.object({
      goatcounter: z.string().optional(),
    }).optional(),
  }),
});

// The page for recruiters: how to reach me, a curated portfolio, and behavioral questions whose
// answers point at stories marked up inside the company pages.
const recruiters = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    portfolio: z.array(z.object({
      title: z.string(),
      summary: z.string(),
      skills: z.array(z.string()),
      links: z.array(z.object({ label: z.string(), url: z.string() })).default([]),
      story: z.string().optional(), // "<company slug>#<story id>"
    })),
    questions: z.array(z.object({
      id: z.string(),
      label: z.string(), // short tag shown on the stories, e.g. "Conflict"
      question: z.string(),
      answer: z.string(),
    })),
  }),
});

// Free-form markdown sections of the recruiter page. Each file fills the slot named after it
// (e.g. `opening-my-door.md`, `technical-highlights.md`); no frontmatter needed.
const recruiterSections = defineCollection({
  type: 'content',
  schema: z.object({}),
});

export const collections = { companies, pages, about, recruiters, 'recruiter-sections': recruiterSections };
