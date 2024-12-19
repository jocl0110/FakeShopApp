import mongoose from "mongoose";
export const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB succesfully connected");
  } catch (error) {
    console.log(`Error connecting to MongoDB ${error}`);
    process.exit(1);
  }
};
