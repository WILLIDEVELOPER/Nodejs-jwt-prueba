import { config } from "dotenv"

config()

export const MONGODB_URL = process.env.MONGODB_URL || "mongodb+srv://Mern:soto1023@egresados.27vx3au.mongodb.net/?retryWrites=true&w=majority"
export const PORT = process.env.PORT || 5000

export default {
    SECRET: "products-api"
}