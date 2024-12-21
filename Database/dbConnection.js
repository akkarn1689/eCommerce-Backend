import mongoose from "mongoose";

export function dbConnection() {
  const DB_URL = process.env.DB_URL || `mongodb://localhost:27017/Ecommerce-App`;
  mongoose
    .connect(DB_URL)
    .then(() => {
      console.log("DB Connected Succesfully");
    })
    .catch((error) => {
      console.log("DB Failed to connect", error);
    });
}


