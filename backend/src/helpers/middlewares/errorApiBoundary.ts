import { NextFunction, Request, Response } from "express";
import { ErrorsNames } from "../types/utility/errors";
import Errors from "../utils/errorMessages";

export const errorApiBoundary = async (
  { message }: Error,
  _1: Request,
  res: Response,
  _2: NextFunction
) => {
  const customError = Errors[message as ErrorsNames];

  if (customError) {
    return res.status(400).json(customError);
  }

  return res.status(500).json(Errors.serverError);
};
