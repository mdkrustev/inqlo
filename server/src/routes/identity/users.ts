import { Env } from "../../env";

export const method = "GET";
export const path = "/identity/users";

export default async function handler(
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
