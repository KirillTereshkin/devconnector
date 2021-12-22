import { Router } from "express";
import ProfileModel from "../model/Profile";
import Errors from "../services/errorMessages";
import { authMiddleware } from "../services/middlewares";
import { RequestAuth } from "../types/Utility";

const profileRouter = Router();

profileRouter.get("/", authMiddleware, async (req: RequestAuth, res) => {
  try {
    const { userId } = req;

    if (!userId) {
      res.status(400).json(Errors.notAuthorized);
      return;
    }

    const foundProfile = await ProfileModel.findOne({ user: userId });

    if (!foundProfile) {
      res.status(401).json(Errors.profileNotExist);
      return;
    }

    res.json(foundProfile);
  } catch (error) {
    res.status(500).json(Errors.serverError);
  }
});

export default profileRouter;
