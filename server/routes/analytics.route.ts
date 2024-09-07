import express from "express";
import { authorizedRoles, isAuthenticated } from "../middleware/auth";
import {
  getCoursesAnalytics,
  getOrderAnalytics,
  getUserAnalytics,
} from "../controllers/analytics.controller";

const analyticsRouter = express.Router();

analyticsRouter
  .route("/get-user-analytics")
  .get(isAuthenticated, authorizedRoles("admin"), getUserAnalytics);
analyticsRouter
  .route("/get-courses-analytics")
  .get(isAuthenticated, authorizedRoles("admin"), getCoursesAnalytics);
analyticsRouter
  .route("/get-order-analytics")
  .get(isAuthenticated, authorizedRoles("admin"), getOrderAnalytics);
export default analyticsRouter;
