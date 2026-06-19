import { z } from "zod";

import { baseArkeSchema } from "@/lib/validations/arke";

export const userSchema = baseArkeSchema.extend({
  arke_id: z.literal("user"),

  arke_system_user: z.string(),
  email: z.email(),

  first_name: z.string(),
  last_name: z.string(),

  uncompleted_data: z.boolean(),
});

export type User = z.infer<typeof userSchema>;
