import { hash } from "bcrypt";
import { Router } from "express";
import UserModel from "../../model/users";
import { saltRounds } from "../../services/constants";
import Errors from "../../services/errorMessages";
import { generateToken } from "../../services/helpers";
import User from "../../types/Model/Users";
import { registerUserValidator } from "./services/validators";

const usersRouter = Router();

// @route POST       api/users
// @description     Register user
// @access          Public
usersRouter.post(
  "/",
  ...registerUserValidator,
  async (req, res): Promise<void> => {
    try {
      const userFromBody: User = req.body;

      const userFromDb = await UserModel.findOne({ email: userFromBody.email });

      if (userFromDb) {
        res.status(400).json(Errors.userAlreadyExist);
        return;
      }

      userFromBody.password = await hash(userFromBody.password, saltRounds);

      const user = new UserModel(userFromBody);

      const savedUser = await user.save();

      const token = generateToken(savedUser.id);

      res.json({ token });
    } catch (error) {
      res.status(500).json(Errors.serverError);
    }
  }
);

export default usersRouter;
