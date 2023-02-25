import express from "express";
import morgan from "morgan";
import { createRoles } from "./libs/initialSetUp";
import productsRoutes from "./routes/product.routes";
import authRoutes from "./routes/auth.routes"
import userRoutes from "./routes/user.routes";
import cors from "cors";

const app = express();
createRoles();
app.use(morgan("dev"));
app.use(express.json())
app.use(cors());

app.use("/api/products", productsRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)

export default app;
