import { Router } from "express";
import { ObjectId } from "mongoose";
import ProfileModel from "../../model/profile";
import Errors from "../../services/errorMessages";
import { authMiddleware } from "../../services/middlewares";
import { Profile } from "../../types/Model/Profile";
import { RequestAuth } from "../../types/Utility";
import { createProfileValidator } from "./services/validators";

const profileRouter = Router();

// @route POST      api/profile/me
// @description     Get profile info
// @access          Private
profileRouter.get("/me", authMiddleware, async (req: RequestAuth, res) => {
  try {
    const { userId } = req;

    const foundProfile = await ProfileModel.findOne({ user: userId }, "-_id");

    if (!foundProfile) {
      res.status(400).json(Errors.profileNotExist);
      return;
    }

    res.json(foundProfile);
  } catch (error) {
    res.status(500).json(Errors.serverError);
  }
});

// @route POST      api/profile/
// @description     Create profile
// @access          Private
profileRouter.post(
  "/",
  ...createProfileValidator,
  authMiddleware,
  async (req: RequestAuth, res) => {
    try {
      const { body, userId }: { body: Profile; userId?: ObjectId } = req;

      const foundProfile = await ProfileModel.findOne({ user: userId });

      if (foundProfile) {
        res.status(400).json(Errors.profileAlreadyExist);
        return;
      }

      const newProfile = new ProfileModel({
        ...body,
        user: userId,
      });

      const savedProfile = await newProfile.save();

      res.json(savedProfile);
    } catch (error) {
      res.status(500).json(Errors.serverError);
    }
  }
);

// @route PUT       api/profile/
// @description     Update profile
// @access          Private
profileRouter.put("/", authMiddleware, async (req: RequestAuth, res) => {
  try {
    const { body, userId }: { body: Profile; userId?: ObjectId } = req;

    const filter = { user: userId };

    await ProfileModel.findOneAndUpdate(filter, body);

    const updatedProfile = await ProfileModel.findOne(filter);

    res.json(updatedProfile);
  } catch (error) {
    res.status(500).json(Errors.serverError);
  }
});

export default profileRouter;
