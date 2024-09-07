import express from "express";
import { authorizedRoles, isAuthenticated } from "../middleware/auth";
import { createLayout } from "../controllers/layout.controller";

const layoutRouter = express.Router();

layoutRouter
  .route("/create-layout")
  .post(isAuthenticated, authorizedRoles("admin"), createLayout);

export default layoutRouter;
