import authRouter from "./auth";
import usersRouter from "./users";

const router = {
  users: usersRouter,
  auth: authRouter,
};

export default router;
