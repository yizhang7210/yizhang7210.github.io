import { getCollection, type CollectionEntry } from 'astro:content';

// Stories are passages inside a company page, wrapped like:
//   <div class="story" id="dmb" data-title="Designing the Dynamic Model Builder" data-questions="technical">
// The recruiters page links to them, and each story links back to the questions it answers.
// Everything is cross-checked at build time, so a typo fails the build instead of shipping a broken link.

export const companySlug = (id: string) => id.replace(/\.md$/, '').replace(/^\d+-/, '');
const shortName = (name: string) => name.replace(/\s*\(.*?\)\s*/g, '').trim();

export const STORY_OPEN = /<div class="story" id="([^"]+)" data-title="([^"]+)" data-questions="([^"]*)">/g; // questions may be empty for a story only a highlight card links to

export type Story = {
  company: string;
  slug: string;
  id: string;
  title: string;
  questions: string[];
  href: string;
};

export const questionHref = (id: string) => `/recruiters/#q-${id}`;

let cache: Promise<Awaited<ReturnType<typeof load>>> | undefined;
export const getRecruiting = () => (cache ??= load());

async function load() {
  const page = (await getCollection('recruiters'))[0] as CollectionEntry<'recruiters'>;
  const { questions, portfolio, funProjects } = page.data;
  const questionIds = new Set(questions.map((q) => q.id));
  const companies = (await getCollection('companies')).sort((a, b) => a.data.order - b.data.order);

  const errors: string[] = [];
  const stories: Story[] = [];
  for (const c of companies) {
    const slug = companySlug(c.id);
    const seen = new Set<string>();
    for (const m of (c.body ?? '').matchAll(STORY_OPEN)) {
      const [, id, title, qs] = m;
      if (seen.has(id)) errors.push(`${slug}: duplicate story id "${id}"`);
      seen.add(id);
      const qids = qs.split(',').map((q) => q.trim()).filter(Boolean);
      for (const q of qids) if (!questionIds.has(q)) errors.push(`${slug}#${id}: unknown question "${q}"`);
      stories.push({ company: shortName(c.data.name), slug, id, title, questions: qids, href: `/company/${slug}/#${id}` });
    }
  }

  const storyByRef = new Map(stories.map((s) => [`${s.slug}#${s.id}`, s]));
  for (const q of questions) {
    if (!stories.some((s) => s.questions.includes(q.id))) errors.push(`question "${q.id}" has no stories`);
  }
  for (const p of portfolio) {
    if (p.story && !storyByRef.has(p.story)) errors.push(`portfolio "${p.title}": unknown story "${p.story}"`);
  }
  if (errors.length) throw new Error(`Recruiter page / story markers are out of sync:\n  - ${errors.join('\n  - ')}`);

  return {
    page,
    questions,
    portfolio: portfolio.map((p) => ({ ...p, story: p.story ? storyByRef.get(p.story) : undefined })),
    funProjects,
    stories,
    storiesFor: (qid: string) => stories.filter((s) => s.questions.includes(qid)),
    questionLabel: (qid: string) => questions.find((q) => q.id === qid)!.label,
  };
}
