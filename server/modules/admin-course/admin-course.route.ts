import express from "express";

import { authorizedRoles, isAuthenticated } from "../../middleware/auth";
import { createAdminCourse } from "./admin-course.controller";

const adminCourseRouter = express.Router();
adminCourseRouter
  .route("/create-admin-course")
  .post(
    isAuthenticated,
    authorizedRoles("admin", "instructor"),
    createAdminCourse
  );

export default adminCourseRouter;
