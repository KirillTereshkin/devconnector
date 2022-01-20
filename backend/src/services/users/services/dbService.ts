import { ObjectId } from "mongoose";
import User from "../../../helpers/types/model/users";
import { ErrorsNames } from "../../../helpers/types/utility/errors";
import ProfileModel from "../../../model/profile";
import UserModel from "../../../model/users";

class UsersDBService {
  getUserInfo = async (userId?: ObjectId): Promise<User | ErrorsNames> => {
    const user = await UserModel.findById(userId).select("-password");

    if (!user) {
      throw Error("userNotExist");
    }

    return user;
  };

  deleteUser = async (user: ObjectId) => {
    const deletedUser = await UserModel.findByIdAndDelete(user);
    await ProfileModel.find({ user }).deleteMany();

    return deletedUser;
  };
}

export default UsersDBService;
