import DB from "@src/database/init.db";
import { DBResponseQuery } from "@src/types/db";
import log from "@src/utils/logger";
import { RowDataPacket } from "mysql2";

class Model {
  protected table: string;

  constructor() {
    this.table = "";
  }

  /** @description Phương thức tạo 1 bản ghi */
  public create = async (data: { [key: string]: any }) => {
    try {
      let sql = "INSERT INTO ?? SET ?";
      const params = [this.table, data];
      sql = DB.format(sql, params);

      const [response] = await DB.query<DBResponseQuery>(sql);

      return response.insertId;
    } catch (error) {
      log.error("ERROR create:::", error);
    }
  };

  /** @description Phương thức cập nhật 1 bản ghi */
  public updateById = async (data: { [key: string]: any }, id: number) => {
    try {
      let sql = "UPDATE ?? SET ? WHERE ??=?";
      const params = [this.table, data, "id", id];
      sql = DB.format(sql, params);

      const [response] = await DB.query<DBResponseQuery>(sql);

      return response.changedRows === 0 ? false : true;
    } catch (error) {
      log.error("ERROR update by id:::", error);
    }
  };

  /** @description Phương thức cập nhật 1 bản ghi */
  public deleteById = async (id: number) => {
    try {
      let sql = "DELETE FROM ?? WHERE ??=?";
      const params = [this.table, "id", id];
      sql = DB.format(sql, params);

      const [response] = await DB.query<DBResponseQuery>(sql);

      return response.affectedRows === 0 ? false : true;
    } catch (error) {
      log.error("ERROR update by id:::", error);
    }
  };

  /** @description Phương thức lấy 1 danh sách bản ghi */
  public findAll = async <T extends RowDataPacket[]>(
    filter: {
      [key: string]: any;
    } = {}
  ) => {
    try {
      let sql = "SELECT * FROM ??";
      const params = [this.table];
      sql = DB.format(sql, params);

      const [rows] = await DB.query<T[]>(sql);

      return rows;
    } catch (error) {
      log.error("ERROR update by id:::", error);
    }
  };
}

export default Model;
