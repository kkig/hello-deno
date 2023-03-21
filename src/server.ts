// import {serveListener} from 'https://deno.land/std@0.180.0/http/mod.ts';
import {serveListener} from 'http/mod.ts';

const BINDING = 8080;
const listner = Deno.listen({port: BINDING});

console.log(`Server listening on http://localhost:${BINDING}...`);

function notFound(req: Request) {
  const header = req.headers;
  const body = `No route found for ${header.get('method')} ${header.get(
    'url'
  )}. \nCurrent URL: ${req.url}`;

  return new Response(body, {status: 404});
}

function found(req: Request) {
  const header = req.headers;
  const url = new URL(req.url);
  const body = `Connection established! Your user-agent is:\n${header.get(
    'user-agent' ?? 'Unknown'
  )}. \nCurrent location: ${req.url}. \nPath: ${url.pathname}`;

  return new Response(body, {status: 200});
}

await serveListener(listner, (req) => {
  const url = new URL(req.url);
  console.log(JSON.stringify(req.headers));
  console.log(req.url);
  const res =
    req.method === 'GET' && url.pathname === '/' ? found(req) : notFound(req);

  return res;
  //   const body = `Your user-agent is:\n\n${
  //     req.headers.get('user-agent') ?? 'Unknown'
  //   }`;
  //   return new Response(body, {status: 200});
});
