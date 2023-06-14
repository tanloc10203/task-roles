import permissionController from "@src/controllers/permission.controller";
import RequestMiddleware from "@src/middleware/request.middleware";
import {
  PermissionCreateSchema,
  PermissionUpdateSchema,
} from "@src/schema/permission.schema";
import { Router } from "express";

const route = Router();

route.post(
  "/",
  RequestMiddleware.validateResource(PermissionCreateSchema),
  RequestMiddleware.catchErrorRequest(permissionController.create)
);
route.get(
  "/",
  RequestMiddleware.catchErrorRequest(permissionController.getAll)
);
route.patch(
  "/:id",
  RequestMiddleware.validateResource(PermissionUpdateSchema),
  RequestMiddleware.catchErrorRequest(permissionController.update)
);
route.delete(
  "/:id",
  RequestMiddleware.catchErrorRequest(permissionController.delete)
);

export default route;
