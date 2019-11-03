const express = require("express");
const router = express.Router();

// Router retrieves other routes
router.use("/department", require("./department"));
router.use("/category", require("./category"));
router.use("/product", require("./product"));
router.use("/review", require("./review"));

module.exports = router;
