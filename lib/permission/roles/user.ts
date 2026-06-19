import type { Role } from "puedo";

import type { User } from "@/lib/validations/roles/user";

export const userRole: Role<User> = {
  id: "user",
  permissions: {
    home: {
      view: true,
    },
  },
};
