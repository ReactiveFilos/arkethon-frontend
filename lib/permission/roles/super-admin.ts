import type { Role } from "puedo";

import { SuperAdmin } from "@/lib/validations/roles/super-admin";

export const superAdminRole: Role<SuperAdmin> = {
  id: "super_admin",
  permissions: {
    home: {
      view: true,
    },
  },
};
