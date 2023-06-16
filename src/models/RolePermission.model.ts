import Model from "@src/helpers/model.helper";
import { RowDataPacket } from "mysql2";

export interface RoleRolePermission extends RowDataPacket {
  role_id: number;
  permission_id: number;
  created_at?: string;
  updated_at?: string;
}

class RoleRolePermissionModel extends Model {
  protected table: string = "RolePermissions";
  protected fillables: string[] = ["id", "role_id", "permission_id"];
  protected timestamps: boolean = true;
}

export default RoleRolePermissionModel;
