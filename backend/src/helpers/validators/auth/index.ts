import { createValidationMiddleware } from "../../middlewares/validationMiddleware";
import { emailValidator, passwordValidator } from "../../utils/validators";

export const authUserValidation = createValidationMiddleware(
  emailValidator(),
  passwordValidator()
);
