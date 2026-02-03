import { DurableObject } from "cloudflare:workers";
import { createRouter } from "./lib/router";

/* =========================
   Durable Object
========================= */

export class MyDurableObject extends DurableObject<Env> {
  constructor(state: DurableObjectState, env: Env) {
    super(state, env);
  }

  async sayHello(name: string): Promise<string> {
    return `Hello, ${name}!`;
  }
}

/* =========================
   Routing (lazy)
========================= */

type RouteModule = {
  method: string;
  path: string;
  default: (
    request: Request,
    env: Env,
    ctx: ExecutionContext
  ) => Promise<Response> | Response;
};

type RouterFn = (
  request: Request,
  env: Env,
  ctx: ExecutionContext
) => Promise<Response>;

let _router: RouterFn | null = null;

function getRouter(): RouterFn {
  if (_router) return _router;

  const modules = import.meta.glob("./routes/**/*.ts", {
    eager: true,
  }) as Record<string, RouteModule>;

  const routes = Object.values(modules).map((mod) => ({
    method: mod.method,
    path: mod.path,
    handler: mod.default,
  }));

  _router = createRouter(routes);
  return _router;
}

/* =========================
   Worker entry
========================= */

export default {
  async fetch(
    request: Request,
    env: Env,
    ctx: ExecutionContext
  ): Promise<Response> {
    const router = getRouter();
    return router(request, env, ctx);
  },
} satisfies ExportedHandler<Env>;
