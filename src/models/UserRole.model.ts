import Model from "@src/helpers/model.helper";
import { RowDataPacket } from "mysql2";

export interface UserRoles extends RowDataPacket {
  role_id: number;
  user_id: number;
  created_at?: string;
  updated_at?: string;
}

class UserRolesModel extends Model {
  protected table: string = "UserRoles";
  protected primaryKey: string = "id";
  protected fillables: string[] = ["user_id", "role_id"];
  protected timestamps: boolean = true;
}

export default UserRolesModel;
