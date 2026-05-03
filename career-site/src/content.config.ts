import { defineCollection, z } from 'astro:content';

const companies = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    logo: z.string(),
    order: z.number(),
    rating: z.number(),
    city: z.string(),
    country: z.string(),
    track: z.string().optional(),
    startDate: z.string(),
    endDate: z.string(),
    roles: z.array(z.object({
      title: z.string(),
      team: z.string(),
      startDate: z.string(),
      endDate: z.string(),
    })),
  }),
});

export const collections = { companies };
