// Cloudflare Pages Functions - Pandas 练习详情 API
import { PANDAS_EXERCISES } from '../../_pandas_exercises.js';

export async function onRequestGet(context) {
  const { params } = context;
  const exerciseId = parseInt(params.exercise_id);
  const exercise = PANDAS_EXERCISES.find(e => e.id === exerciseId);
  
  if (!exercise) {
    return new Response(JSON.stringify({
      success: false,
      error: '练习不存在'
    }), {
      status: 404,
      headers: { 'Content-Type': 'application/json;charset=UTF-8' }
    });
  }
  
  return new Response(JSON.stringify({
    success: true,
    data: exercise,
    total: PANDAS_EXERCISES.length
  }), {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      'Cache-Control': 'public, max-age=300'
    }
  });
}
