import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDb = async () => {
  if (!process.env.MONGO_URI) {
    console.error("MONGO_URI is required");
    throw new Error("MONGO_URI is required");
  }
  try {
    const connectionInstance = await mongoose.connect(process.env.MONGO_URI);

    console.log(
      `\n Pinged your deployment. You successfully connected to MongoDB! ${connectionInstance}`,
    );
  } catch (err) {
    console.error("MongoDB connectionfailed", err);
    throw new Error("Database failed to load");
  }
};

export default connectDb;
