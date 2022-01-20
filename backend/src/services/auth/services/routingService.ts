import { NextFunction, Request, Response } from "express";
import User from "../../../helpers/types/model/users";
import { RequestAuth } from "../../../helpers/types/utility/utility";
import AuthDBService from "./dbService";

class AuthRoutingService {
  constructor(private readonly dbService: AuthDBService) {}

  registerUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const user: User = req.body;

      const token = await this.dbService.registerUser(user);

      res.json({ token });
    } catch (error) {
      next(error);
    }
  };

  authUser = async (
    req: Request<{ email: string; password: string }>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { email, password } = req.body;

      const token = await this.dbService.authUser(email, password);

      res.json({ token });
    } catch (error) {
      next(error);
    }
  };
}

export default AuthRoutingService;
