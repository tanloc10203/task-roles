import "dotenv/config";
import app from "@src/app";
import log from "@src/utils/logger";
import c from "config";

const PORT = c.get<number>("port");

const server = app.listen(PORT, () => {
  log.info(`server on http://localhost:${PORT}`);
});

process.on("SIGINT", () => {
  server.close(() => console.log("Exits servers."));
});
