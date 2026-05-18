import { getCollection } from 'astro:content';

export async function getSiteConfig() {
  const entries = await getCollection('about');
  return entries[0].data;
}
