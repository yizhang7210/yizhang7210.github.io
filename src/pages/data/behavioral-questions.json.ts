import type { APIRoute } from 'astro';
import { behavioralQuestionsJson } from '../../mcp';

export const GET: APIRoute = async () =>
  new Response(JSON.stringify(await behavioralQuestionsJson(), null, 2), { headers: { 'Content-Type': 'application/json' } });
