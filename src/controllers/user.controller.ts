import { CreatedResponse, OKResponse } from "@src/responses";
import { UserInputCreate, UserInputUpdate } from "@src/schema";

import { UserService } from "@src/services";
import { Request, Response } from "express";

class UserController {
  create = async (req: Request<{}, {}, UserInputCreate>, res: Response) => {
    const body = req.body;
    const response = await UserService.create(body);

    return new CreatedResponse({
      message: "Tạo người dùng thành công.",
      metadata: response,
    }).send(res);
  };

  update = async (
    req: Request<UserInputUpdate["params"], {}, UserInputUpdate["body"]>,
    res: Response
  ) => {
    const id = req.params.id;
    const body = req.body;
    const response = await UserService.updateById(body, +id);
    return new OKResponse({
      message: `Cập nhật bản ghi theo id = \`${id}\` thành công`,
      metadata: response,
    }).send(res);
  };

  getAll = async (
    req: Request<{}, { limit: string; page: string }, {}>,
    res: Response
  ) => {
    const response = await UserService.getAll();
    return new OKResponse({
      message: `Lấy danh sách bản ghi thành công`,
      metadata: response,
    }).send(res);
  };

  getById = async (req: Request<{ id: string }, {}, {}>, res: Response) => {
    const id = req.params.id;
    const response = await UserService.getUserById(+id);
    return new OKResponse({
      message: `Lấy bản ghi theo id = \`${id}\` thành công`,
      metadata: response,
    }).send(res);
  };

  delete = async (
    req: Request<{ id: string }, { isDelete: string }, {}>,
    res: Response
  ) => {
    const id = req.params.id;
    const isDelete = req.query.isDelete ? true : false;

    const response = await UserService.deleteById(+id, isDelete);
    return new OKResponse({
      message: "Xóa người dùng thành công.",
      metadata: response,
    }).send(res);
  };
}

export default new UserController();
