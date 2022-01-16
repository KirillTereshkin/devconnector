import { NextFunction, Request, Response } from "express";
import { RequestAuth } from "../../../helpers/types/utility/utility";
import AuthDBService from "./dbService";

class AuthRoutingService {
  constructor(private readonly dbService: AuthDBService) {}

  getUserInfo = async (
    { userId }: RequestAuth,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const user = await this.dbService.getUserInfo(userId);

      res.json({ user });
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
