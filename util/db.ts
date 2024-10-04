import mongoose from "mongoose";

let connected = false;
const mongoURI = process.env.MONGODB_URI;

const connectDB = async () => {
  if (!mongoURI) {
    return;
  }
  mongoose.set("strictQuery", true);

  if (connected) {
    console.log("MongoDB is connected.");
    return;
  }

  try {
    await mongoose.connect(mongoURI);
    connected = true;
  } catch (error) {
    console.error(error);
  }
};

export default connectDB;
