import mongoose from "mongoose";

let isConnected:boolean = false;

export const connectToDatabase = async () => {
  mongoose.set("strictQuery", true);

  if (!process.env.MONGODB_URL) return console.log("missing mongodb url");

  if (isConnected) {
    console.log("mongo db is already connected");
  }

  try {
    await mongoose.connect(process.env.MONGODB_URL, {
        dbName:"devflow"

    })
    isConnected = true;
    console.log("mongodb is connected")
  } catch (error) {
    console.log("mongodb is not connected",error)
  }
};
