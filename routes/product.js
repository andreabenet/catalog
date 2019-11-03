const express = require("express");
const router = express.Router();

// retrieve models
const Department = require("../models/department");
const Category = require("../models/category");
const Product = require("../models/product");

router.get("/", async (req, res) => {
  try {
    // Advanced search with query parameters, should better handle parameteres combinations
    let search = Product.find();
    if (req.query.category && req.query.title) {
      search = Product.find()
        .where("category")
        .equals(req.query.category)
        .where("title")
        .equals(RegExp(req.query.title, "i"));
    } else if (req.query.title) {
      search = Product.find()
        .where("title")
        .equals(RegExp(req.query.title, "i"));
    } else if (req.query.category) {
      search = Product.find()
        .where("category")
        .equals(req.query.category);
    }
    res.status(200).send(await search); // lance la recherche
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post("/create", async (req, res) => {
  try {
    const newProduct = new Product({
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category
    });
    await newProduct.save();
    res.status(200).send("Product Created");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.put("/update", async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.body.id });
    product.title = req.body.title;
    product.description = req.body.description;
    product.price = req.body.price;
    product.department = req.body.department;
    await product.save();
    res.status(200).send("Product updated");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.delete("/delete", async (req, res) => {
  try {
    await Product.findOne({ _id: req.body.id }).remove();
    res.status(200).send("Product deleted");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
