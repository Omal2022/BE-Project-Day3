import { error } from "node:console";
import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import connectDb from "./config/db.config.js";

const startServer = async () => {
  try {
    await connectDb();

    app.listen(process.env.PORT || 8080, () => {
      console.log(`Server is running on http://localhost:${process.env.PORT}`);
    });
  } catch (err) {
    console.error("Failed to load server", error);
    process.exit(1);
  }
};

startServer();
