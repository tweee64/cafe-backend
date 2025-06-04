const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  // _id: String,
  name: String,
  description: String,
  image: { type: String, required: false }, // Optional image field
  address: String,
  region: String,
  priceRange: {
    type: String,
    enum: ['$', '$$', '$$$', '$$$$'],
    default: '$'
  },
  cafeType: {
    type: String,
    enum: ['Independent', 'Chain', 'Specialty Coffee', 'Roastery', 'Bakery Cafe', 'Coffee Shop'],
    default: 'Coffee Shop'
  },
  features: [{
    type: String,
    enum: ['WiFi', 'Pet-friendly', 'Outdoor Seating', 'Parking', 'Study-friendly', 'Power Outlets', 'Food Served', '24/7']
  }],
  // Optional: Add these for future use
  averagePrice: {
    type: Number, // Average price in dollars
    min: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }

});

const itemModel = mongoose.model("Item", itemSchema);

module.exports = itemModel;
