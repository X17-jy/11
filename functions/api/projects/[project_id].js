// Cloudflare Pages Functions - 项目详情 API
import { PROJECTS } from '../../_data.js';

export async function onRequestGet(context) {
  const { params } = context;
  const projectId = params.project_id;
  const project = PROJECTS.find(p => p.id === projectId);
  
  if (!project) {
    return new Response(JSON.stringify({
      success: false,
      error: '项目不存在'
    }), {
      status: 404,
      headers: { 'Content-Type': 'application/json;charset=UTF-8' }
    });
  }
  
  return new Response(JSON.stringify({
    success: true,
    data: project
  }), {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      'Cache-Control': 'public, max-age=300'
    }
  });
}
