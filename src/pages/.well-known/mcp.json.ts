import type { APIRoute } from 'astro';
import { mcpJson } from '../../mcp';

export const GET: APIRoute = async () =>
  new Response(JSON.stringify(await mcpJson(), null, 2), { headers: { 'Content-Type': 'application/json' } });
