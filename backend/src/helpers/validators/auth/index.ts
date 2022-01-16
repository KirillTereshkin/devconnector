import { createValidationMiddleware } from "@helpers/middlewares/validationMiddleware";
import { emailValidator, passwordValidator } from "@helpers/utils/validators";

export const authUserValidation = createValidationMiddleware(
  emailValidator(),
  passwordValidator()
);
