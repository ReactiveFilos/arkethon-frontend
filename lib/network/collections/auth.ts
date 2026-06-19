import type { Provider } from "@supabase/supabase-js";
import type { Context, Router } from "@/lib/network/index";

export const authCollection = (router: Router) =>
  router.collection({
    sign_in_with_oauth: router.operation.mutation(
      async ({
        ctx,
        input,
      }: {
        ctx: Context;
        input: { provider: Provider; redirectTo?: string };
      }) => {
        const { provider, redirectTo } = input;

        await ctx.client.auth.signInWithOAuth({
          provider,
          options: {
            redirectTo,
          },
        });
      }
    ),
    sign_in_anonymously: router.operation.mutation(
      async ({ ctx }: { ctx: Context }) => {
        const { data } = await ctx.client.auth.signInAnonymously();
        return data;
      }
    ),
    sign_out: router.operation.mutation(async ({ ctx }: { ctx: Context }) => {
      await ctx.client.auth.signOut();
    }),
    get_profile: router.operation.query(async ({ ctx }: { ctx: Context }) => {
      const { data: profile } = await ctx.client
        .from("profiles")
        .select("full_name, created_at")
        .single();
      return profile;
    }),
  });
