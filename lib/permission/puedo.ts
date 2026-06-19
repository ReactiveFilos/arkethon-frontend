import type { User } from "next-auth";
import { Puedo } from "puedo";

import { userRole } from "@/lib/permission/roles/user";

const permissions = {
  home: {
    view: false,
  },
};

const puedoRoles = [userRole];

const puedo = new Puedo<User, typeof permissions>({
  accessorKey: "arke_id",
  permissions,
  roles: puedoRoles,
});

export default puedo;

type LeafPaths<T, P extends string = ""> = T extends object
  ? {
      [K in keyof T]-?: K extends string | number
        ? LeafPaths<T[K], `${P}${P extends "" ? "" : "."}${K}`>
        : never;
    }[keyof T]
  : P;

export type PermissionKey = LeafPaths<typeof permissions>;
