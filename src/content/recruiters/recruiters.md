---
title: "For Recruiters"
subtitle: "Everything you need to know about me as a software professional."

# Each portfolio item can point at a story on a company page: "<company slug>#<story id>".
portfolio:
  - title: "E2E test infra migration (Meta)"
    summary: "Tech-led the migration of 2,000+ end-to-end tests across 5 Wearables products onto a new execution framework, making them 7x more reliable and up to 40% faster."
    skills: ["Python", "Buck", "Test infrastructure", "Technical leadership"]
    story: "meta#migration"
  - title: "Large-scale data infra migration (Unit21)"
    summary: "Tech-led the move off a single Postgres database onto a new data stack, coordinating 35+ engineers across almost every team."
    skills: ["Snowflake", "Databricks", "Stream processing", "Technical leadership"]
    links:
      - label: "Slide deck"
        url: "/data_migration_project.pdf"
    story: "unit21#data-migration"
  - title: "Dynamic Model Builder (Unit21)"
    summary: "Redesigned Unit21's rules engine into a modular, extensible framework that supported many more rule types, ran faster, and grew to over 90% of executions."
    skills: ["Python", "PostgreSQL", "System design"]
    links:
      - label: "Slide deck"
        url: "/rule_execution_project.pdf"
    story: "unit21#dmb"

# Real, commonly asked behavioral questions. `label` is the short tag shown on the stories.
# Answers are drafts written from the company pages — edit them into your own voice.
questions:
  - id: "influence"
    label: "Influence without authority"
    question: "Tell me about a time you drove change without formal authority."
    answer: "At Kooltra I was hired as a PM, but I knew more about modern engineering practice than anyone on the team, and the process was chaotic — 30 unrelated copies of one codebase, no code review, production not built from source control. One change at a time, I taught, convinced and negotiated until we could ship software consistently."
  - id: "conflict"
    label: "Conflict"
    question: "Tell me about a time you disagreed with a colleague or manager."
    answer: "At Kooltra the VP of R&D pushed back on almost every process change I proposed, without offering alternatives. I held my ground on the substance, but our disagreement eventually boiled over in an email thread copying the whole company. The changes stuck, but my lesson was clear: there's no need for heated arguments in public."
  - id: "trust"
    label: "Earning trust"
    question: "Tell me about a time you had to earn the trust of a difficult stakeholder."
    answer: "Kooltra's founder and CEO would go straight to engineers asking for same-day features, which fed a cycle of bugs. Rather than just push back, I spent a lot of time with him building a roadmap that worked for both customers and engineering, delivered visible outcomes, and kept communication fully transparent. Over time he trusted the process enough to step back from day-to-day product decisions."
  - id: "ambiguity"
    label: "Ambiguity"
    question: "Tell me about a time you took on an ambiguous or messy project."
    answer: "At Meta I stepped in as tech lead on a large migration that had stalled after several teams were re-orged together — high complexity, unclear motivation. I pieced together the full current state, identified what needed work, made a plan and started executing, while communicating progress and challenges openly. Along the way we rebuilt trust with partner teams and made real progress by year end."
  - id: "failure"
    label: "Failure"
    question: "Tell me about a time something didn't go as planned."
    answer: "At Connected I took over leading Olympus, an internal IoT platform being incubated for a spin-off, after its architect moved to client work. I ran the roadmap and the technical decisions and even joined a pitch to a major brand, but the incubation window closed without a spin-off. It taught me a lot about leading a young team somewhere I'd never been, and about humility."
  - id: "setback"
    label: "Turning things around"
    question: "Tell me about a time you were struggling, and how you turned it around."
    answer: "My onboarding project on Facebook Search dragged through a whole half because of product differences and days-long A/B test cycles, and it drained me. I raised it openly with my manager, and we built a better plan for the second half: a capacity-saving caching project, and a personalization roadmap I scoped myself and recruited others onto."
  - id: "team"
    label: "Building a team"
    question: "How have you built and grown a team?"
    answer: "At Unit21 I became the manager of the team that formed around the Dynamic Model Builder and grew it from two people to around fifteen at its peak, during the brutal 2021 hiring market. Some weeks I did 15+ phone screens. I kept iterating on the hiring process, and several great engineers — including former colleagues — joined us."
  - id: "technical"
    label: "Hard technical problem"
    question: "Walk me through a hard technical problem you solved."
    answer: "Moving Unit21 to a partitioned data warehouse meant transactions could no longer get sequential IDs, which much of the system quietly depended on. We changed the ID type, broke the ordering assumption, and rewrote a large number of joins over several months, using A/A tests and very granular switches to migrate safely without a big-bang cutover."
---
