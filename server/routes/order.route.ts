import express from "express";
import { authorizedRoles, isAuthenticated } from "../middleware/auth";
import {
  createOrder,
  getAllOrdersAdmin,
} from "../controllers/order.controller";

const orderRouter = express.Router();
orderRouter.route("/create-order").post(isAuthenticated, createOrder);
orderRouter
  .route("/get-all-orders-admin")
  .get(isAuthenticated, authorizedRoles("admin"), getAllOrdersAdmin);

export default orderRouter;
