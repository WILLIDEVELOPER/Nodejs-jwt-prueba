import { Router } from "express";
import * as userCtrl from "../controllers/user.controller";
import { auth} from "../middlewares"

const router = Router();

router.get("/", [auth.verifyToken, auth.isAdminOrUniLeader], userCtrl.getUsers)
router.get("/:userId", [auth.verifyToken], userCtrl.getUserById)
router.patch("/:userId", [auth.verifyToken], userCtrl.updateUserById)
router.delete("/:userId", [auth.verifyToken, auth.isAdmin], userCtrl.deleteUserById)



export default router