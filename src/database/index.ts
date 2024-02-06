import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
  if (isConnected) {
    console.log("=> using existing database connection");
    return;
  }

  try {
    console.log("=> creating a new database connection");
    await mongoose.connect(process.env.DATABASE_URL || "", {
      dbName: "rapid-talks",
    });
    isConnected = true;
  
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection error", error);
  }
};