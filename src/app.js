import express from "express";
import morgan from "morgan";
import { createRoles } from "./libs/initialSetUp";
import adsRoutes from "./routes/ad.routes";
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import cors from "cors";
import fileUpload from "express-fileupload";
import { errorHandler } from "./middlewares/autorizator";
import fs from "fs-extra";

const app = express();
createRoles();
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());
if (!fs.existsSync('upload')) {
  fs.mkdirSync('upload');
}
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: "./upload"
}));

app.use("/api/ads", adsRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use(errorHandler);

export default app;
