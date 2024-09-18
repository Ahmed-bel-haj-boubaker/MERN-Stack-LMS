import { Request } from "express";
import { IUser } from "../modules/auth/user.model";

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}
