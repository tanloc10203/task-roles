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
    res.status(201).json({
      message: "OK",
      metadata: response,
    });
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
    res.status(200).json({
      message: "Update succes",
      metadata: response,
    });
  };

  getAll = async (req: Request<{}, {}, {}>, res: Response) => {
    const filters = req.query;
    const response = await PermissionService.getAll(filters);
    res.status(200).json({
      message: "GET ALL SUCCESS",
      metadata: response,
    });
  };

  delete = async (req: Request<{ id: string }, {}, {}>, res: Response) => {
    const id = req.params.id;
    const response = await PermissionService.deleteById(+id);
    res.status(200).json({
      message: "DELETE SUCCESS",
      metadata: response,
    });
  };
}

export default new PermissionController();
