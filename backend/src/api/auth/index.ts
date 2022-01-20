import { Router } from "express";
import {
  authUserValidation,
  registerUserValidator,
} from "../../helpers/validators/auth";
import authRoutingService from "../../services/auth";

const authRouter = Router();

// @route POST      api/auth/
// @description     Auth user
// @access          Public
authRouter.post("/", ...authUserValidation, authRoutingService.authUser);

// @route POST      api/auth/
// @description     Register user
// @access          Public
authRouter.post("/", ...registerUserValidator, authRoutingService.registerUser);

export default authRouter;
