import express from "express";

import { authorizedRoles, isAuthenticated } from "../../middleware/auth";
import {
  createAdminCourse,
  deleteAdminCourse,
  enrollAdminCourse,
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
adminCourseRouter
  .route("/delete-admin-course/:courseId")
  .delete(
    isAuthenticated,
    authorizedRoles("admin", "instructor"),
    deleteAdminCourse
  );

adminCourseRouter
  .route("/enroll-admin-course/:courseId")
  .post(isAuthenticated, authorizedRoles("student"), enrollAdminCourse);
export default adminCourseRouter;
