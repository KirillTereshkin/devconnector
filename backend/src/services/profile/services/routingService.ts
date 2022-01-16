import { Response, Request } from "express";
import { ObjectId } from "mongoose";
import { errorResponseMiddleware } from "../../../helpers/middlewares/errorResponseMiddleware";
import { RequestAuth } from "../../../helpers/types/utility/utility";
import Errors from "../../../helpers/utils/errorMessages";
import { Profile } from "../../../helpers/types/model/profile";
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

  getAllProfiles = async (_: Request, res: Response) => {
    try {
      const allProfiles = await this.dbService.getAllProfiles();

      if (errorResponseMiddleware(allProfiles, res)) {
        return;
      }

      res.json(allProfiles);
    } catch (error) {
      res.status(500).json(Errors.serverError);
    }
  };

  getProfileByUserId = async (
    req: Request<{ user: ObjectId }>,
    res: Response
  ) => {
    try {
      const { user } = req.params;

      const profileByUserId = await this.dbService.getProfileByUserId(user);

      if (errorResponseMiddleware(profileByUserId, res)) {
        return;
      }

      res.json(profileByUserId);
    } catch (e) {
      res.status(500).json(Errors.serverError);
    }
  };
}

export default ProfileRoutingService;
