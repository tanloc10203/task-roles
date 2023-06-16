import { roleController } from "@src/controllers";
import RequestMiddleware from "@src/middleware/request.middleware";
import { RoleCreateSchema, RoleUpdateSchema } from "@src/schema";
import { Router } from "express";

const route = Router();

route.post(
  "/",
  RequestMiddleware.validateResource(RoleCreateSchema),
  RequestMiddleware.catchErrorRequest(roleController.create)
);

route.patch(
  "/:id",
  RequestMiddleware.validateResource(RoleUpdateSchema),
  RequestMiddleware.catchErrorRequest(roleController.update)
);
route.get("/:id", RequestMiddleware.catchErrorRequest(roleController.getById));
route.get("/", RequestMiddleware.catchErrorRequest(roleController.getAll));

export default route;
