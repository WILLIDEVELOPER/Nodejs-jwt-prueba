import { Router } from "express";
import * as adCtrl from "../controllers/ad.controller";
import { auth } from "../middlewares";
import multer from "multer";
const upload = multer({ dest: "uploads/" });

const router = Router();

router.get("/", adCtrl.getAds);
router.get("/:adId", adCtrl.getAdById);
router.post(
  "/",
  [auth.verifyToken, auth.isAdminOrUniLeader, upload.single("image")],
  adCtrl.createAd
);
router.patch(
  "/:adId",
  [auth.verifyToken, auth.isAdminOrUniLeader],
  adCtrl.updateAdById
);
router.delete("/:adId", [auth.verifyToken, auth.isAdmin], adCtrl.deleteAdById);

export default router;
