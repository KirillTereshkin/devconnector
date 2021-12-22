import { NextFunction, Response, Request } from "express";
import { ValidationChain, validationResult } from "express-validator";
import { verify } from "jsonwebtoken";
import { ObjectId } from "mongoose";
import config from "../config";
import { RequestAuth } from "../types/Utility";
import Errors from "./errorMessages";

export const createValidationMiddleware = (
  ...validators: ValidationChain[]
) => [
  ...validators,
  (req: Request, res: Response, next: NextFunction): void => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json(errors.array());
      return;
    }

    next();
  },
];

export const authMiddleware = (
  req: RequestAuth,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("token");

  if (!token) {
    res.status(401).json(Errors.notAuthorized);
    return;
  }

  try {
    const payload = verify(token, config.tokenPrivateKey) as
      | { userId: ObjectId }
      | string;

    if (typeof payload === "string") {
      res.status(500).json(Errors.serverError);
      return;
    }

    req.userId = payload.userId;
    next();
  } catch (error) {
    res.status(500).json(Errors.incorrectToken);
  }
};
