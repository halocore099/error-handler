addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  const url = new URL(request.url);
  const response = await fetch(request);
  
  if (response.status === 404) {
    // Replace this with the path to your custom 404 HTML page
    const errorPageResponse = await fetch('https://navitank.xyz/404.html');
    const errorPage = await errorPageResponse.text();
    return new Response(errorPage, {
      headers: { 'Content-Type': 'text/html' },
      status: 404,
    });
  }
  return response;
}
