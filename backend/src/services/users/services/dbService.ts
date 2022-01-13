import { hash } from "bcrypt";
import { saltRounds } from "../../../helpers/utils/constants";
import { generateToken } from "../../../helpers/utils/helpers";
import UserModel from "../../../model/users";
import User from "../../../helpers/types/model/users";
import { ErrorsNames } from "../../../helpers/types/utility/errors";

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
