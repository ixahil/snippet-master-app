import { configDotenv } from "dotenv";
import mongoose from "mongoose";
configDotenv();

const dbURI = process.env.DBURI;

export const databaseConnection = async () => {
  try {
    const conn = await mongoose.connect(dbURI);
    console.log(`Database connected successfully to ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
