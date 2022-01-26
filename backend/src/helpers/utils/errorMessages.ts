import { ErrorsNames } from "@helpers/types/utility/errors";
import { ErrorType } from "@helpers/types/utility/utility";
import { createError } from "./helpers";

const ErrorMessages: Record<ErrorsNames, string> = {
  userAlreadyExist: "User with such email already exist...",
  notAuthorized: "You are not authorized, please login",
  userNotExist: "User doesn't exist",
  profileNotExist: "Profile doesn't exist",
  profileAlreadyExist: "Profile already exist",
  profilesNotExist: "Profiles not exist",
  incorrectToken: "The token is incorrect",
  incorrectCredentials: "Email or password are incorrect",
  serverError: "Ooops... Something went wrong",
};

const Errors: Record<ErrorsNames, ErrorType> = Object.entries(
  ErrorMessages
).reduce(
  (prevVal, [key, val]) => ({ ...prevVal, [key]: createError(val) }),
  {} as Record<keyof typeof ErrorMessages, ErrorType>
);

export default Errors;
