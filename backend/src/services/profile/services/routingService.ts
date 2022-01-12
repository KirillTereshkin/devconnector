import { Response } from "express";
import { ObjectId } from "mongoose";
import Errors from "../../../helpers/errorMessages";
import { errorResponseMiddleware } from "../../../helpers/middlewares/errorResponseMiddleware";
import { Profile } from "../../../model/profile/services/types";
import { RequestAuth } from "../../../types/utility";
import ProfileDBService from "./dbService";

class ProfileRoutingService {
  constructor(private readonly dbService: ProfileDBService) {}

  getProfileInfo = async (req: RequestAuth, res: Response) => {
    try {
      const { userId } = req;

      const foundProfile = await this.dbService.getProfileInfo(userId);

      if (errorResponseMiddleware(foundProfile, res)) {
        return;
      }

      res.json(foundProfile);
    } catch (error) {
      res.status(500).json(Errors.serverError);
    }
  };

  createProfile = async (req: RequestAuth, res: Response) => {
    try {
      const { userId, body }: { userId?: ObjectId; body: Profile } = req;

      const savedProfile = await this.dbService.createProfile(body, userId);

      if (errorResponseMiddleware(savedProfile, res)) {
        return;
      }

      res.json(savedProfile);
    } catch (error) {
      res.status(500).json(Errors.serverError);
    }
  };

  updateProfile = async (req: RequestAuth, res: Response) => {
    try {
      const { userId, body }: { userId?: ObjectId; body: Profile } = req;

      const updatedProfile = await this.dbService.updateProfile(body, userId);

      if (errorResponseMiddleware(updatedProfile, res)) {
        return;
      }

      res.json(updatedProfile);
    } catch (error) {
      res.status(500).json(Errors.serverError);
    }
  };

  deleteProfile = async (req: RequestAuth, res: Response) => {
    try {
      const { userId }: { userId?: ObjectId } = req;

      const deletedProfile = await this.dbService.deleteProfile(userId);

      if (errorResponseMiddleware(deletedProfile, res)) {
        return;
      }

      res.json(deletedProfile);
    } catch (error) {
      res.status(500).json(Errors.serverError);
    }
  };
}

export default ProfileRoutingService;
