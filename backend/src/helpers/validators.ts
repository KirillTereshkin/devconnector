import { body } from "express-validator";

export const nameValidator = (msg: string = "Name is required") =>
  body("name").notEmpty().withMessage(msg);

export const emailValidator = (msg: string = "Please enter a vaild email") =>
  body("email").isEmail().withMessage(msg);

export const passwordValidator = (
  char: number = 6,
  msg: string = `Please enter a password with ${char} or more characters`
) => body("password").isLength({ min: 6 }).withMessage(msg);

export const statusValidator = (msg: string = "Status is required") =>
  body("status").notEmpty().withMessage(msg);

export const skillsValidator = (msg: string = "Skills are required") =>
  body("skills").isArray().notEmpty().withMessage(msg);
