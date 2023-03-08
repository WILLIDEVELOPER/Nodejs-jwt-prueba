import { Router } from "express";
import * as userCtrl from "../controllers/user.controller";
import { auth} from "../middlewares"
import multer from "multer";
const upload = multer({ dest: "uploads/" });

const router = Router();

router.get("/", [auth.verifyToken, auth.isAdminOrUniLeader], userCtrl.getUsers)
router.get("/:userId", [auth.verifyToken, auth.isAdminOrUniLeader], userCtrl.getUserById)
router.patch("/:userId", [auth.verifyToken, auth.isAdminOrUniLeader, upload.single("profileImage")], userCtrl.updateUserById)
router.delete("/:userId", [auth.verifyToken, auth.isAdmin], userCtrl.deleteUserById)



export default router