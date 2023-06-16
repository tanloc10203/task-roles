import { ReasonPhrases, StatusCodes } from "@src/core";
import { Response } from "express";

interface SuccessResponseProp {
  message: string;
  statusCode?: number;
  reasonStatusCode?: string;
  metadata: any;
  options?: any;
}

export class SuccessResponse {
  message: string;
  status: number;
  metadata: any;

  constructor({
    message,
    statusCode = StatusCodes.OK,
    reasonStatusCode = ReasonPhrases.OK,
    metadata = {},
  }: SuccessResponseProp) {
    this.message = message || reasonStatusCode;
    this.status = statusCode;
    this.metadata = metadata;
  }

  send = (res: Response) => {
    return res.status(this.status).json(this);
  };
}

export class OKResponse extends SuccessResponse {
  options: any;

  constructor({ message, metadata, options = {} }: SuccessResponseProp) {
    super({ message, metadata });
    this.options = options;
  }
}

export class CreatedResponse extends SuccessResponse {
  constructor({
    message,
    statusCode = StatusCodes.CREATED,
    reasonStatusCode = ReasonPhrases.CREATED,
    metadata = {},
  }: SuccessResponseProp) {
    super({ message, statusCode, reasonStatusCode, metadata });
  }
}
