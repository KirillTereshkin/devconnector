import { Request, Response } from "express";
import Errors from "../../../helpers/errorMessages";
import { errorResponseMiddleware } from "../../../helpers/middlewares/errorResponseMiddleware";
import { RequestAuth } from "../../../types/utility";
import AuthDBService from "./dbService";

class AuthRoutingService {
  constructor(private readonly dbService: AuthDBService) {}

  getUserInfo = async ({ userId }: RequestAuth, res: Response) => {
    try {
      const user = await this.dbService.getUserInfo(userId);

      if (errorResponseMiddleware(user, res)) {
        return;
      }

      res.json({ user });
    } catch (error) {
      res.status(500).json(Errors.serverError);
    }
  };

  authUser = async (req: Request, res: Response) => {
    try {
      const { email, password }: { email: string; password: string } = req.body;

      const token = await this.dbService.authUser(email, password);

      if (errorResponseMiddleware(token, res)) {
        return;
      }

      res.json({ token });
    } catch (error) {
      res.status(500).json(Errors.serverError);
    }
  };
}

export default AuthRoutingService;
