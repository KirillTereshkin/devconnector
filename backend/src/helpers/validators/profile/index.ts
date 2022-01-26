import { createValidationMiddleware } from "@helpers/middlewares/validationMiddleware";
import { statusValidator, skillsValidator } from "@helpers/utils/validators";

export const createProfileValidator = createValidationMiddleware(
  statusValidator(),
  skillsValidator()
);
