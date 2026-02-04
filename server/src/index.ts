import { createRouter } from "./lib/router";
import { routes } from "./routes";
import { MyDurableObject } from "./durable/my-do";

let router: ReturnType<typeof createRouter> | null = null;

function getRouter() {
  if (!router) router = createRouter(routes);
  return router;
}

export default {
  async fetch(req: Request, env: Env, ctx: ExecutionContext) {
 //   return  //const { results } = await env.DB
    //.prepare("SELECT * FROM users")
    //.all();

    const results = [
      { id: 1, name: "Alice" },
      { id: 2, name: "Bob" },
    ];
    return Response.json(results);
  },
};

export { MyDurableObject };
