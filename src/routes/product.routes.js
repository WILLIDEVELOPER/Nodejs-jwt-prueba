import { Router } from "express";
import * as productsCtrl from "../controllers/products.controller";
import { auth } from "../middlewares";

const router = Router();

router.get("/", productsCtrl.getProducts);
router.get("/:productId", productsCtrl.getProductById);
router.post("/", [auth.verifyToken, auth.isAdminOrModerator], productsCtrl.createProduct);
router.patch("/:productId", [auth.verifyToken, auth.isAdminOrModerator], productsCtrl.updateProductById);
router.delete("/:productId", [auth.verifyToken, auth.isAdmin], productsCtrl.deleteProductById);



export default router;
