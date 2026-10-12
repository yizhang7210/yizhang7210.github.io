import { readFileSync } from 'node:fs';
import { join } from 'node:path';

// Builds /resume_yi_zhang.md from the LaTeX source in resume/, so the Markdown never drifts from the PDF.
// It only understands the commands the Deedy template uses; anything else fails the build rather than
// leaking raw LaTeX into the output.

const texPath = join(process.cwd(), 'resume', 'resume-Yi-Zhang.tex');

/** The contents of the {...} group starting at `open`, and the index just past it. */
function group(s: string, open: number) {
  let depth = 0;
  for (let i = open; i < s.length; i++) {
    if (s[i] === '{' && s[i - 1] !== '\\') depth++;
    else if (s[i] === '}' && s[i - 1] !== '\\' && --depth === 0) return { body: s.slice(open + 1, i), end: i + 1 };
  }
  throw new Error(`resume: unbalanced braces near "${s.slice(open, open + 40)}"`);
}

/** Replaces every `\cmd{a}{b}…` with fn(a, b, …). */
function replaceCommand(s: string, cmd: string, arity: number, fn: (...args: string[]) => string) {
  let out = '';
  let i = 0;
  for (;;) {
    const at = s.indexOf(`\\${cmd}{`, i);
    if (at < 0) return out + s.slice(i);
    let end = at + cmd.length + 1;
    const args: string[] = [];
    for (let k = 0; k < arity; k++) {
      const g = group(s, end);
      args.push(g.body);
      end = g.end;
    }
    out += s.slice(i, at) + fn(...args);
    i = end;
  }
}

/** Inline LaTeX → Markdown. */
function inline(s: string): string {
  s = replaceCommand(s, 'href', 2, (url, text) => `[${inline(text)}](${url})`);
  s = replaceCommand(s, 'textbf', 1, (t) => `**${inline(t)}**`);
  s = replaceCommand(s, 'textit', 1, (t) => `*${inline(t)}*`);
  s = s
    .replace(/\\vspace\{[^}]*\}/g, '')
    .replace(/\{?\\bf\s+([^{}]*)\}?/g, '**$1**') // {\bf x}, or \bf x when it was a whole argument
    .replace(/\{?\\small\s+([^{}]*)\}?/g, '$1')
    .replace(/\$\\sim\$/g, '~')
    .replace(/\$\\rightarrow\$/g, '→')
    .replace(/``([^']*)''/g, '"$1"')
    .replace(/--/g, '–')
    .replace(/\\([&%$#_])/g, '$1')
    .replace(/\s*\\\\\s*$/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  const leftover = s.match(/\\[a-zA-Z]+/);
  if (leftover) throw new Error(`resume: don't know how to render ${leftover[0]} in "${s}"`);
  return s;
}

type Entry = { title: string; role?: string; when?: string; lines: string[] };
type Section = { title: string; intro: string[]; entries: Entry[] };

/** Parses one column of the resume into its sections. */
function parseColumn(tex: string): Section[] {
  const sections: Section[] = [];
  let section: Section | undefined;
  let entry: Entry | undefined;
  const push = (line: string) => (entry ? entry.lines : section?.intro)?.push(line);

  // Put each command that starts a new block on its own line, so the walk below can go line by line.
  const lines = tex
    .replace(/\\(section|runsubsection|descript|location|item)\b/g, '\n\\$1')
    .replace(/\\(begin|end)\{tightitemize\}/g, '\n')
    .split('\n');

  for (const raw of lines) {
    const line = raw.replace(/\\(vspace|renewcommand)\{.*$/, '').replace(/\\sectionspace/g, '').trim();
    if (!line) continue;
    let m;
    if ((m = line.match(/^\\section\{(.*)\}$/))) {
      section = { title: m[1], intro: [], entries: [] };
      sections.push(section);
      entry = undefined;
    } else if ((m = line.match(/^\\runsubsection\{(.*)\}$/))) {
      entry = { title: inline(m[1]), lines: [] };
      section!.entries.push(entry);
    } else if (line.startsWith('\\descript{')) {
      const g = group(line, '\\descript'.length);
      const role = inline(g.body).replace(/^\|\s*/, '');
      const rest = inline(line.slice(g.end));
      if (role || rest) entry!.role = [role, rest].filter(Boolean).join(' ');
    } else if (line.startsWith('\\location{')) {
      entry!.when = inline(group(line, '\\location'.length).body);
    } else if (line.startsWith('\\item')) {
      push(`- ${inline(line.slice('\\item'.length))}`);
    } else if (line.includes('\\textbullet')) {
      // Skills: "\textbullet{} Python \textbullet{} Java \\" → "Python, Java"
      push(line.split('\\textbullet{}').map(inline).filter(Boolean).join(', '));
    } else {
      push(inline(line));
    }
  }
  return sections;
}

function render(s: Section) {
  const out = [`## ${s.title}`, ''];
  // Links: "GitHub:// [**yizhang7210**](…)" → "- GitHub: [yizhang7210](…)"
  if (s.intro.length) out.push(...s.intro.map((l) => `- ${l.replace(/:\/\/\s*/, ': ').replace(/\[\*\*(.*?)\*\*\]/g, '[$1]')}`), '');
  for (const e of s.entries) {
    // Skills read better as "**Languages:** Python, Java, …" than as a heading each.
    if (s.title === 'Skills') {
      out.push(`- **${e.title}:** ${e.lines.join(', ')}`);
      continue;
    }
    out.push(`### ${e.role && s.title === 'Experience' ? `${e.title} | ${e.role}` : e.title}`, '');
    const meta = [s.title !== 'Experience' ? e.role : undefined, e.when ? `*${e.when}*` : undefined].filter(Boolean);
    if (meta.length) out.push(meta.join('  \n'), '');
    // Bullets stay a list; a plain line right before them (e.g. a team name) becomes a bold sub-heading.
    e.lines.forEach((l, i) => {
      if (l.startsWith('- ')) out.push(l);
      else out.push('', e.lines[i + 1]?.startsWith('- ') ? `**${l}**` : l, '');
    });
    out.push('');
  }
  if (s.title === 'Skills') out.push('');
  return out.join('\n');
}

export function resumeMarkdown() {
  const tex = readFileSync(texPath, 'utf8')
    .split('\n')
    .map((l) => l.replace(/(^|[^\\])%.*$/, '$1')) // strip comments
    .join('\n');

  const doc = tex.slice(tex.indexOf('\\begin{document}') + '\\begin{document}'.length, tex.indexOf('\\end{document}'));
  const namesection = doc.indexOf('\\namesection');
  const [, name, header] = [0, 1, 2].reduce<{ args: string[]; end: number }>(
    (acc) => {
      const g = group(doc, acc.end);
      return { args: [...acc.args, g.body], end: g.end };
    },
    { args: [], end: namesection + '\\namesection'.length },
  ).args;
  const [contact, tagline] = header.split('\\\\').map(inline).filter(Boolean);

  // Two minipages: skills, links, education & publications on the left; experience on the right.
  // Experience goes first here, since it's what a reader of the Markdown is most likely after.
  const columns = [...doc.matchAll(/\\begin\{minipage\}(?:\[[^\]]*\])?\{[^}]*\}([\s\S]*?)\\end\{minipage\}/g)].map((m) => parseColumn(m[1]));
  if (columns.length !== 2) throw new Error(`resume: expected two columns, found ${columns.length}`);
  const sections = [...columns[1], ...columns[0]];

  return [`# ${inline(name)}`, '', `${tagline}  `, contact, '', ...sections.map(render)].join('\n').replace(/\n{3,}/g, '\n\n').trim() + '\n';
}
