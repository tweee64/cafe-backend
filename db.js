const mongoose = require("mongoose");
const mongoURI = process.env.MONGO_URI;
console.log("Mongo URI:", mongoURI);

const connectDB = async () => {
  try {
    if (!mongoURI) {
      throw new Error("MongoDB URI is undefined");
    }
    const conn = await mongoose.connect(mongoURI);
    console.log(`MongoDB connected ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};
module.exports = connectDB;
