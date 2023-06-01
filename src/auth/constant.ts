import * as dotenv from "dotenv";

dotenv.config();
export const jwtConstants = {
    secret: process.env["JWT_KEY"],
    JWT_EXPIRES_IN: "24h"
}