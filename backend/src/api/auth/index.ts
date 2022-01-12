import { Router } from "express";
import { authMiddleware } from "../../helpers/middlewares/authMiddleware";
import { authUserValidation } from "../../validators/auth";
import authRoutingService from "../../services/auth";

const authRouter = Router();

// @route GET       api/auth/info
// @description     Get user info
// @access          Private
authRouter.get("/info", authMiddleware, authRoutingService.getUserInfo);

// @route POST      api/auth/
// @description     Auth user
// @access          Public
authRouter.post("/", ...authUserValidation, authRoutingService.authUser);

export default authRouter;
