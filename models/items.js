const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  // _id: String,
  name: String,
  description: String,
  image: { type: String, required: false }, // Optional image field
  address: String,
  region: String,
});

const itemModel = mongoose.model("Item", itemSchema);

module.exports = itemModel;
