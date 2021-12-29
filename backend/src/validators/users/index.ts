import { createValidationMiddleware } from "../../helpers/middlewares/validationMiddleware";
import {
  nameValidator,
  emailValidator,
  passwordValidator,
} from "../../helpers/validators";

export const registerUserValidator = createValidationMiddleware(
  nameValidator(),
  emailValidator(),
  passwordValidator()
);
