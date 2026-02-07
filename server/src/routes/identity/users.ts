import { BaseRoute, RouteConfig } from "../../lib/router";



export class UsersRoute extends BaseRoute {

  config: RouteConfig = {
    path: "/identity/users",
    method: "GET"
  }

  async handler(req: Request, env: Env, ctx: ExecutionContext) {
    const {results} = await env.DB.prepare("SELECT * FROM plans").all();
    return Response.json(results);
  }
}
