import express from "express";
import { createOrder, getAllOrdersAdmin } from "./order.controller";
import { authorizedRoles, isAuthenticated } from "../../middleware/auth";
 
 

const orderRouter = express.Router();
orderRouter.route("/create-order").post(isAuthenticated, createOrder);
orderRouter
  .route("/get-all-orders-admin")
  .get(isAuthenticated, authorizedRoles("admin"), getAllOrdersAdmin);

export default orderRouter;
