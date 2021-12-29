import { Router } from "express";
import { ObjectId } from "mongoose";
import ProfileModel from "../../model/profile";
import Errors from "../../helpers/errorMessages";
import { Profile } from "../../model/profile/services/types";
import { RequestAuth } from "../../types/utility";
import { authMiddleware } from "../../helpers/middlewares/authMiddleware";
import { createProfileValidator } from "../../validators/profile";
import ProfileService from "../../services/profile";
import { errorResponseMiddleware } from "../../helpers/middlewares/errorResponseMiddleware";

const profileService = new ProfileService();

const profileRouter = Router();

// @route POST      api/profile/me
// @description     Get profile info
// @access          Private
profileRouter.get("/me", authMiddleware, async (req: RequestAuth, res) => {
  try {
    const { userId } = req;

    const foundProfile = await   profileService.getProfileInfo(userId);

    errorResponseMiddleware(foundProfile, res);

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
      const { userId, body }: { userId?: ObjectId; body: Profile } = req;

      const savedProfile = await profileService.createProfile(body, userId);

      errorResponseMiddleware(savedProfile, res);

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
    const { userId, body }: { userId?: ObjectId; body: Profile } = req;

    const updatedProfile = await profileService.updateProfile(body, userId);

    res.json(updatedProfile);
  } catch (error) {
    res.status(500).json(Errors.serverError);
  }
});

export default profileRouter;
