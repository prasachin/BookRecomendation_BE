const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
  cover: String,
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: { type: String, required: true },
  publicationDate: Date,
  description: String,
  ratings: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      rating: Number,
      review: String,
      createdAt: { type: Date, default: Date.now },
    },
  ],
});

module.exports = mongoose.model("Book", BookSchema);
