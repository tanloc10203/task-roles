import Model from "@src/helpers/model.helper";
import { RowDataPacket } from "mysql2";
import { Role } from "./Role.model";

export interface User extends RowDataPacket {
  id?: number;
  display_name: string;
  username: string;
  password: string;
  created_at?: string;
  updated_at?: string;
}

class UserModel extends Model {
  protected table: string = "Users";
  protected primaryKey: string = "id";
  protected fillables: string[] = [
    "id",
    "display_name",
    "username",
    "password",
  ];
  protected timestamps: boolean = false;

  public getRoles = async (id: number) => {
    const permissions = await this.executeQuery<Role>("getUerRolesByUserId", [
      id,
    ]);

    return permissions as unknown as Array<Role>;
  };
}

export default UserModel;
