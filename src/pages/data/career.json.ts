import type { APIRoute } from 'astro';
import { careerJson } from '../../mcp';

export const GET: APIRoute = async () =>
  new Response(JSON.stringify(await careerJson(), null, 2), { headers: { 'Content-Type': 'application/json' } });
