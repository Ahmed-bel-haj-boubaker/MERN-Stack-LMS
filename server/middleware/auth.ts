import { NextFunction, Request, Response } from "express";
import { CatchAsyncError } from "./catchAsyncError";
import ErrorHandler from "../utils/ErrorHandler";
import jwt, { JwtPayload } from "jsonwebtoken";
import { redis } from "../utils/redis";
require("dotenv").config();

export const isAuthenticated = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const access_token = req.cookies.access_token;
    console.log(access_token);
    if (!access_token) {
      return next(
        new ErrorHandler("Please login to access this ressource", 400)
      );
    }

    const decoded = jwt.verify(
      access_token,
      process.env.ACCESS_TOKEN as string
    ) as JwtPayload;
    if (!decoded) {
      return next(new ErrorHandler("access token is not valid", 400));
    }

    const user = await redis.get(decoded.id);
    if (!user) {
      return next(
        new ErrorHandler("Please login to access this resource", 404)
      );
    }

    req.user = JSON.parse(user);

    next();
  }
);

//validate user role

export const authorizedRoles = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user?.role || "")) {
      return next(
        new ErrorHandler(
          "You don't have permission to perform this action",
          403
        )
      );
    }
    next();
  };
};
