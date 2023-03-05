import { Router } from "express";
import * as userCtrl from "../controllers/user.controller";
import { auth} from "../middlewares"
const router = Router();

router.get("/", [auth.verifyToken, auth.isAdminOrUniLeader], userCtrl.getUsers)
router.get("/:userId", [auth.verifyToken, auth.isAdminOrUniLeader], userCtrl.getUserById)
router.patch("/:userId", [auth.verifyToken, auth.isAdminOrUniLeader], userCtrl.updateUserById)
router.delete("/:userId", [auth.verifyToken, auth.isAdmin], userCtrl.deleteUserById)

// router.post("/", [auth.verifyToken, auth.isAdmin, verifySignUp.checkRolesExisted], userCtrl.createUser)

export default router