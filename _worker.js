export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    
    if (url.pathname.startsWith('/static/')) {
      return await env.ASSETS.fetch(request);
    }
    
    const response = await fetch(`http://localhost:8080${url.pathname}${url.search}`);
    return new Response(response.body, {
      status: response.status,
      headers: response.headers
    });
  }
};
