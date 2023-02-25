import { Router } from "express";
import * as userCtrl from "../controllers/user.controller";
import { auth, verifySignUp} from "../middlewares"
const router = Router();

router.get("/", [auth.verifyToken, auth.isAdmin], userCtrl.getUsers)
router.get("/:userId", [auth.verifyToken, auth.modOrAdmin], userCtrl.getUserById)
router.patch("/:userId", [auth.verifyToken, auth.modOrAdmin], userCtrl.updateUserById)
router.delete("/:userId", [auth.verifyToken, auth.modOrAdmin], userCtrl.deleteUserById)

// router.post("/", [auth.verifyToken, auth.isAdmin, verifySignUp.checkRolesExisted], userCtrl.createUser)

export default router