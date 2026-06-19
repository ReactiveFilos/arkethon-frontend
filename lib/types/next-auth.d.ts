import type { SuperAdmin } from "@/lib/validations/roles/super-admin";
import type { Admin } from "@/lib/validations/roles/user";

type IUser = SuperAdmin | Admin | MasterSales | Sales | Reviewer | Agency;

declare module "next-auth" {
  interface Session {
    user: User;
    access_token?: string;
    refresh_token?: string;
  }

  interface User extends IUser {
    arke_id: string;
    uncompleted_data: boolean;
    access_token: string;
    refresh_token: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user?: User;
    access_token: string;
    refresh_token: string;
  }
}
