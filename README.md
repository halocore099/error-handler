# error-handler

A basic error handler used in navitank.xyz hosted with Cloudflare Workers.

## Description

This is a simple Cloudflare Worker script that intercepts HTTP requests and provides custom handling for 404 errors. When a 404 error occurs, it serves a custom HTML page located at `https://navitank.xyz/404.html`. For any other status code, the response from the original request is returned as usual.

## Usage

This script is used as part of a Cloudflare Workers setup to handle errors for your web application. It intercepts incoming requests and checks the response status. If the response is a 404 error, it fetches and serves a custom 404 HTML page. Otherwise, the original response is returned.

### Requirements

- A Cloudflare account
- A Cloudflare Worker set up for your domain

### How to Deploy

1. Set up a Cloudflare Worker.
2. Replace the default script with this code:
   
   ```javascript
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
