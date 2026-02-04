import { createRouter } from "./lib/router";
import { routes } from "./routes";
import { MyDurableObject } from "./durable/my-do";

let router: ReturnType<typeof createRouter> | null = null;

function getRouter() {
  if (!router) {
    router = createRouter(routes);
  }
  return router;
}

export default {
  async fetch(req: Request, env: Env, ctx: ExecutionContext) {
    const router = getRouter();
    return await router(req, env, ctx);
  },
};

export { MyDurableObject };
