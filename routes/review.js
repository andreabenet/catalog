const express = require("express");
const router = express.Router();

const Department = require("../models/department");
const Category = require("../models/category");
const Product = require("../models/product");
const Review = require("../models/review");

router.post("/create", async (req, res) => {
  try {
    // create new Review
    const newReview = new Review({
      rating: req.body.rating,
      comment: req.body.comment,
      username: req.body.username
    });
    // save Review
    await newReview.save();

    // link it to a product
    const product = await Product.findById(req.body.product);
    product.reviews.push(newReview);

    // update average rating
    product.averageRating =
      ((isNaN(product.averageRating) ? 0 : product.averageRating) +
        req.body.rating) /
      product.reviews.length;

    // save Product
    await product.save();
    res.status(200).send("ok");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.put("/update", async (req, res) => {
  try {
    // Update the review
    if (req.body.id === undefined) {
      return res.status(400).send("wrong parameters");
    }
    const review = await Review.findById(req.body.id);
    const oldRating = review.rating;
    req.body.rating ? (review.rating = req.body.rating) : null;
    req.body.comment ? (review.comment = req.body.comment) : null;
    await review.save();

    // Update the average rating: retrieve product with the updated review
    const product = await Product.findOne({ reviews: { $in: [req.body.id] } });
    console.log("Old rating : " + oldRating);
    console.log("old average : " + product.averageRating);
    console.log("nb review : " + product.reviews.length);
    console.log("new rating : " + req.body.rating);
    product.averageRating =
      product.averageRating +
      (-oldRating + req.body.rating) / product.reviews.length;
    await product.save();

    // acknowledge
    res.status(200).send("updated review");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
