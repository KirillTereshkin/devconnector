import { Router } from "express";
import { authMiddleware } from "../../helpers/middlewares/authMiddleware";
import { createProfileValidator } from "../../helpers/validators/profile";
import profileRoutingService from "../../services/profile";

const profileRouter = Router();

// @route POST      api/profile/me
// @description     Get profile info
// @access          Private
profileRouter.get("/me", authMiddleware, profileRoutingService.getProfileInfo);

// @route GET       api/profile/all
// @description     Get all profiles
// @access          Public
profileRouter.get("/all", profileRoutingService.getAllProfiles);

// @route GET       api/profile/:user
// @description     Get profile by userId
// @access          Public
profileRouter.get("/:user", profileRoutingService.getProfileByUserId);

// @route POST      api/profile/
// @description     Create profile
// @access          Private
profileRouter.post(
  "/",
  ...createProfileValidator,
  authMiddleware,
  profileRoutingService.createProfile
);

// @route PUT       api/profile/
// @description     Update profile
// @access          Private
profileRouter.put("/", authMiddleware, profileRoutingService.updateProfile);

// @route DELETE    api/profile/
// @description     Delete profile
// @access          Private
profileRouter.delete("/", authMiddleware, profileRoutingService.deleteProfile);

export default profileRouter;
