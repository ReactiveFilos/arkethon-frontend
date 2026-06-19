import { z } from "zod";

export const baseArkeSchema = z.object({
  id: z.string(),
  arke_id: z.string(),

  inserted_at: z.string(),
  updated_at: z.string(),

  metadata: z.object({}).optional(),
});
