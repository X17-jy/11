// Cloudflare Pages Functions - 用户信息 API
import { USER_PROFILE } from '../_data.js';

export async function onRequestGet(context) {
  return new Response(JSON.stringify({
    success: true,
    data: USER_PROFILE
  }), {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      'Cache-Control': 'public, max-age=600'
    }
  });
}
