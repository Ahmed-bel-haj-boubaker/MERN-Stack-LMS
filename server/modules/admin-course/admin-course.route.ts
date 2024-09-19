import express from "express";

import { authorizedRoles, isAuthenticated } from "../../middleware/auth";
import {
  createAdminCourse,
  updateAdminCourse,
} from "./admin-course.controller";

const adminCourseRouter = express.Router();
adminCourseRouter
  .route("/create-admin-course")
  .post(
    isAuthenticated,
    authorizedRoles("admin", "instructor"),
    createAdminCourse
  );

adminCourseRouter
  .route("/update-admin-course")
  .put(
    isAuthenticated,
    authorizedRoles("admin", "instructor"),
    updateAdminCourse
  );

export default adminCourseRouter;
