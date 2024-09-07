import express from "express";
import {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "../controllers/categories.controller";
import { authorizedRoles, isAuthenticated } from "../middleware/auth";

const categoriesRouter = express.Router();

categoriesRouter.route("/get-categories").get(getCategories);

categoriesRouter
  .route("/add-categories")
  .post(isAuthenticated, authorizedRoles("admin"), createCategory);

categoriesRouter.route("/get-category/:id").get(getCategoryById);

categoriesRouter
  .route("/update-category/:id")
  .put(isAuthenticated, authorizedRoles("admin"), updateCategory);
categoriesRouter
  .route("/delete-category/:id")
  .delete(isAuthenticated, authorizedRoles("admin"), deleteCategory);

export default categoriesRouter;
