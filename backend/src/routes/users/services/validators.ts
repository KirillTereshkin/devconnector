import { createValidationMiddleware } from "../../../services/middlewares";
import {
  nameValidator,
  emailValidator,
  passwordValidator,
} from "../../../services/validators";

export const registerUserValidator = createValidationMiddleware(
  nameValidator(),
  emailValidator(),
  passwordValidator()
);
