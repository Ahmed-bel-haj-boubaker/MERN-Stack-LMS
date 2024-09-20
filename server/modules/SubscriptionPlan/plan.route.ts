import express from "express";
import { authorizedRoles, isAuthenticated } from "../../middleware/auth";
import { createPlan, purchasePlan } from "./plan.controller";
const planRouter = express.Router();

planRouter
  .route("/create-plan")
  .post(isAuthenticated, authorizedRoles("admin"), createPlan);

planRouter
  .route("/purchase-plan")
  .put(isAuthenticated, authorizedRoles("student"), purchasePlan);

export default planRouter;
