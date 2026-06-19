import type { Role } from "puedo";

import { Admin } from "@/lib/validations/roles/admin";

export const adminRole: Role<Admin> = {
  id: "admin",
  permissions: {
    home: {
      view: true,
    },
  },
};
