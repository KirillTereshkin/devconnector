import { Router } from "express";
import { compare } from "bcrypt";
import UserModel from "../../model/users";
import Errors from "../../helpers/errorMessages";
import { RequestAuth } from "../../types/utility";
import { generateToken } from "../../helpers/helpers";
import { authMiddleware } from "../../helpers/middlewares/authMiddleware";
import { authUserValidation } from "../../validators/auth";
import AuthService from "../../services/auth";
import { errorResponseMiddleware } from "../../helpers/middlewares/errorResponseMiddleware";

const authService = new AuthService();

const authRouter = Router();

// @route GET       api/auth/info
// @description     Get user info
// @access          Private
authRouter.get(
  "/info",
  authMiddleware,
  async ({ userId }: RequestAuth, res) => {
    try {
      const user = await authService.getUserInfo(userId);

      errorResponseMiddleware(user, res);

      res.json({ user });
    } catch (error) {
      res.status(500).json(Errors.serverError);
    }
  }
);

// @route POST      api/auth/
// @description     Auth user
// @access          Public
authRouter.post("/", ...authUserValidation, async (req, res) => {
  try {
    const { email, password }: { email: string; password: string } = req.body;

    const token = await authService.authUser(email, password);

    errorResponseMiddleware(token, res);

    res.json({ token });
  } catch (error) {
    res.status(500).json(Errors.serverError);
  }
});

export default authRouter;
