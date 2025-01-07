import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

mongoose.connect(process.env.MONGO_CONNECTION_URL as string);

let db= mongoose.connection;
db.on('error', console.error.bind("Connection error"));
db.once('open',()=>{
  console.log("db connected");
})