import { z } from "zod";

import { baseArkeSchema } from "@/lib/validations/arke";

export const superAdminSchema = baseArkeSchema.extend({
  arke_id: z.literal("super_admin"),

  arke_system_user: z.string(),

  first_name: z.string(),
  last_name: z.string(),

  uncompleted_data: z.boolean(),
});

export type SuperAdmin = z.infer<typeof superAdminSchema>;
