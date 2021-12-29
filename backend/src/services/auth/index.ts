import { compare } from "bcrypt";
import { ObjectId } from "mongoose";
import { generateToken } from "../../helpers/helpers";
import UserModel from "../../model/users";
import User from "../../model/users/services/types";
import { ErrorsNames } from "../../types/errors";

class AuthService {
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

export default AuthService;
