import { ObjectId } from "mongoose";
import ProfileModel from "../../model/profile";
import { Profile } from "../../model/profile/services/types";
import { ErrorsNames } from "../../types/errors";

class ProfileService {
  getProfileInfo = async (user?: ObjectId): Promise<Profile | ErrorsNames> => {
    const foundProfile = await ProfileModel.findOne({ user }, "-_id");

    if (!foundProfile) {
      return "profileNotExist";
    }

    return foundProfile;
  };

  createProfile = async (
    profile: Profile,
    user?: ObjectId
  ): Promise<Profile | ErrorsNames> => {
    const foundProfile = await ProfileModel.findOne({ user });

    if (foundProfile) {
      return "profileAlreadyExist";
    }

    const newProfile = new ProfileModel({
      ...profile,
      user,
    });

    return newProfile.save();
  };

  updateProfile = async (
    profile: Profile,
    user?: ObjectId
  ): Promise<Profile | null> => {
    const filter = { user };

    await ProfileModel.findOneAndUpdate(filter, profile);

    return ProfileModel.findOne(filter);
  };
}

export default ProfileService;
