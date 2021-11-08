import { Request } from "express";
import { ValidationError } from "express-validator";

export type ErrorType = {
  errors: Partial<ValidationError>[];
};

export interface RequestAuth extends Request {
  userId?: string;
}
