import { Response } from "express";
import { ErrorsNames } from "../types/utility/errors";
import Errors from "../utils/errorMessages";

export const errorResponseMiddleware = (errorName: unknown, res: Response) => {
  const error = Errors[errorName as ErrorsNames];
  if (error) {
    res.status(400).json(error);
    return true;
  }

  return false;
};
