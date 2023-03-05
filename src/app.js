import express from "express";
import morgan from "morgan";
import { createRoles } from "./libs/initialSetUp";
import adsRoutes from "./routes/ad.routes";
import authRoutes from "./routes/auth.routes"
import userRoutes from "./routes/user.routes";
import cors from "cors";
import configDinary  from "./libs/configDinary";
import { errorHandler } from "./middlewares/autorizator";

const app = express();
createRoles();
configDinary()
app.use(morgan("dev"));
app.use(express.json())
app.use(cors());

app.use("/api/ads", adsRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use(errorHandler);


export default app;
