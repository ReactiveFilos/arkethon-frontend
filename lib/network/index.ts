import { type DDmushiInstance, ddmushi } from "ddmushi";
import { authCollection } from "@/lib/network/collections/auth";
import { elementsCollection } from "@/lib/network/collections/elements";
import { spacesCollection } from "@/lib/network/collections/spaces";
import { threadsCollection } from "@/lib/network/collections/threads";
import { createClient } from "@/lib/supabase/client";
import type { Supabase } from "@/lib/types/supabase.type";

export type Context = {
  client: Supabase;
};

export type Router = DDmushiInstance<Context>;

const router = ddmushi.init({
  ctx: { client: createClient() },
});

export const network = router.collection({
  auth: authCollection(router),
  spaces: spacesCollection(router),
  threads: threadsCollection(router),
  elements: elementsCollection(router),
});

export function createServerNetwork(client: Supabase) {
  const router = ddmushi.init({
    ctx: { client },
  });

  return router.collection({
    auth: authCollection(router),
    spaces: spacesCollection(router),
    threads: threadsCollection(router),
    elements: elementsCollection(router),
  });
}
