import log from "@src/utils/logger";
import databaseService from "./instant.db";
import c from "config";

const configDB = c.get<{ name: string }>("db");

try {
  databaseService.createPool();
} catch (error) {
  log.error(`Failed to create connection pool for ${configDB.name}`, error);
}

const DB = databaseService.getPool(configDB.name);

export default DB;
