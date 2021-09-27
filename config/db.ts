import dotenv from "dotenv";
import { createConnection } from "typeorm";

dotenv.config();



export const connection = createConnection();
