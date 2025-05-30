require("dotenv").config(); // Load environment variables from .env file

const connectDB = require("./db");
const reviewModel = require("./models/Review.js");

const run = async () => {
  try {
    // Connect to MongoDB using Mongoose
    await connectDB();

    // Insert data into the postal_codes collection
    await reviewModel.deleteMany({});
    console.log("All reviews deleted!");
  } catch (error) {
    console.error("Error deleteing data:", error);
  }
};

run();
