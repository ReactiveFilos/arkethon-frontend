import { z } from "zod";

import { adminSchema } from "@/lib/validations/roles/admin";

export const userTypeSchema = z.union([adminSchema]);

export type UserType = z.infer<typeof userTypeSchema>;
