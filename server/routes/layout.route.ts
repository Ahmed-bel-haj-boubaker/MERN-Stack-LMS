import express from "express";
import { authorizedRoles, isAuthenticated } from "../middleware/auth";
import {
  createLayout,
  editLayout,
  getLayoutByType,
} from "../controllers/layout.controller";

const layoutRouter = express.Router();

layoutRouter
  .route("/create-layout")
  .post(isAuthenticated, authorizedRoles("admin"), createLayout);
layoutRouter
  .route("/edit-layout")
  .put(isAuthenticated, authorizedRoles("admin"), editLayout);

layoutRouter.route("/get-layout-by-type").get(getLayoutByType);
export default layoutRouter;
