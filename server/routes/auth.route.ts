import express from "express";

import {
  activatedUser,
  loginUser,
  registrationUser,
} from "../controllers/auth.controller";
const authRouter = express.Router();

authRouter.route("/register").post(registrationUser);
authRouter.route("/activate-user").post(activatedUser);
authRouter.route("/login").post(loginUser);
export default authRouter;
