export type Route = {
  method: string;
  path: string;
  handler: (
    request: Request,
    env: Env,
    ctx: ExecutionContext
  ) => Promise<Response> | Response;
};


export function createRouter(routes: Route[]) {
  return async function router(
    request: Request,
    env: Env,
    ctx: ExecutionContext
  ): Promise<Response> {
    const url = new URL(request.url);

    for (const route of routes) {
      if (
        route.method === request.method &&
        route.path === url.pathname
      ) {
        return route.handler(request, env, ctx);
      }
    }

    return new Response("Not Found", { status: 404 });
  };
}
