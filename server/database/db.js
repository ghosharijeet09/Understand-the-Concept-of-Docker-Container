import mongoose from "mongoose";

const dbURI = "mongodb://root:password@mongo:27017/task-manager?authSource=admin";

mongoose
  .connect(dbURI, {
    maxPoolSize: 10,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

const db = mongoose.connection;

db.on("connected", () => {
  console.log(`Mongoose connected to ${dbURI}`);
});

db.on("disconnected", () => {
  console.log("Mongoose disconnected");
});

export default db;