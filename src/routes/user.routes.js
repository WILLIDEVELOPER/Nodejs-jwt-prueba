import { Router } from "express";
import * as userCtrl from "../controllers/user.controller";
import { auth, verifySignUp} from "../middlewares"
const router = Router();

router.post("/", [auth.verifyToken, auth.isAdmin, verifySignUp.checkRolesExisted], userCtrl.createUser)

export default router