import type { Context, Router } from "@/lib/network/index";
import type { Thread } from "@/lib/types/types";

export const threadsCollection = (router: Router) =>
  router.collection({
    list: router.operation.query(
      async ({ ctx, input }: { ctx: Context; input: { spaceId: string } }) => {
        const { data } = await ctx.client
          .from("threads")
          .select("id, title, visibility, space_id")
          .eq("space_id", input.spaceId)
          .order("sort_order", { ascending: true })
          .overrideTypes<Thread[]>();
        return data;
      }
    ),
    create: router.operation.mutation(
      async ({
        ctx,
        input,
      }: {
        ctx: Context;
        input: {
          title: string;
          description: string | null;
          visibility: Thread["visibility"];
          spaceId: string;
        };
      }) => {
        const { data } = await ctx.client
          .from("threads")
          .insert({
            title: input.title,
            description: input.description,
            visibility: input.visibility,
            space_id: input.spaceId,
          })
          .select("id")
          .single();
        return data;
      }
    ),
  });
