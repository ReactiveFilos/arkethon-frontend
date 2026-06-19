import type { Client } from "@arkejs/client";
import type { User } from "next-auth";

import { getClient } from "@/lib/arke";

export async function fetchCurrentUser(
  user: User,
  client?: Client
): Promise<User> {
  const fetchClient = client ?? getClient();
  const res = await fetchClient.unit.get<User>(user.arke_id, user.id);

  return res.data.content;
}
