import type { Context, Router } from "@/lib/network/index";
import type { Element } from "@/lib/types/types";

export const elementsCollection = (router: Router) =>
  router.collection({
    list: router.operation.query(
      async ({ ctx, input }: { ctx: Context; input: { threadId: string } }) => {
        const { data } = await ctx.client
          .from("elements")
          .select("id, title, space_id, thread_id")
          .eq("thread_id", input.threadId)
          .order("created_at", { ascending: false })
          .overrideTypes<Element[]>();
        return data;
      }
    ),
  });
