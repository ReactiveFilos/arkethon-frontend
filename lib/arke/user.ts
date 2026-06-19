import type { Client } from "@arkejs/client";
import type { User } from "next-auth";

export async function fetchCurrentUser(
  user: User,
  client: Client
): Promise<User> {
  const res = await client.unit.get<User>(user.arke_id, user.id);

  return res.data.content;
}
