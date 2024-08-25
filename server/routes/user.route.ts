import express from "express";

import {
  activatedUser,
  registrationUser,
} from "../controllers/auth.controller";
const userRouter = express.Router();

userRouter.route("/register").post(registrationUser);
userRouter.route("/activate-user").post(activatedUser);

export default userRouter;
