import { body } from "express-validator";

export const nameValidator = (msg: string = "Name is required") =>
  body("name").not().isEmpty().withMessage(msg);

export const emailValidator = (msg: string = "Please enter a vaild email") =>
  body("email").isEmail().withMessage(msg);

export const passwordValidator = (
  char: number = 6,
  msg: string = `Please enter a password with ${char} or more characters`
) => body("password").isLength({ min: 6 }).withMessage(msg);
