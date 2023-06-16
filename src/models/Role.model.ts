import Model from "@src/helpers/model.helper";
import { RowDataPacket } from "mysql2";
import { Permission } from "./Permission.model";

export interface Role extends RowDataPacket {
  id?: number;
  name: string;
  desc: string;
  created_at?: string;
  updated_at?: string;
}

class RoleModel extends Model {
  protected table: string = "roles";
  protected fillables: string[] = ["id", "name", "desc"];
  protected timestamps: boolean = true;

  getPermission = async (id: number) => {
    const permissions = await this.executeQuery<Permission>(
      "getRolePermissionByRoleId",
      [id]
    );

    return permissions;
  };
}

export default RoleModel;
