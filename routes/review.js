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

module.exports = router;
