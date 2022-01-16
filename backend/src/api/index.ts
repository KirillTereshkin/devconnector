import { Router } from "express";
import { AppRoutes } from "@helpers/types/utility/routes";

import authRouter from "./auth";
import usersRouter from "./users";
import profileRouter from "./profile";

const rootRouter = Router();

rootRouter.use(AppRoutes.users, usersRouter);
rootRouter.use(AppRoutes.auth, authRouter);
rootRouter.use(AppRoutes.profile, profileRouter);

export default rootRouter;
