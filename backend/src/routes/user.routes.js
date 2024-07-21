import { Router } from "express";
import {
  changeCurrentPassword,
  resetPassword,
  forgetPasswordSendEmail,
  loginUser,
  logoutUser,
  registerUser,
  updateUserProfile,
  getCurrentUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  getTopSellers,
  getTopCities,
} from "../controllers/user.controller.js";
import { verifyAdmin, verifyUser } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";




const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/forgot-password").post(forgetPasswordSendEmail);
router.route("/reset-password/:id/:token").post(resetPassword);



router.route("/logout").post(verifyUser, logoutUser);
router.route("/current-user").get(verifyUser, getCurrentUser);
router.route("/change-password").put(verifyUser, changeCurrentPassword);
router
  .route("/update-user-profile")
  .put(verifyUser, upload.single("profilePicture"), updateUserProfile);


  router.route("/top-cities").get(verifyUser, verifyAdmin, getTopCities);

router.route("/top-sellers").get(verifyUser, verifyAdmin,getTopSellers);
router.route("/:id").delete(verifyUser,verifyAdmin, deleteUserById);
router.route("/update-user/:id")
  .put(verifyUser, verifyAdmin, upload.single("profilePicture"), updateUserById);
router.route("/:userid").get(verifyUser,verifyAdmin,getUserById)
router.route("/").get(verifyUser,verifyAdmin, getAllUsers);

export default router;
