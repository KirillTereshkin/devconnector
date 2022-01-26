import { Router } from "express";
import { authMiddleware } from "@helpers/middlewares/authMiddleware";
import usersRoutingService from "@services/users";

const usersRouter = Router();

// @route GET       api/users/info
// @description     Get user info
// @access          Private
usersRouter.get("/info", authMiddleware, usersRoutingService.getUserInfo);

// @route DELETE    api/users
// @description     Delete user and all connected data - profiles and posts
// @access          Private
usersRouter.delete("/", authMiddleware, usersRoutingService.deleteUser);

export default usersRouter;
