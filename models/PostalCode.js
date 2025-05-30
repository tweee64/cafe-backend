const mongoose = require("mongoose");

const PostalCode = new mongoose.Schema({
  zone: String,
  district: String,
  postalSector: [String],
  location: String,
});

const PostalCodeItem = mongoose.model("PostalCode", PostalCode);

module.exports = PostalCodeItem;
