// src/lib/router.ts

export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

export type RouteConfig = {
  path: string;
  method: HttpMethod;
};

export interface RouteHandler {
  readonly path: string;
  readonly method: HttpMethod;
  handler(
    req: Request,
    env: Env,
    ctx: ExecutionContext
  ): Promise<Response> | Response;
}

export abstract class BaseRoute implements RouteHandler {
  // задължителен, типизиран config
  abstract readonly config: RouteConfig;

  // публични getters – router-ът работи с тях
  get path(): string {
    return this.config.path;
  }

  get method(): HttpMethod {
    return this.config.method;
  }

  abstract handler(
    req: Request,
    env: Env,
    ctx: ExecutionContext
  ): Promise<Response> | Response;
}

export function createRouter(routes: BaseRoute[]) {
  return async function router(
    req: Request,
    env: Env,
    ctx: ExecutionContext
  ): Promise<Response> {
    const url = new URL(req.url);

    for (const route of routes) {
      if (
        route.method === req.method &&
        route.path === url.pathname
      ) {
        return route.handler(req, env, ctx);
      }
    }

    return new Response("Not Found", { status: 404 });
  };
}
