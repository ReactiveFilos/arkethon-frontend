import { User } from "next-auth";
import { Puedo } from "puedo";

import { adminRole } from "@/lib/permission/roles/admin";
import { agencyRole } from "@/lib/permission/roles/agency";
import { masterSalesRole } from "@/lib/permission/roles/master-sales";
import { reviewerRole } from "@/lib/permission/roles/reviewer";
import { salesRole } from "@/lib/permission/roles/sales";
import { superAdminRole } from "@/lib/permission/roles/super-admin";

const permissions = {
  home: {
    view: false,
  },
};

const puedoRoles = [
  superAdminRole,
  adminRole,
  masterSalesRole,
  salesRole,
  reviewerRole,
  agencyRole,
];

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
