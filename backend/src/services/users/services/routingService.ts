import { Response, Request, NextFunction } from "express";
import { RequestAuth } from "@helpers/types/utility/utility";
import UsersDBService from "./dbService";

class UsersRoutingService {
  constructor(private readonly dbService: UsersDBService) {}

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

  deleteUser = async (
    { userId }: RequestAuth,
    res: Response,
    next: NextFunction
  ) => {
    try {
      if (!userId) {
        throw Error();
      }

      const deletedUser = await this.dbService.deleteUser(userId);

      res.json(deletedUser);
    } catch (error) {
      next(error);
    }
  };
}

export default UsersRoutingService;
