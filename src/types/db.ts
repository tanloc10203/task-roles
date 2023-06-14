import { RowDataPacket, OkPacket, FieldPacket, ResultSetHeader } from "mysql2";

export type DbDefaults =
  | RowDataPacket[]
  | RowDataPacket[][]
  | OkPacket
  | OkPacket[]
  | ResultSetHeader
  | FieldPacket[];

export type DBResponseQuery = OkPacket | ResultSetHeader;

export type DbQueryResult<T> = T & DbDefaults;
