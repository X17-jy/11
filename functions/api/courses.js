// Cloudflare Pages Functions - 课程列表 API
import { COURSES } from '../_data.js';

export async function onRequestGet(context) {
  return new Response(JSON.stringify({
    success: true,
    data: COURSES
  }), {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      'Cache-Control': 'public, max-age=300'
    }
  });
}
