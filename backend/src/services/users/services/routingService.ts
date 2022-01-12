import { Response, Request } from "express";
import Errors from "../../../helpers/errorMessages";
import { errorResponseMiddleware } from "../../../helpers/middlewares/errorResponseMiddleware";
import User from "../../../model/users/services/types";
import UsersDBService from "./dbService";

class UsersRoutingService {
  constructor(private readonly dbService: UsersDBService) {}

  registerUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const user: User = req.body;

      const token = await this.dbService.registerUser(user);

      if (errorResponseMiddleware(token, res)) {
        return;
      }

      res.json({ token });
    } catch (error) {
      res.status(500).json(Errors.serverError);
    }
  };
}

export default UsersRoutingService;
