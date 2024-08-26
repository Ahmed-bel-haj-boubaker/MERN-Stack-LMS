import express from "express";

import {
  activatedUser,
  getUserInfo,
  loginUser,
  logoutUser,
  registrationUser,
  socialAuth,
  updataAccessToken,
  updateUserInfo,
  updateUserPassword,
} from "../controllers/auth.controller";
import { authorizedRoles, isAuthenticated } from "../middleware/auth";
const authRouter = express.Router();

authRouter.route("/register").post(registrationUser);
authRouter.route("/activate-user").post(activatedUser);
authRouter.route("/login-user").post(loginUser);
authRouter.route("/logout-user").get(isAuthenticated, logoutUser);
authRouter.route("/refresh").get(updataAccessToken);
authRouter.route("/me").get(isAuthenticated, getUserInfo);
authRouter.route("/social-auth").post(socialAuth);
authRouter.route("/update-user-info").patch(isAuthenticated, updateUserInfo);
authRouter
  .route("/update-user-password")
  .patch(isAuthenticated, updateUserPassword);
export default authRouter;
