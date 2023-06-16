import { roleController } from "@src/controllers";
import RequestMiddleware from "@src/middleware/request.middleware";
import { RoleCreateSchema } from "@src/schema";
import { Router } from "express";

const route = Router();

route.post(
  "/",
  RequestMiddleware.validateResource(RoleCreateSchema),
  RequestMiddleware.catchErrorRequest(roleController.create)
);

export default route;
