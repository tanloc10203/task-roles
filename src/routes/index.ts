import { Router } from "express";
import permissonRoute from "./permission.route";
import roleRoute from "./role.route";

const route = Router();

route.use("/api/v1/permissions", permissonRoute);
route.use("/api/v1/roles", roleRoute);

export default route;
