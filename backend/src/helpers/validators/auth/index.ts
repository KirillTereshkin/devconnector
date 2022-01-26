import { createValidationMiddleware } from "@helpers/middlewares/validationMiddleware";
import {
  emailValidator,
  nameValidator,
  passwordValidator,
} from "@helpers/utils/validators";

export const authUserValidation = createValidationMiddleware(
  emailValidator(),
  passwordValidator()
);

export const registerUserValidator = createValidationMiddleware(
  nameValidator(),
  emailValidator(),
  passwordValidator()
);
