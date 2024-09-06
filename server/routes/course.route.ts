import express from "express";
import {
  addAnswerInCourse,
  addQuestionInCourse,
  addReplyToReview,
  addReviewInCourse,
  deleteCourse,
  EditCourse,
  getAllCourses,
  getAllCoursesAdmin,
  getCourseByUser,
  getSingleCourse,
  uploadCourse,
} from "../controllers/course.controller";
import { authorizedRoles, isAuthenticated } from "../middleware/auth";

const courseRouter = express.Router();

courseRouter
  .route("/create-course")
  .post(isAuthenticated, authorizedRoles("admin"), uploadCourse);
courseRouter
  .route("/update-course/:id")
  .patch(isAuthenticated, authorizedRoles("admin"), EditCourse);
courseRouter.route("/get-course/:id").get(getSingleCourse);
courseRouter.route("/get-all-courses").get(getAllCourses);
courseRouter
  .route("/get-course-content/:id")
  .get(isAuthenticated, getCourseByUser);
courseRouter.route("/add-question").patch(isAuthenticated, addQuestionInCourse);
courseRouter.route("/add-answer").patch(isAuthenticated, addAnswerInCourse);
courseRouter.route("/add-review/:id").patch(isAuthenticated, addReviewInCourse);
courseRouter
  .route("/add-reply-review")
  .patch(isAuthenticated, authorizedRoles("admin"), addReplyToReview);

  courseRouter
  .route("/get-all-courses-admin")
  .get(isAuthenticated, authorizedRoles("admin"), getAllCoursesAdmin);

  
  courseRouter
  .route("/delete-course-admin/:id")
  .delete(isAuthenticated, authorizedRoles("admin"), deleteCourse);
export default courseRouter;
