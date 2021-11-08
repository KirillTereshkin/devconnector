/* eslint-disable no-param-reassign */
import { ErrorType } from "../types/Utility";
import { createError } from "./helpers";

const ErrorMessages = {
  userAlreadyExist: "User with such email already exist...",
  notAuthorized: "You are not authorized, please login",
  userNotExist: "User doesn't exist",
  incorrectToken: "The token is incorrect",
  serverError: "Ooops... Something went wrong",
};

const Errors: Record<keyof typeof ErrorMessages, ErrorType> = Object.entries(
  ErrorMessages
).reduce((prevVal, [key, val]) => {
  prevVal[key] = createError(val);
  return prevVal;
}, {} as any);

export default Errors;
