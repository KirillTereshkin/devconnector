import { createValidationMiddleware } from "../../middlewares/validationMiddleware";
import { statusValidator, skillsValidator } from "../../utils/validators";

export const createProfileValidator = createValidationMiddleware(
  statusValidator(),
  skillsValidator()
);
