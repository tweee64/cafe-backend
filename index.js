require("dotenv").config(); // Load environment variables from .env file
const express = require("express");
const port = process.env.PORT || 5000;

const connectDB = require("./db.js");
const itemModel = require("./models/items.js");
const userModel = require("./models/User.js");
const PostalCodeItem = require("./models/PostalCode.js");
const cors = require("cors");
const reviewModel = require("./models/Review.js");
const likeModel = require("./models/Like.js"); // Import Like model
const app = express();
app.use(express.json());
app.use(cors());
connectDB();
app.get("/", async (req, res) => {
  const response = await itemModel.find();
  console.log("cafes", response);
  return res.json({ items: response });
});
app.get("/postalCode", async (req, res) => {
  const response = await PostalCodeItem.find();
  return res.json({ postalcode: response });
});
app.get("/get-reviews/:id", async (req, res) => {
  const { id } = req.params;
  const response = await reviewModel.find({ cafeId: id });

  return res.json({ reviews: response });
});

app.post("/register", (req, res) => {
  userModel
    .create(req.body)
    .then((user) => res.json(user))
    .catch((err) => res.json(err));
});

app.post("/add-cafe", (req, res) => {
  console.log("Request Body:", req.body); // Log the request body to see what is being sent
  const { name, description, image, address, region } = req.body;
  itemModel
    .create({ name, description, image, address, region })
    .then((item) => res.status(201).json(item))
    .catch((err) => {
      console.error("Error saving cafe:", err);
      res
        .status(500)
        .json({ error: "Failed to add cafe. Please try again later." });
    });
});
app.post("/add-review", (req, res) => {
  console.log("Request Body:", req.body);
  const { cafeId, reviewerName, review, rating, selectedOptions } = req.body;
  reviewModel
    .create({ cafeId, reviewerName, review, rating, selectedOptions })
    .then((item) => res.status(201).json(item))
    .catch((err) => {
      console.error("Error saving cafe:", err);
      res
        .status(500)
        .json({ error: "Failed to add cafe. Please try again later." });
    });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  userModel.findOne({ email: email }).then((user) => {
    if (user) {
      if (user.password === password) {
        res.json({
          message: "Success",
          user: {
            id: user._id,
            username: user.name,
            email: user.email,
            photo: user.photo, // Use default avatar if no photo exists
          },
        });
      } else {
        res.json("The password is incorrect");
      }
    } else {
      res.json("No User exist");
    }
  });
});

// Like/Unlike cafe endpoint
app.post("/like-cafe", async (req, res) => {
  try {
    const { userId, cafeId } = req.body;

    if (!userId || !cafeId) {
      return res.status(400).json({ message: "User ID and Cafe ID are required" });
    }

    // Check if like already exists
    const existingLike = await likeModel.findOne({ userId, cafeId });

    if (existingLike) {
      // Unlike - remove the like
      await likeModel.deleteOne({ userId, cafeId });
      res.json({ message: "Cafe unliked successfully", liked: false });
    } else {
      // Like - create new like
      const newLike = new likeModel({ userId, cafeId });
      await newLike.save();
      res.json({ message: "Cafe liked successfully", liked: true });
    }
  } catch (error) {
    console.error("Error toggling like:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get user's liked cafes
app.get("/user-likes/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const likes = await likeModel.find({ userId }).populate('cafeId');
    const likedCafes = likes.map(like => like.cafeId);
    res.json({ likedCafes });
  } catch (error) {
    console.error("Error fetching user likes:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Check if user has liked a specific cafe
app.get("/check-like/:userId/:cafeId", async (req, res) => {
  try {
    const { userId, cafeId } = req.params;
    const like = await likeModel.findOne({ userId, cafeId });
    res.json({ liked: !!like });
  } catch (error) {
    console.error("Error checking like status:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log("app is running");
});
