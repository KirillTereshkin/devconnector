import { ObjectId } from "mongoose";
import ProfileModel from "../../../model/profile";
import { Profile } from "../../../helpers/types/model/profile";
import { ErrorsNames } from "../../../helpers/types/utility/errors";

class ProfileDBService {
  getProfileInfo = async (user?: ObjectId): Promise<Profile | ErrorsNames> => {
    const foundProfile = await ProfileModel.findOne({ user });

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
  ): Promise<Profile | ErrorsNames> => {
    const filter = { user };

    await ProfileModel.findOneAndUpdate(filter, profile);

    const updatedProfile = await ProfileModel.findOne(filter);

    if (!updatedProfile) {
      return "profileNotExist";
    }

    return updatedProfile;
  };

  deleteProfile = async (user?: ObjectId): Promise<Profile | ErrorsNames> => {
    const deletedProfile = await ProfileModel.findOneAndDelete({ user });

    if (!deletedProfile) {
      return "profileNotExist";
    }

    return deletedProfile;
  };
}

export default ProfileDBService;
