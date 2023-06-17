import { userController } from "@src/controllers";
import RequestMiddleware from "@src/middleware/request.middleware";
import { UserCreateSchema, UserUpdateSchema } from "@src/schema";
import { Router } from "express";

const route = Router();

route.post(
  "/",
  RequestMiddleware.validateResource(UserCreateSchema),
  RequestMiddleware.catchErrorRequest(userController.create)
);

route.patch(
  "/:id",
  RequestMiddleware.validateResource(UserUpdateSchema),
  RequestMiddleware.catchErrorRequest(userController.update)
);
route.get("/:id", RequestMiddleware.catchErrorRequest(userController.getById));
route.delete(
  "/:id",
  RequestMiddleware.catchErrorRequest(userController.delete)
);
route.get("/", RequestMiddleware.catchErrorRequest(userController.getAll));

export default route;
