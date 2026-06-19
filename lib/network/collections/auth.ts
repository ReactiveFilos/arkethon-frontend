import type { Client } from "@arkejs/client";
import { signIn } from "next-auth/react";
import type { Router } from "@/lib/network/index";

export const authCollection = (router: Router) =>
  router.collection({
    sign_in: router.operation.mutation(
      async ({
        input,
      }: {
        input: {
          email: string;
          password: string;
        };
      }) => {
        const { email, password } = input;
        const normalizedEmail = email.toLowerCase();

        const response = await signIn("credentials", {
          email: normalizedEmail,
          password,
          redirect: false,
        });

        return { ...response };
      }
    ),
    get_user: router.operation.query(
      async ({
        ctx: { client },
        input,
      }: {
        ctx: { client: Client };
        input: {
          userId: string;
        };
      }) => {
        const response = await client.unit.get("user", input.userId);
        return response.data.content;
      }
    ),
    edit_user: router.operation.mutation(
      async ({
        ctx: { client },
        input,
      }: {
        ctx: { client: Client };
        input: {
          userId: string;
          data: { resume: string };
        };
      }) => {
        const response = await client.unit.edit(
          "user",
          input.userId,
          input.data
        );
        return response.data.content;
      }
    ),
  });
