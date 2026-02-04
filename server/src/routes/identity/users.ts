import { BaseRoute, RouteConfig } from "../../lib/router";


export class UsersRoute extends BaseRoute {
  
  config: RouteConfig = {
    path: "/identity/users",
    method: "GET"
  }

  async handler(req: Request, env: Env, ctx: ExecutionContext) {
    const results = [
      { id: 1, name: "Alice" },
      { id: 2, name: "Bob" },
    ];
    return Response.json(results);
  }
}
