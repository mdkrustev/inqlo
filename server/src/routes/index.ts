import { BaseRoute } from "../lib/router";
import { UsersRoute } from '../routes/identity/users'

export const routes: BaseRoute[] = [
  new UsersRoute(),
];