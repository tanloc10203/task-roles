import { Router } from "express";
import permissonRoute from "./permission.route";

const route = Router();

route.use("/api/v1/permissions", permissonRoute);

export default route;
