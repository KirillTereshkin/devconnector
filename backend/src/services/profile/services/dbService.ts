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

  getAllProfiles = async (): Promise<Profile[] | ErrorsNames> => {
    const allProfiles = await ProfileModel.find().populate("user", {
      name: true,
      email: true,
    });

    if (!allProfiles) {
      return "profilesNotExist";
    }

    return allProfiles;
  };

  getProfileByUserId = async (
    user: ObjectId
  ): Promise<Profile | ErrorsNames> => {
    try {
      const profileByUserId = await ProfileModel.findOne({ user }).populate(
        "user",
        { name: true, email: true }
      );

      if (!profileByUserId) {
        return "profileNotExist";
      }

      return profileByUserId;
    } catch (e) {
      return "profileNotExist";
    }
  };
}

export default ProfileDBService;
