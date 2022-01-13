import { createValidationMiddleware } from "../../middlewares/validationMiddleware"; 
import { nameValidator, emailValidator, passwordValidator } from "../../utils/validators";

export const registerUserValidator = createValidationMiddleware(
  nameValidator(),
  emailValidator(),
  passwordValidator()
);
