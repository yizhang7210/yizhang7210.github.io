import { getCollection } from 'astro:content';
import { getSiteConfig } from './config';
import { companySlug, getRecruiting } from './recruiting';

// Builds /.well-known/mcp.json, a Porch site manifest (https://porch.tools) that turns this site
// into an MCP server with named tools, plus the small JSON files those tools read from.
// Generated from the same content as the pages, so the company and question lists never drift.

const place = (city: string, country: string) => (city === country ? city : `${city}, ${country}`);

async function companies() {
  return (await getCollection('companies')).sort((a, b) => b.data.order - a.data.order); // newest first
}

/** /data/career.json: every role, newest first. */
export async function careerJson() {
  return (await companies()).map((c) => {
    const d = c.data;
    const slug = companySlug(c.id);
    return {
      company: slug,
      name: d.name,
      location: place(d.city, d.country),
      startDate: d.startDate,
      endDate: d.endDate,
      partTime: d.track === 'parallel',
      enjoyment: d.rating / 2, // out of 5, as the stars on the home page
      url: `/company/${slug}/`,
    };
  });
}

/** /data/behavioral-questions.json: common behavioral questions, my short answers, and the stories behind them. */
export async function behavioralQuestionsJson() {
  const { questions, storiesFor } = await getRecruiting();
  return questions.map((q) => ({
    id: q.id,
    label: q.label,
    question: q.question,
    answer: q.answer,
    stories: storiesFor(q.id).map((s) => ({ company: s.slug, title: s.title, url: s.href })),
  }));
}

export async function mcpJson() {
  const config = await getSiteConfig();
  const slugs = (await companies()).map((c) => companySlug(c.id));
  const { questions } = await getRecruiting();
  const name = config.name;

  return {
    $schema: 'https://porch.tools/schema/manifest.v1.json',
    version: 1,
    name,
    description: `Personal site of ${name}, a software engineer working on backend, data and infrastructure systems. It covers every company in ${name}'s career — the work, the lessons and the people — plus a page for recruiters.`,
    includeGenericTools: true,
    tools: [
      {
        name: 'get_career_timeline',
        title: 'Career timeline',
        description: `Every role ${name} has held, newest first: company, dates, location, whether it was part-time and how much ${name} enjoyed it (out of 5).`,
        source: '/data/career.json',
      },
      {
        name: 'get_company_experience',
        title: 'One company',
        description: `The full page for one company in ${name}'s career: the roles held, the work and skills, the lessons learned and the people.`,
        inputSchema: {
          type: 'object',
          properties: { company: { type: 'string', enum: slugs, description: 'The company, as listed by get_career_timeline.' } },
          required: ['company'],
        },
        source: '/company/{company}/',
      },
      {
        name: 'get_behavioral_question_answer',
        title: 'Answer to a behavioral question',
        description: `${name}'s answer to a common behavioral interview question, plus the stories from ${name}'s career behind it, each linking to the passage in the company page. Questions: ${questions.map((q) => `${q.id} (${q.label})`).join(', ')}.`,
        inputSchema: {
          type: 'object',
          properties: { question: { type: 'string', enum: questions.map((q) => q.id) } },
          required: ['question'],
        },
        source: '/data/behavioral-questions.json',
        filter: { field: 'id', equals: '{question}' },
      },
      {
        name: 'get_resume',
        title: 'Resume',
        description: `${name}'s current resume in Markdown: experience, skills, education and publications. Generated from the same LaTeX source as the PDF at /resume_yi_zhang.pdf.`,
        source: '/resume_yi_zhang.md',
      },
      {
        name: 'get_recruiter_info',
        title: 'For recruiters',
        description: `What ${name} is looking for and how to reach out, technical highlights, and short answers to common behavioral questions.`,
        source: '/recruiters/',
      },
      {
        name: 'get_questions_for_employers',
        title: 'Interview questions',
        description: `The questions ${name} asks companies when interviewing with them.`,
        source: '/interview-questions/',
      },
    ],
  };
}
