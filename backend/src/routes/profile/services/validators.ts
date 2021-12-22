import { createValidationMiddleware } from "../../../services/middlewares";
import { skillsValidator, statusValidator } from "../../../services/validators";

export const createProfileValidator = createValidationMiddleware(
  statusValidator(),
  skillsValidator()
);
