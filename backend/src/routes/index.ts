import { Router } from "express";
import authRouter from "./auth";
import usersRouter from "./users";
import profileRouter from "./profile";
import { AppRoutes } from "../types/Router";

const router: Record<keyof typeof AppRoutes, Router> = {
  auth: authRouter,
  users: usersRouter,
  profile: profileRouter,
};

export default router;
