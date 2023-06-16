import DB from "@src/database/init.db";
import { DBResponseQuery } from "@src/types/db";
import {
  convertObjToString,
  convertParamToString,
  convertStringToArrayForSelect,
} from "@src/utils/covert";
import { RowDataPacket } from "mysql2";

abstract class Model {
  protected abstract table: string;
  protected abstract fillables: Array<string>;
  protected abstract timestamps: boolean;

  /** @description Phương thức tạo 1 bản ghi. Trả về id sau khi tạo. */
  public create = async (data: { [key: string]: any }) => {
    let sql = "INSERT INTO ?? SET ?";
    const params = [this.table, data];
    sql = DB.format(sql, params);

    const [response] = await DB.query<DBResponseQuery>(sql);

    return response.insertId;
  };

  /** @description Phương thức tạo nhiều bản ghi. */
  public createBulk = async (data: Array<Array<string | number>>) => {
    /**
      data: [['role_id', 'permission_id']] => [[1,2], [3,4]];
      ["id", "role_id", "permission_id"] => ["role_id", "permission_id"]
     */
    const fieldBulk = this.fillables.filter((f) => f !== "id");

    let sql = "INSERT INTO ?? (??) VALUES ?";
    const params = [this.table, fieldBulk, data];
    sql = DB.format(sql, params);

    const [response] = await DB.query<DBResponseQuery>(sql);

    return response.affectedRows === 0 ? false : true;
  };

  /** @description Phương thức cập nhật 1 bản ghi */
  public updateById = async (data: { [key: string]: any }, id: number) => {
    let sql = "UPDATE ?? SET ? WHERE ??=?";
    const params = [this.table, data, "id", id];
    sql = DB.format(sql, params);

    const [response] = await DB.query<DBResponseQuery>(sql);

    return response.changedRows === 0 ? false : true;
  };

  /** @description Phương thức cập nhật 1 bản ghi */
  public deleteById = async (id: number) => {
    let sql = "DELETE FROM ?? WHERE ??=?";
    const params = [this.table, "id", id];
    sql = DB.format(sql, params);

    const [response] = await DB.query<DBResponseQuery>(sql);

    return response.affectedRows === 0 ? false : true;
  };

  /** @description Phương thức cập nhật 1 bản ghi */
  public delete = async (conditions: { [key: string]: any }) => {
    const { values, where } = convertObjToString(conditions);

    let sql = `DELETE FROM ?? WHERE ${where}`;
    const params = [this.table, values];
    sql = DB.format(sql, params);

    const [response] = await DB.query<DBResponseQuery>(sql);

    return response.affectedRows === 0 ? false : true;
  };

  /** @description Phương thức lấy 1 danh sách bản ghi */
  public findAll = async <T extends RowDataPacket>(
    filter: {
      [key: string]: any;
    } = {},
    select = ""
  ) => {
    let sql = "SELECT ?? FROM ??";
    const selects = convertStringToArrayForSelect(
      select,
      this.fillables.concat(this.timestamps ? ["created_at", "updated_at"] : [])
    );

    const params = [selects, this.table];
    sql = DB.format(sql, params);

    const [rows] = await DB.query<T[]>(sql);

    return rows;
  };

  /** @description Phương thức lấy 1 bản ghi theo điều kiện */
  public findOne = async <T extends RowDataPacket>(
    conditions: {
      [key: string]: any;
    },
    select = ""
  ) => {
    const { values, where } = convertObjToString(conditions);
    /*
      {id: 1, username: 'adb'} => where = "`id` = ? AND username = ?"
      values = [1, 'abc']
    */

    const selects = convertStringToArrayForSelect(
      select,
      this.fillables.concat(this.timestamps ? ["created_at", "updated_at"] : [])
    );

    let sql = `SELECT ?? FROM ?? WHERE ${where}`;
    const params = [selects, this.table, values];
    sql = DB.format(sql, params);

    const [rows] = await DB.query<T[]>(sql);

    return rows.length ? rows[0] : false;
  };

  private buidQuery = (fncName: string, params: Array<string | number>) => {
    return `CALL \`${fncName}\`` + "(" + convertParamToString(params) + ")";
  };

  public executeQuery = async <T extends RowDataPacket>(
    procedureName: string,
    params: Array<string | number> = []
  ) => {
    const query = this.buidQuery(procedureName, params);
    console.log(`Params to exetuce query:`, query);

    const [rows] = await DB.query<T[]>(query, params);

    return rows[0];
  };
}

export default Model;
