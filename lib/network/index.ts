import type { Client } from "@arkejs/client";
import { type DDmushiInstance, ddmushi } from "ddmushi";
import { client } from "@/lib/arke/client";
import { authCollection } from "@/lib/network/collections/auth";

export type Context = {
  client: Client;
};

export type Router = DDmushiInstance<Context>;

const router = ddmushi.init({
  ctx: { client },
});

export const network = router.collection({
  auth: authCollection(router),
});

export function createServerNetwork(client: Client) {
  const router = ddmushi.init({
    ctx: { client },
  });

  return router.collection({
    auth: authCollection(router),
  });
}
