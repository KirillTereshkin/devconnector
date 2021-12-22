/* eslint-disable no-param-reassign */
import { ErrorType } from "../types/Utility";
import { createError } from "./helpers";

const ErrorMessages = {
  userAlreadyExist: "User with such email already exist...",
  notAuthorized: "You are not authorized, please login",
  userNotExist: "User doesn't exist",
  profileNotExist: "Profile doesn't exist",
  incorrectToken: "The token is incorrect",
  incorrectCredentials: "Email or password are incorrect",
  serverError: "Ooops... Something went wrong",
};

const Errors: Record<keyof typeof ErrorMessages, ErrorType> = Object.entries(
  ErrorMessages
).reduce(
  (prevVal, [key, val]) => ({ ...prevVal, [key]: createError(val) }),
  {} as Record<keyof typeof ErrorMessages, ErrorType>
);

export default Errors;
