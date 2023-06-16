import { BadRequestError } from "@src/responses/error.response";
import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";

class RequestMiddleware {
  static catchErrorRequest = (
    fn: (
      req: Request<any, any, any>,
      res: Response,
      next: NextFunction
    ) => Promise<any>
  ) => {
    return (req: Request, res: Response, next: NextFunction) => {
      fn(req, res, next).catch(next);
    };
  };

  static validateResource =
    (schema: AnyZodObject) =>
    (req: Request, res: Response, next: NextFunction) => {
      try {
        schema.parse({
          body: req.body,
          query: req.query,
          params: req.params,
        });

        return next();
      } catch (error: any) {
        console.log(error);

        const others = error?.issues?.map((i: any) => i.message);
        throw new BadRequestError("Thiếu dữ liệu", undefined, others);
      }
    };
}

export default RequestMiddleware;
