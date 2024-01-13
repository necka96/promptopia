import mongoose from "mongoose";

let isConnected = false; // track conection status

export const connectToDb = async () => {
  mongoose.set("strictQuery", true);
  if (isConnected) {
    console.log("Mongo db is already connected ");
    return;
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "share_propmpt",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log("connected to the database");
  } catch (err) {
    console.log(err);
  }
};
