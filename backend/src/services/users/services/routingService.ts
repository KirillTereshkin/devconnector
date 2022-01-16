import { Response, Request, NextFunction } from "express";
import User from "@helpers/types/model/users";
import UsersDBService from "./dbService";

class UsersRoutingService {
  constructor(private readonly dbService: UsersDBService) {}

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
}

export default UsersRoutingService;
