import { ValidationError } from "express-validator";
import { sign, SignOptions } from "jsonwebtoken";
import config from "../../config";
import { ErrorType } from "../types/utility/utility";

export const createError = (errors: string | ValidationError[]): ErrorType => {
  if (typeof errors === "string") {
    return { errors: [{ msg: errors }] };
  }

  return { errors };
};

export const generateToken = (
  userId: string,
  signOptions: SignOptions = {
    expiresIn: "10h",
  }
) => sign({ userId }, config.tokenPrivateKey, signOptions);
