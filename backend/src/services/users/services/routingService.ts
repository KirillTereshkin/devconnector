import { Response, Request } from "express";
import { errorResponseMiddleware } from "../../../helpers/middlewares/errorResponseMiddleware";
import Errors from "../../../helpers/utils/errorMessages";
import User from "../../../helpers/types/model/users";
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
