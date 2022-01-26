import { Router } from "express";
import {
  authUserValidation,
  registerUserValidator,
} from "@helpers/validators/auth";
import authRoutingService from "@services/auth";

const authRouter = Router();

// @route POST      api/auth/login
// @description     Login user
// @access          Public
authRouter.post("/login", ...authUserValidation, authRoutingService.authUser);

// @route POST      api/auth/register
// @description     Register user
// @access          Public
authRouter.post(
  "/register",
  ...registerUserValidator,
  authRoutingService.registerUser
);

export default authRouter;
