import { ValidationError } from "express-validator";
import { ErrorType } from "../types/Utility";

export const createError = (errors: string | ValidationError[]): ErrorType => {
  if (typeof errors === "string") {
    return { errors: [{ msg: errors }] };
  }

  return { errors };
};
