import { hash } from "bcrypt";
import { saltRounds } from "../../../helpers/constants";
import { generateToken } from "../../../helpers/helpers";
import UserModel from "../../../model/users";
import User from "../../../model/users/services/types";
import { ErrorsNames } from "../../../types/errors";

class UsersDBService {
  registerUser = async (user: User): Promise<ErrorsNames | string> => {
    const userFromDb = await UserModel.findOne({ email: user.email });

    if (userFromDb) {
      return "userAlreadyExist";
    }

    const password = await hash(user.password, saltRounds);

    const newUser = new UserModel({ ...user, password });

    const { id } = await newUser.save();

    return generateToken(id);
  };
}

export default UsersDBService;
