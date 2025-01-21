import mongoose from "mongoose";


export const connectdb = async () => {
  const { connection } = await mongoose.connect(process.env.MONGO_URL);
  console.log(`Database connection successfull with ${connection.host}`);
};