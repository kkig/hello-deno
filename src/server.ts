// import {serveListener} from 'http/mod.ts';
import {serveListener} from '../deps/dep.ts';

const port = Number(Deno.env.get('PORT')) || 8080;
const listner = Deno.listen({port: port});

console.log(`Server listening on http://localhost:${port}...`);

function notFound(req: Request) {
  const header = req.headers;
  const body = `Connection established! \nOoops, no route found for ${header.get(
    'method.'
  )} ${header.get('url')}. \nCurrent URL: ${req.url}`;

  return new Response(body, {status: 404});
}

function found(req: Request) {
  const header = req.headers;
  const url = new URL(req.url);
  const body = `hooray, connection established! Your user-agent is:\n${header.get(
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
