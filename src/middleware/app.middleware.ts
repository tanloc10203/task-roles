import { ReasonPhrases, StatusCodes } from "@src/core";
import {
  ErrorResponse,
  NotFoundRequestError,
} from "@src/responses/error.response";
import log from "@src/utils/logger";
import { NextFunction, Request, Response } from "express";

class AppMiddleware {
  static catchError404API = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const error = new NotFoundRequestError("Resource not found!");
    return next(error);
  };

  static catchInterServerError = (
    error: ErrorResponse,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    log.error(error);

    const status = error.status || StatusCodes.INTERNAL_SERVER_ERROR;
    const message = error.message || ReasonPhrases.INTERNAL_SERVER_ERROR;

    return res.status(status).json({
      status: "error",
      code: status,
      message,
      others_message: error.others ?? null,
      exception: error.stack,
    });
  };
}

export default AppMiddleware;
