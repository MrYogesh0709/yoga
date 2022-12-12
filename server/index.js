import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./db/connect.js";
import mainRouter from "./routes/mainRouter.js";
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
const port = process.env.PORT || 5000;

app.use("/", mainRouter);

const start = async () => {
  try {
    await connectDB(process.env.MONGODB);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
