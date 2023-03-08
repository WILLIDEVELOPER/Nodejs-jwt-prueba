import { Router } from "express";
import * as adCtrl from "../controllers/ad.controller";
import { auth } from "../middlewares";
import multer from "multer";

const router = Router();

router.get("/", adCtrl.getAds);
router.get("/:adId", adCtrl.getAdById);
router.post(
  "/",
  [auth.verifyToken, auth.isAdminOrUniLeader],
  adCtrl.createAd
);
router.patch(
  "/:adId",
  [auth.verifyToken, auth.isAdminOrUniLeader],
  adCtrl.updateAdById
);
router.delete("/:adId", [auth.verifyToken, auth.isAdmin], adCtrl.deleteAdById);

export default router;
