export const method = "GET";
export const path = "/identity/users";

export default async function handler(req: Request, env: Env) {
  const body = await req.json();

  return Response.json({
    ok: true,
    user: body,
  });
}
