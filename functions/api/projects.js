// Cloudflare Pages Functions - 项目列表 API
import { PROJECTS } from '../_data.js';

export async function onRequestGet(context) {
  return new Response(JSON.stringify({
    success: true,
    data: PROJECTS
  }), {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      'Cache-Control': 'public, max-age=300'
    }
  });
}
