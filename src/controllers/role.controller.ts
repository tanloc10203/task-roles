import { CreatedResponse } from "@src/responses";
import { RoleInputCreate } from "@src/schema";

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

  update = async (req: Request, res: Response) => {};

  getAll = async (
    req: Request<{}, { limit: string; page: string }, {}>,
    res: Response
  ) => {};

  delete = async (req: Request<{ id: string }, {}, {}>, res: Response) => {};
}

export default new RoleController();
