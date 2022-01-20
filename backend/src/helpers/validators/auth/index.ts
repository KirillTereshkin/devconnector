import { createValidationMiddleware } from "../../middlewares/validationMiddleware";
import {
  emailValidator,
  nameValidator,
  passwordValidator,
} from "../../utils/validators";

export const authUserValidation = createValidationMiddleware(
  emailValidator(),
  passwordValidator()
);

export const registerUserValidator = createValidationMiddleware(
  nameValidator(),
  emailValidator(),
  passwordValidator()
);
