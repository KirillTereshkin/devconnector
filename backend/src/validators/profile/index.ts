import { createValidationMiddleware } from "../../helpers/middlewares/validationMiddleware";
import { statusValidator, skillsValidator } from "../../helpers/validators";

export const createProfileValidator = createValidationMiddleware(
  statusValidator(),
  skillsValidator()
);
