import { Router } from "express";
import UserModel from "../model/Users";
import Errors from "../services/errorMessages";
import { authMiddlewares } from "../services/middlewares";
import { RequestAuth } from "../types/Utility";

const authRouter = Router();

// @route GET       api/auth
// @description     Register user
// @access          Private
authRouter.get("/", authMiddlewares, async (req: RequestAuth, res) => {
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

export default authRouter;
