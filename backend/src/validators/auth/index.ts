import { createValidationMiddleware } from "../../helpers/middlewares/validationMiddleware";
import { emailValidator, passwordValidator } from "../../helpers/validators";

export const authUserValidation = createValidationMiddleware(
  emailValidator(),
  passwordValidator()
);
