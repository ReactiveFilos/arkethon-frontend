import type { Context, Router } from "@/lib/network/index";
import type { Space } from "@/lib/types/types";

export const spacesCollection = (router: Router) =>
  router.collection({
    list: router.operation.query(async ({ ctx }: { ctx: Context }) => {
      const { data } = await ctx.client.rpc("get_owner_spaces", undefined, {
        get: true,
      });
      return data as Space[] | null;
    }),
    single: router.operation.query(
      async ({
        ctx,
        input,
      }: {
        ctx: Context;
        input: {
          id: string;
        };
      }) => {
        const { data } = await ctx.client
          .from("spaces")
          .select("name, description, visibility")
          .eq("id", input.id)
          .single();
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
          name: string;
          description: string | null;
          visibility: Space["visibility"];
        };
      }) => {
        const { count } = await ctx.client.rpc("get_owner_spaces", undefined, {
          head: true,
          get: true,
          count: "estimated",
        });

        const { data } = await ctx.client
          .from("spaces")
          .insert({
            name: input.name,
            description: input.description,
            visibility: input.visibility,
            sort_order: (count || 0) + 1,
          })
          .select("id")
          .single();
        return data;
      }
    ),
    edit: router.operation.mutation(
      async ({
        ctx,
        input,
      }: {
        ctx: Context;
        input: {
          id: string;
          name: string;
          description: string | null;
          visibility: Space["visibility"];
        };
      }) => {
        const { error } = await ctx.client
          .from("spaces")
          .update({
            name: input.name,
            description: input.description,
            visibility: input.visibility,
          })
          .eq("id", input.id);
        if (error) {
          throw new Error(error.message);
        }
      }
    ),
    delete: router.operation.mutation(
      async ({
        ctx,
        input,
      }: {
        ctx: Context;
        input: {
          id: string;
        };
      }) => {
        const { error } = await ctx.client
          .from("spaces")
          .delete()
          .eq("id", input.id);
        if (error) {
          throw new Error(error.message);
        }
      }
    ),
  });
