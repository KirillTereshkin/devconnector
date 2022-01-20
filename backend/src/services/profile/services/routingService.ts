import { Response, Request, NextFunction } from "express";
import { ObjectId } from "mongoose";
import { Profile } from "../../../helpers/types/model/profile";
import { RequestAuth } from "../../../helpers/types/utility/utility";
import ProfileDBService from "./dbService";

class ProfileRoutingService {
  constructor(private readonly dbService: ProfileDBService) {}

  getProfileInfo = async (
    req: RequestAuth,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { userId } = req;

      const foundProfile = await this.dbService.getProfileInfo(userId);

      res.json(foundProfile);
    } catch (error) {
      next(error);
    }
  };

  createProfile = async (
    req: RequestAuth,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { userId, body }: { userId?: ObjectId; body: Profile } = req;

      const savedProfile = await this.dbService.createProfile(body, userId);

      res.json(savedProfile);
    } catch (error) {
      next(error);
    }
  };

  updateProfile = async (
    req: RequestAuth,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { userId, body }: { userId?: ObjectId; body: Profile } = req;

      const updatedProfile = await this.dbService.updateProfile(body, userId);

      res.json(updatedProfile);
    } catch (error) {
      next(error);
    }
  };

  deleteProfile = async (
    req: RequestAuth,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { userId }: { userId?: ObjectId } = req;

      const deletedProfile = await this.dbService.deleteProfile(userId);

      res.json(deletedProfile);
    } catch (error) {
      next(error);
    }
  };

  getAllProfiles = async (_: Request, res: Response, next: NextFunction) => {
    try {
      const allProfiles = await this.dbService.getAllProfiles();

      res.json(allProfiles);
    } catch (error) {
      next(error);
    }
  };

  getProfileByUserId = async (
    req: Request<{ user: ObjectId }>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { user } = req.params;

      const profileByUserId = await this.dbService.getProfileByUserId(user);

      res.json(profileByUserId);
    } catch (error) {
      next(error);
    }
  };
}

export default ProfileRoutingService;
