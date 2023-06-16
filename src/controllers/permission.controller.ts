import { CreatedResponse, OKResponse } from "@src/responses";
import {
  PermissionInputCreate,
  PermissionInputUpdate,
} from "@src/schema/permission.schema";
import PermissionService from "@src/services/permission.service";
import { Request, Response, RequestParamHandler } from "express";

class PermissionController {
  create = async (
    req: Request<{}, {}, PermissionInputCreate>,
    res: Response
  ) => {
    const body = req.body;
    const response = await PermissionService.create(body);

    return new CreatedResponse({
      message: "Tạo quyền thành công.",
      metadata: {
        lastInsertId: response,
      },
    }).send(res);
  };

  update = async (
    req: Request<
      PermissionInputUpdate["params"],
      {},
      PermissionInputUpdate["body"]
    >,
    res: Response
  ) => {
    const body = req.body;
    const id = req.params.id;
    const response = await PermissionService.update(body, +id);

    return new OKResponse({
      message: "Cập nhật quyền thành công.",
      metadata: {},
    }).send(res);
  };

  getAll = async (
    req: Request<{}, { limit: string; page: string }, {}>,
    res: Response
  ) => {
    const filters = req.query;
    const response = await PermissionService.getAll(filters);
    return new OKResponse({
      message: "Lấy danh sách quyền thành công.",
      metadata: response,
      options: filters,
    }).send(res);
  };

  delete = async (req: Request<{ id: string }, {}, {}>, res: Response) => {
    const id = req.params.id;
    const response = await PermissionService.deleteById(+id);
    return new OKResponse({
      message: "Xóa quyền thành công.",
      metadata: {},
    }).send(res);
  };
}

export default new PermissionController();
