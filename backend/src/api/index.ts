import { Router } from "express";
import authRouter from "./auth";
import usersRouter from "./users";
import profileRouter from "./profile";
import { AppRoutes } from "../types/api";

const rootRouter = Router();

rootRouter.use(AppRoutes.users, usersRouter);
rootRouter.use(AppRoutes.auth, authRouter);
rootRouter.use(AppRoutes.profile, profileRouter);

export default rootRouter;
