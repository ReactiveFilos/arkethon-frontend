import { z } from "zod";

import { baseArkeSchema } from "@/lib/validations/arke";

export const adminSchema = baseArkeSchema.extend({
  arke_id: z.literal("admin"),

  arke_system_user: z.string(),
  email: z.string().email(),

  first_name: z.string(),
  last_name: z.string(),

  uncompleted_data: z.boolean(),
});

export type Admin = z.infer<typeof adminSchema>;
