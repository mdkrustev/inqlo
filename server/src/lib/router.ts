export type Route = {
  method: string;
  path: string;
  handler: (
    req: Request,
    env: Env,
    ctx: ExecutionContext
  ) => Promise<Response> | Response;
};

export function createRouter(routes: Route[]) {
  return async function router(
    req: Request,
    env: Env,
    ctx: ExecutionContext
  ) {
    const url = new URL(req.url);

    for (const route of routes) {
      console.log(`Checking route: ${route.method} ${route.path}`);
      if (route.method === req.method && route.path === url.pathname) {
        return route.handler(req, env, ctx);
      }
    }

    return new Response("Not Found", { status: 404 });
  };
}
