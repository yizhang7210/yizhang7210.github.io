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

export const collections = { companies, pages };
