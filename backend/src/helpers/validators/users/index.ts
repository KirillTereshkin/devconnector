import { createValidationMiddleware } from "@helpers/middlewares/validationMiddleware";
import {
  nameValidator,
  emailValidator,
  passwordValidator,
} from "@helpers/utils/validators";

export const registerUserValidator = createValidationMiddleware(
  nameValidator(),
  emailValidator(),
  passwordValidator()
);
