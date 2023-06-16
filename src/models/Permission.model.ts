import Model from "@src/helpers/model.helper";
import { RowDataPacket } from "mysql2";

export interface Permission extends RowDataPacket {
  id?: number;
  name: string;
  desc: string;
  slug: string;
  created_at?: string;
  updated_at?: string;
}

class PermissionModel extends Model {
  protected table: string = "permissions";
  protected fillables: string[] = ["id", "name", "desc", "slug"];
  protected timestamps: boolean = true;
}

export default PermissionModel;
