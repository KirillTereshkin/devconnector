import { createValidationMiddleware } from "../../../services/middlewares";
import {
  emailValidator,
  passwordValidator,
} from "../../../services/validators";

export const authUserValidation = createValidationMiddleware(
  emailValidator(),
  passwordValidator()
);
