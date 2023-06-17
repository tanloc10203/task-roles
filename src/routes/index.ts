import { Router } from "express";
import permissonRoute from "./permission.route";
import roleRoute from "./role.route";
import userRoute from "./user.route";

const route = Router();

route.use("/api/v1/permissions", permissonRoute);
route.use("/api/v1/roles", roleRoute);
route.use("/api/v1/users", userRoute);

export default route;
