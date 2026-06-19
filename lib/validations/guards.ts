import type { User } from "next-auth";

import type { Admin } from "@/lib/validations/roles/admin";
import type { SuperAdmin } from "@/lib/validations/roles/super-admin";
import type { UserType } from "@/lib/validations/roles/users";

export type UserSessionRole = Omit<User, "access_token" | "refresh_token">;

export function isSuperAdmin(
  user: UserSessionRole | UserType
): user is SuperAdmin {
  return user.arke_id === "super_admin";
}

export function isAdmin(user: UserSessionRole | UserType): user is Admin {
  return user.arke_id === "admin";
}
