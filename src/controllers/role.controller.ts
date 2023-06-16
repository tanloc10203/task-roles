import { CreatedResponse, OKResponse } from "@src/responses";
import { RoleInputCreate, RoleInputUpdate } from "@src/schema";

import { RoleService } from "@src/services";
import { Request, Response } from "express";

class RoleController {
  create = async (req: Request<{}, {}, RoleInputCreate>, res: Response) => {
    const body = req.body;
    const response = await RoleService.create(body);

    return new CreatedResponse({
      message: "Tạo vai trò thành công.",
      metadata: response,
    }).send(res);
  };

  update = async (
    req: Request<RoleInputUpdate["params"], {}, RoleInputUpdate["body"]>,
    res: Response
  ) => {
    const id = req.params.id;
    const body = req.body;
    const response = await RoleService.updateById(body, +id);
    return new OKResponse({
      message: `Cập nhật bản ghi theo id = \`${id}\` thành công`,
      metadata: response,
    }).send(res);
  };

  getAll = async (
    req: Request<{}, { limit: string; page: string }, {}>,
    res: Response
  ) => {
    const response = await RoleService.getAll();
    return new OKResponse({
      message: `Lấy danh sách bản ghi thành công`,
      metadata: response,
    }).send(res);
  };

  getById = async (req: Request<{ id: string }, {}, {}>, res: Response) => {
    const id = req.params.id;
    const response = await RoleService.getRoleById(+id);
    return new OKResponse({
      message: `Lấy bản ghi theo id = \`${id}\` thành công`,
      metadata: response,
    }).send(res);
  };

  delete = async (req: Request<{ id: string }, {}, {}>, res: Response) => {};
}

export default new RoleController();
