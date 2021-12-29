import { NextFunction, Response, Request } from "express";
import { ValidationChain, validationResult } from "express-validator";

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
