require("dotenv").config();
import { Response } from "express";
import { IUser } from "../modules/auth/user.model";
import { redis } from "./redis";
import { ITokenOptions } from "../interfaces/authInterface";

// Set access token to expire in 1 hour (60 minutes)
const accessTokenExpire = 60; // 60 minutes = 1 hour

// Set refresh token expiration (can keep this longer if needed)
const refreshTokenExpire = parseInt(
  process.env.REFRESH_TOKEN_EXPIRE || "1200",
  10
);

export const accessTokenOptions: ITokenOptions = {
  expires: new Date(Date.now() + accessTokenExpire * 60 * 1000), // 60 minutes * 60,000ms = 1 hour
  maxAge: accessTokenExpire * 60 * 1000, // 60 minutes * 60,000ms = 1 hour
  httpOnly: true,
  sameSite: "lax",
};

export const refreshTokenOptions: ITokenOptions = {
  expires: new Date(Date.now() + refreshTokenExpire * 24 * 60 * 60 * 1000), // Days calculation
  maxAge: refreshTokenExpire * 24 * 60 * 60 * 1000, // Days calculation
  httpOnly: true,
  sameSite: "lax",
};

export const sendToken = (user: IUser, statusCode: number, res: Response) => {
  const accessToken = user.SignAccessToken();
  const refreshToken = user.SignRefreshToken();

  redis.set(user._id as string, JSON.stringify(user) as any);

  if (process.env.NODE_ENV === "production") {
    accessTokenOptions.secure = true;
  }

  res.cookie("access_token", accessToken, accessTokenOptions);
  res.cookie("refresh_token", refreshToken, refreshTokenOptions);

  res.status(statusCode).json({ success: true, user, accessToken });
};
