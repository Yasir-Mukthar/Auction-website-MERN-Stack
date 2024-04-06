import { Router } from "express";
import { verifyAdmin, verifyUser,verifySeller } from "../middlewares/auth.middleware.js";
import { sendNotification,
     getUserNotifications,
      markNotificationAsRead,
      markAllNotificationsAsRead
     } from "../controllers/notification.controller.js";



const router = Router();


router.route("/mark-all-as-read").put(verifyUser, markAllNotificationsAsRead);
router.route("/mark-as-read/:id").put(verifyUser, markNotificationAsRead);
router.route("/get-notifications").get(verifyUser, getUserNotifications);
router.route("/send-notification").post(verifyUser, sendNotification);







export default router;
