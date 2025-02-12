import {
  activatedUser,
  deleteUser,
  getAllUsers,
  getUserInfo,
  loginUser,
  logoutUser,
  registrationUser,
  updataAccessToken,
  updateProfilePic,
  updateUserInfo,
  updateUserPassword,
  updateUserRole,
  forgotPassword,
  verifyCode,
  updatePasswordWithNewCode,
  GithubAuth,
} from "./auth.controller";
import express from "express";
import { authorizedRoles, isAuthenticated } from "../../middleware/auth";
import passport from "passport";
const authRouter = express.Router();

authRouter.route("/register").post(registrationUser);
authRouter.route("/activate-user").post(activatedUser);
authRouter.route("/login-user").post(loginUser);
authRouter.route("/forget-password").post(forgotPassword);
authRouter.route("/verify-code").post(verifyCode);
authRouter.route("/change-password").post(updatePasswordWithNewCode);
authRouter.route("/logout-user").get(isAuthenticated, logoutUser);
authRouter.route("/refresh").get(updataAccessToken);
authRouter.route("/me").get(isAuthenticated, getUserInfo);

authRouter.route("/auth/github").get(
  passport.authenticate("github", {
    scope: ["user:email"],
  })
);

authRouter.route("/auth/github/callback").get(GithubAuth);

authRouter.route("/update-user-info").patch(isAuthenticated, updateUserInfo);
authRouter
  .route("/update-user-password")
  .patch(isAuthenticated, updateUserPassword);
authRouter
  .route("/update-user-avatar")
  .patch(isAuthenticated, updateProfilePic);

authRouter
  .route("/get-all-users")
  .get(isAuthenticated, authorizedRoles("admin"), getAllUsers);

authRouter
  .route("/update-user-role")
  .patch(isAuthenticated, authorizedRoles("admin"), updateUserRole);

authRouter
  .route("/delete-user/:id")
  .delete(isAuthenticated, authorizedRoles("admin"), deleteUser);
export default authRouter;
