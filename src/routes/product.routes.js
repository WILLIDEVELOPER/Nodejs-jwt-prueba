import { Router } from "express";
import * as productsCtrl from "../controllers/products.controller";
import { auth } from "../middlewares";

const router = Router();

router.get("/", productsCtrl.getProducts);
router.get("/:productId", productsCtrl.getProductById);
router.post("/", [auth.verifyToken, auth.isModerator], productsCtrl.createProduct);
router.patch("/:productId", [auth.verifyToken, auth.isModerator], productsCtrl.updateProductById);
router.delete("/:productId", [auth.verifyToken, auth.isAdmin], productsCtrl.deleteProductById);



export default router;
