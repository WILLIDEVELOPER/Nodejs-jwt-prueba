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
import path from "path";
import os from "os";

const app = express();
createRoles();
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

const uploadDir = path.join(os.tmpdir(), "upload");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: uploadDir, // cambiar "./upload" por la variable 'uploadDir'
  })
);

app.use("/api/ads", adsRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use(errorHandler);

export default app;
