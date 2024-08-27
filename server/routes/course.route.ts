import express from "express";
import { EditCourse, uploadCourse } from "../controllers/course.controller";
import { authorizedRoles, isAuthenticated } from "../middleware/auth";

const courseRouter = express.Router();

courseRouter
  .route("/create-course")
  .post(isAuthenticated, authorizedRoles("admin"), uploadCourse);
courseRouter
  .route("/update-course/:id")
  .patch(isAuthenticated, authorizedRoles("admin"), EditCourse);
export default courseRouter;
