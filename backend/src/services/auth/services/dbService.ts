import { compare, hash } from "bcryptjs";
import User from "../../../helpers/types/model/users";
import { ErrorsNames } from "../../../helpers/types/utility/errors";
import { saltRounds } from "../../../helpers/utils/constants";
import { generateToken } from "../../../helpers/utils/helpers";
import UserModel from "../../../model/users";

class AuthDBService {
  registerUser = async (user: User): Promise<ErrorsNames | string> => {
    const userFromDb = await UserModel.findOne({ email: user.email });

    if (userFromDb) {
      throw Error("userAlreadyExist");
    }

    const password = await hash(user.password, saltRounds);

    const newUser = new UserModel({ ...user, password });

    const { id } = await newUser.save();

    return generateToken(id);
  };

  authUser = async (
    email: string,
    password: string
  ): Promise<string | ErrorsNames> => {
    const foundUser = await UserModel.findOne({ email });
    if (!foundUser) {
      throw Error("incorrectCredentials");
    }

    const isPasswordCorrect = await compare(password, foundUser.password);

    if (!isPasswordCorrect) {
      throw Error("incorrectCredentials");
    }

    const token = generateToken(foundUser.id);

    return token;
  };
}

export default AuthDBService;
