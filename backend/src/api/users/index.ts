import { Router } from "express";
import { registerUserValidator } from "../../helpers/validators/users";
import usersRoutingService from "../../services/users";

const usersRouter = Router();

// @route POST       api/users
// @description     Register user
// @access          Public
usersRouter.post(
  "/",
  ...registerUserValidator,
  usersRoutingService.registerUser
);

export default usersRouter;
