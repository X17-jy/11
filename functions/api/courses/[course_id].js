// Cloudflare Pages Functions - 课程详情 API
import { COURSES } from '../../_data.js';

export async function onRequestGet(context) {
  const { params } = context;
  const courseId = params.course_id;
  const course = COURSES.find(c => c.id === courseId);
  
  if (!course) {
    return new Response(JSON.stringify({
      success: false,
      error: '课程不存在'
    }), {
      status: 404,
      headers: { 'Content-Type': 'application/json;charset=UTF-8' }
    });
  }
  
  return new Response(JSON.stringify({
    success: true,
    data: course
  }), {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      'Cache-Control': 'public, max-age=300'
    }
  });
}
