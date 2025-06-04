const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  cafeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create compound index to ensure one like per user per cafe
likeSchema.index({ userId: 1, cafeId: 1 }, { unique: true });

module.exports = mongoose.model('Like', likeSchema);