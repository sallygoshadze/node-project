import "reflect-metadata";
import express from "express";
import dotenv from "dotenv";
import studentRoutes from "./routes/students";
import { connection } from "./config/db";

const app = express();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/students", studentRoutes);

const PORT = process.env.PORT || 5000;

connection
  .then(() => {
    console.log("database connected");
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
  })
  .catch(console.error);
