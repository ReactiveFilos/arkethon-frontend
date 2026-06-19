import { z } from "zod";

import { userSchema } from "@/lib/validations/roles/user";

export const userTypeSchema = z.union([userSchema]);

export type UserType = z.infer<typeof userTypeSchema>;
