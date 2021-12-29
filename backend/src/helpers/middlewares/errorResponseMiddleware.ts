import { Response } from "express";
import { ErrorsNames } from "../../types/errors";
import Errors from "../errorMessages";

export const errorResponseMiddleware = (errorName: unknown, res: Response) => {
  const error = Errors[errorName as ErrorsNames];
  if (error) {
    res.status(400).json(error);
  }
};
