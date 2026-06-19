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
  });
