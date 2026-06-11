// Cloudflare Pages Functions - Pandas 训练列表 API
import { PANDAS_EXERCISES } from '../_pandas_exercises.js';

export async function onRequestGet(context) {
  // 返回精简版数据（不包含答案）
  const list = PANDAS_EXERCISES.map(({ id, title, level, duration, description }) => ({
    id, title, level, duration, description
  }));
  
  return new Response(JSON.stringify({
    success: true,
    data: list
  }), {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      'Cache-Control': 'public, max-age=300'
    }
  });
}
