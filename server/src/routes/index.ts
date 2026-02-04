import { Route } from "../lib/router";


const users = async function handler(
  req: Request,
  env: Env
) {
  //const { results } = await env.DB
    //.prepare("SELECT * FROM users")
    //.all();

    const results = [
      { id: 1, name: "Alice" },
      { id: 2, name: "Bob" },
    ];
  return Response.json(results);
}

export const routes: Route[] = [
  {
    method: "GET",
    path: "/identity/users",
    handler: users,
  },
];
