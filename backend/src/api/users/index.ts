import { hash } from "bcrypt";
import { Router } from "express";
import UserModel from "../../model/users";
import { saltRounds } from "../../helpers/constants";
import Errors from "../../helpers/errorMessages";
import { generateToken } from "../../helpers/helpers";
import User from "../../model/users/services/types";
import { registerUserValidator } from "../../validators/users";
import UsersService from "../../services/users";
import { errorResponseMiddleware } from "../../helpers/middlewares/errorResponseMiddleware";

const usersService = new UsersService();

const usersRouter = Router();

// @route POST       api/users
// @description     Register user
// @access          Public
usersRouter.post(
  "/",
  ...registerUserValidator,
  async (req, res): Promise<void> => {
    try {
      const user: User = req.body;

      const token = await usersService.registerUser(user);

      errorResponseMiddleware(token, res);

      res.json({ token });
    } catch (error) {
      res.status(500).json(Errors.serverError);
    }
  }
);

export default usersRouter;
