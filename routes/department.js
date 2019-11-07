const express = require("express");
const router = express.Router();

// retrieve models
const Department = require("../models/department");
const Category = require("../models/category");
const Product = require("../models/product");

router.get("/", async (req, res) => {
  try {
    res.status(200).send(await Department.find());
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post("/create", async (req, res) => {
  try {
    const newDepartment = new Department({
      title: req.body.title
    });
    await newDepartment.save();
    res.status(200).send("Created");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.put("/update", async (req, res) => {
  try {
    const department = await Department.findOne({ _id: req.body.id });
    department.title = req.body.title;
    await department.save();
    res.status(200).send("Derpartment updated");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.delete("/delete", async (req, res) => {
  try {
    const departmentId = req.query.id;
    if (department) {
      const categoryToRemove = await Category.find({
        department: req.query.id
      });
      for (let i = 0; i < categoryToRemove(); i++) {
        await Product.deleteMany({ category: categoryToRemove[i]._id });
        await categoryToRemove[i].remove();
      }
      await Department.findById({ _id: req.body.id }).remove();
    }

    res.status(200).send("Derpartment deleted");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
