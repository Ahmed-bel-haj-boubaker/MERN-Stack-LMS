import express from "express";

import { registrationUser } from "../controllers/user.controller";
const userRouter = express.Router();

userRouter.route("/register").post(registrationUser);

export default userRouter;
