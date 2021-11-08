import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { verify } from "jsonwebtoken";
import config from "../config";
import UserModel from "../model/Users";
import { RequestAuth } from "../types/Utility";
import Errors from "./errorMessages";

export const validationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400).json(errors.array());
    return;
  }

  next();
};

export const authMiddlewares = async (
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
    const payload = verify(token, config.tokenProvateKey) as
      | { user: string }
      | string;

    if (typeof payload === "string") {
      res.status(500).json(Errors.serverError);
      return;
    }

    const user = await UserModel.findById(payload.user);

    if (!user) {
      res.status(400).json(Errors.userNotExist);
      return;
    }

    req.userId = payload.user;
    next();
  } catch (error) {
    res.status(500).json(Errors.incorrectToken);
  }
};
