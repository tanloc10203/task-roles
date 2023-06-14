import DB from "@src/database/init.db";
import { DBResponseQuery } from "@src/types/db";
import { convertObjToString } from "@src/utils/covert";
import { RowDataPacket } from "mysql2";

class Model {
  protected table: string;

  constructor() {
    this.table = "";
  }

  /** @description Phương thức tạo 1 bản ghi */
  public create = async (data: { [key: string]: any }) => {
    let sql = "INSERT INTO ?? SET ?";
    const params = [this.table, data];
    sql = DB.format(sql, params);

    const [response] = await DB.query<DBResponseQuery>(sql);

    return response.insertId;
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

  /** @description Phương thức lấy 1 danh sách bản ghi */
  public findAll = async <T extends RowDataPacket[]>(
    filter: {
      [key: string]: any;
    } = {}
  ) => {
    let sql = "SELECT * FROM ??";
    const params = [this.table];
    sql = DB.format(sql, params);

    const [rows] = await DB.query<T[]>(sql);

    return rows;
  };

  /** @description Phương thức lấy 1 bản ghi theo điều kiện */
  public findOne = async <T extends RowDataPacket>(conditions: {
    [key: string]: any;
  }) => {
    const { values, where } = convertObjToString(conditions);
    /*
      {id: 1, username: 'adb'} => where = "`id` = ? AND username = ?"
      values = [1, 'abc']
    */

    let sql = `SELECT * FROM ?? WHERE ${where}`;
    const params = [this.table, values];
    sql = DB.format(sql, params);

    const [rows] = await DB.query<T[]>(sql);

    return rows.length ? rows[0] : false;
  };
}

export default Model;
