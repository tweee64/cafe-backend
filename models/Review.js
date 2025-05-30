const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  cafeId: { type: mongoose.Schema.Types.ObjectId, ref: "items" },
  reviewerName: String,
  rating: Number,
  review: String,
  selectedOptions: [String],
  reviewDate: { type: Date, default: Date.now },
});

const reviewModel = mongoose.model("Review", reviewSchema);

module.exports = reviewModel;
