const express = require("express");
const router = express.Router();

// retrieve models
const Department = require("../models/department");
const Category = require("../models/category");
const Product = require("../models/product");

router.get("/", async (req, res) => {
  try {
    res.status(200).send(await Category.find());
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post("/create", async (req, res) => {
  try {
    const newCategory = new Category({
      title: req.body.title,
      description: req.body.description,
      department: req.body.department
    });
    await newCategory.save();
    res.status(200).send("Created");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.put("/update", async (req, res) => {
  try {
    const category = await Category.findOne({ _id: req.body.id });
    category.title = req.body.title;
    category.description = req.body.description;
    category.department = req.body.department;
    await category.save();
    res.status(200).send("Category updated");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.delete("/delete", async (req, res) => {
  try {
    await Product.deleteMany({ category: req.body.id });
    await Category.findOne({ _id: req.body.id }).remove();
    res.status(200).send("Category deleted");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
