import { compare } from "bcrypt";
import { ObjectId } from "mongoose";
import { generateToken } from "@helpers/utils/helpers";
import UserModel from "@model/users";
import User from "@helpers/types/model/users";
import { ErrorsNames } from "@helpers/types/utility/errors";

class AuthDBService {
  getUserInfo = async (userId?: ObjectId): Promise<User | ErrorsNames> => {
    const user = await UserModel.findById(userId).select("-password");

    if (!user) {
      return "userNotExist";
    }

    return user;
  };

  authUser = async (
    email: string,
    password: string
  ): Promise<string | ErrorsNames> => {
    const foundUser = await UserModel.findOne({ email });
    if (!foundUser) {
      return "incorrectCredentials";
    }

    const isPasswordCorrect = await compare(password, foundUser.password);

    if (!isPasswordCorrect) {
      return "incorrectCredentials";
    }

    const token = generateToken(foundUser.id);

    return token;
  };
}

export default AuthDBService;
