import { getCollection, getEntry } from 'astro:content';
import { getSiteConfig } from './config';
import { companySlug, getRecruiting } from './recruiting';

// Builds /llms.txt (a short index) and /llms-full.txt (the whole site as one markdown file),
// following the llms.txt convention (https://llmstxt.org). Generated from the same content as
// the pages, so it never drifts.

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const formatDate = (d: string) => (d === 'present' ? 'Present' : `${months[parseInt(d.split('-')[1]) - 1]} ${d.split('-')[0]}`);

// The markdown keeps a little HTML for layout; turn it back into plain markdown.
function toPlainMarkdown(md: string, site: URL) {
  return md
    .replace(/<div class="skill-pills">\s*([\s\S]*?)\s*<\/div>/g, (_, spans: string) => {
      const skills = [...spans.matchAll(/<span>(.*?)<\/span>/g)].map((m) => m[1]);
      return `Skills: ${skills.join(', ')}`;
    })
    .replace(/<div class="story" id="([^"]+)" data-title="([^"]+)"[^>]*>/g, '')
    .replace(/<\/?div[^>]*>/g, '')
    .replace(/\]\((\/[^)]*)\)/g, (_, path: string) => `](${new URL(path, site)})`) // absolute links
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

const abs = (path: string, site: URL) => new URL(path, site).toString();
const place = (city: string, country: string) => (city === country ? city : `${city}, ${country}`);

async function load() {
  const config = await getSiteConfig();
  const companies = (await getCollection('companies')).sort((a, b) => b.data.order - a.data.order); // newest first
  const recruiting = await getRecruiting();
  const opening = await getEntry('recruiter-sections', 'opening-my-door');
  const highlightsNotes = await getEntry('recruiter-sections', 'technical-highlights');
  const interview = (await getCollection('pages')).find((e) => e.id.includes('interview-questions'));
  return { config, companies, recruiting, opening, highlightsNotes, interview };
}

function header(config: Awaited<ReturnType<typeof getSiteConfig>>, site: URL) {
  return [
    `# ${config.name}`,
    '',
    `> Personal site of ${config.name}, a software engineer working on backend, data and infrastructure systems. It covers every company in ${config.name}'s career — the work, the lessons and the people — plus a page for recruiters.`,
    '',
    ...config.links.map((l) => `- ${l.label}: ${abs(l.url, site)}`),
  ];
}

function careerLine(c: Awaited<ReturnType<typeof load>>['companies'][number], site: URL) {
  const d = c.data;
  const part = d.track === 'parallel' && !/part-time/i.test(d.name) ? ', part-time' : '';
  return `- [${d.name}](${abs(`/company/${companySlug(c.id)}/`, site)}): ${place(d.city, d.country)}${part} · ${formatDate(d.startDate)} – ${formatDate(d.endDate)}`;
}

export async function llmsTxt(site: URL) {
  const { config, companies, recruiting } = await load();
  return [
    ...header(config, site),
    '',
    `The full content of this site, as one markdown file: ${abs('/llms-full.txt', site)}`,
    '',
    '## Career (newest first)',
    '',
    ...companies.map((c) => careerLine(c, site)),
    '',
    '## For recruiters',
    '',
    `- [For recruiters](${abs('/recruiters/', site)}): how to reach out, technical highlights, and answers to common behavioral questions.`,
    `- [Resume](${abs('/resume_yi_zhang.md', site)}): ${config.name}'s current resume, in markdown (PDF: ${abs('/resume_yi_zhang.pdf', site)}).`,
    ...recruiting.portfolio.map((p) => `- ${p.title}: ${p.summary}${p.story ? ` (${abs(p.story.href, site)})` : ''}`),
    ...recruiting.funProjects.map((p) => `- Fun project, ${p.title}: ${p.summary}${p.links.length ? ` (${abs(p.links[0].url, site)})` : ''}`),
    '',
    '## Optional',
    '',
    `- [Interview questions](${abs('/interview-questions/', site)}): the questions ${config.name} asks companies when interviewing.`,
    '',
  ].join('\n');
}

export async function llmsFullTxt(site: URL) {
  const { config, companies, recruiting, opening, highlightsNotes, interview } = await load();
  const out: string[] = [...header(config, site), '', '## Career (newest first)', '', ...companies.map((c) => careerLine(c, site)), ''];

  out.push(`# ${recruiting.page.data.title}`, '', abs('/recruiters/', site), '');
  if (opening?.body) out.push(toPlainMarkdown(opening.body, site), '');
  out.push('## Technical highlights', '');
  for (const p of recruiting.portfolio) {
    out.push(`### ${p.title}`, '', p.summary, '', `Skills: ${p.skills.join(', ')}`);
    if (p.story) out.push(`Story: ${abs(p.story.href, site)}`);
    for (const l of p.links) out.push(`${l.label}: ${abs(l.url, site)}`);
    out.push('');
  }
  if (highlightsNotes?.body) out.push(toPlainMarkdown(highlightsNotes.body, site), '');
  if (recruiting.funProjects.length) out.push('## Fun projects', '');
  for (const p of recruiting.funProjects) {
    out.push(`### ${p.title}`, '', p.summary, '', `Skills: ${p.skills.join(', ')}`);
    for (const l of p.links) out.push(`${l.label}: ${abs(l.url, site)}`);
    out.push('');
  }
  out.push('## Behavioral questions', '');
  for (const q of recruiting.questions) {
    out.push(`### ${q.question}`, '', q.answer, '');
    for (const s of recruiting.storiesFor(q.id)) out.push(`- Story: ${s.company} — ${s.title} (${abs(s.href, site)})`);
    out.push('');
  }

  for (const c of companies) {
    const d = c.data;
    out.push(
      `# ${d.name}`,
      '',
      `${abs(`/company/${companySlug(c.id)}/`, site)}`,
      `${place(d.city, d.country)} · ${formatDate(d.startDate)} – ${formatDate(d.endDate)}${d.track === 'parallel' && !/part-time/i.test(d.name) ? ' · part-time' : ''}`,
      '',
      toPlainMarkdown(c.body ?? '', site),
      '',
    );
  }

  if (interview?.body) {
    out.push(`# ${interview.data.title}`, '', abs('/interview-questions/', site), '', toPlainMarkdown(interview.body, site), '');
  }
  return out.join('\n');
}
