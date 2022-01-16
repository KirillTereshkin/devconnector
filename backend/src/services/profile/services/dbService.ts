import { ObjectId } from "mongoose";
import ProfileModel from "../../../model/profile";
import { Profile } from "../../../helpers/types/model/profile";

class ProfileDBService {
  getProfileInfo = async (user?: ObjectId): Promise<Profile> => {
    const foundProfile = await ProfileModel.findOne({ user });

    if (!foundProfile) {
      throw Error("profileNotExist");
    }

    return foundProfile;
  };

  createProfile = async (
    profile: Profile,
    user?: ObjectId
  ): Promise<Profile> => {
    const foundProfile = await ProfileModel.findOne({ user });

    if (foundProfile) {
      throw Error("profileAlreadyExist");
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
  ): Promise<Profile> => {
    const filter = { user };

    await ProfileModel.findOneAndUpdate(filter, profile);

    const updatedProfile = await ProfileModel.findOne(filter);

    if (!updatedProfile) {
      throw Error("profileNotExist");
    }

    return updatedProfile;
  };

  deleteProfile = async (user?: ObjectId): Promise<Profile> => {
    const deletedProfile = await ProfileModel.findOneAndDelete({ user });

    if (!deletedProfile) {
      throw Error("profileNotExist");
    }

    return deletedProfile;
  };

  getAllProfiles = async (): Promise<Profile[]> => {
    const allProfiles = await ProfileModel.find().populate("user", {
      name: true,
      email: true,
    });

    if (!allProfiles) {
      throw Error("profilesNotExist");
    }

    return allProfiles;
  };

  getProfileByUserId = async (user: ObjectId): Promise<Profile> => {
    try {
      const profileByUserId = await ProfileModel.findOne({ user }).populate(
        "user",
        { name: true, email: true }
      );

      if (!profileByUserId) {
        throw Error("profileNotExist");
      }

      return profileByUserId;
    } catch (error) {
      throw Error("profileNotExist");
    }
  };
}

export default ProfileDBService;
