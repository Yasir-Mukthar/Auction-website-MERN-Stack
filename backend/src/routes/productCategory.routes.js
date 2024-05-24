import { Router } from "express";
import {
  createProductCategory,
  getAllProductCategories,
  getProductCategory,
  updateProductCategory,
  deleteProductCategory,
  getCatgegoriesMoreDetail,
  getTopCategories,
} from "../controllers/productCategory.controller.js";
import { verifyAdmin, verifyUser } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/top").get(verifyUser, verifyAdmin, getTopCategories);
router.route("/detail").get(verifyUser, verifyAdmin, getCatgegoriesMoreDetail);

router.route("/:id").get(getProductCategory);
router.route("/").get(getAllProductCategories);

router
  .route("/")
  .post(verifyUser, verifyAdmin, upload.single("image"), createProductCategory);
router
  .route("/:id")
  .put(verifyUser, verifyAdmin, upload.single("image"), updateProductCategory);
router.route("/:id").delete(verifyUser, verifyAdmin, deleteProductCategory);



export default router;
