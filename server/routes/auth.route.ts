import express from "express";

import {
  activatedUser,
  loginUser,
  logoutUser,
  registrationUser,
  updataAccessToken,
} from "../controllers/auth.controller";
import { authorizedRoles, isAuthenticated } from "../middleware/auth";
const authRouter = express.Router();

authRouter.route("/register").post(registrationUser);
authRouter.route("/activate-user").post(activatedUser);
authRouter.route("/login-user").post(loginUser);
authRouter.route("/logout-user").get(isAuthenticated, logoutUser);
authRouter.route("/refresh").get(updataAccessToken);
export default authRouter;
