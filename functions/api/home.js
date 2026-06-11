// Cloudflare Pages Functions - 首页数据聚合 API
import { COURSES, PROJECTS, STATS, USER_PROFILE } from '../_data.js';

export async function onRequestGet(context) {
  return new Response(JSON.stringify({
    success: true,
    data: {
      user: USER_PROFILE,
      recommended_courses: COURSES.slice(0, 3),
      recommended_projects: PROJECTS.slice(0, 3),
      stats: STATS
    }
  }), {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      'Cache-Control': 'public, max-age=60'
    }
  });
}
