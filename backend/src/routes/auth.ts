import { Router } from "express";
import { compare } from "bcrypt";
import {} from "jsonwebtoken";
import UserModel from "../model/Users";
import Errors from "../services/errorMessages";
import { authMiddleware, validationMiddleware } from "../services/middlewares";
import { emailValidator, passwordValidator } from "../services/validators";
import { RequestAuth } from "../types/Utility";
import { generateToken } from "../services/helpers";

const authRouter = Router();

// @route GET       api/auth/info
// @description     Get user info
// @access          Private
authRouter.get("/info", authMiddleware, async (req: RequestAuth, res) => {
  try {
    const user = await UserModel.findById(req.userId).select("-password");
    if (!user) {
      res.status(400).json(Errors.userNotExist);
      return;
    }

    res.json({ user });
  } catch (error) {
    res.status(500).json(Errors.serverError);
  }
});

// @route POST      api/auth/
// @description     Auth user
// @access          Public
authRouter.post(
  "/",
  emailValidator(),
  passwordValidator(),
  validationMiddleware,
  async (req, res) => {
    try {
      const { email, password } = req.body;
      const foundUser = await UserModel.findOne({ email });
      if (!foundUser) {
        res.status(400).json(Errors.incorrectCredentials);
        return;
      }

      const isPasswordCorrect = await compare(password, foundUser.password);

      if (!isPasswordCorrect) {
        res.status(400).json(Errors.incorrectCredentials);
        return;
      }

      const token = generateToken(foundUser.id);

      res.json({ token });
    } catch (error) {
      res.status(500).json(Errors.serverError);
    }
  }
);

export default authRouter;
