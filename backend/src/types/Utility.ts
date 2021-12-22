import { Request } from "express";
import { ValidationError } from "express-validator";
import { ObjectId } from "mongoose";

export type ErrorType = {
  errors: Partial<ValidationError>[];
};

export interface RequestAuth extends Request {
  userId?: ObjectId;
}
