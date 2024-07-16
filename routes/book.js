const express = require("express");
const router = express.Router();
const Review = require("../models/review");

router.post("/review", async (req, res) => {
  try {
    const { bookId, userId, rating, comment } = req.body;
    const review = new Review({ bookId, userId, rating, comment });
    await review.save();
    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/reviews/:bookId", async (req, res) => {
  try {
    const reviews = await Review.find({ bookId: req.params.bookId });
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
