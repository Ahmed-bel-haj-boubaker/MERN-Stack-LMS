import express from "express";

import { authorizedRoles, isAuthenticated } from "../middleware/auth";
import { getNotifications, updateNotificationsStatus } from "../controllers/notifcation.controller";

const notificationRouter = express.Router();

notificationRouter
  .route("/get-all-notifications")
  .get(isAuthenticated, authorizedRoles("admin"), getNotifications);

notificationRouter
  .route("/update-notification/:id")
  .patch(isAuthenticated, authorizedRoles("admin"), updateNotificationsStatus);
export default notificationRouter;
