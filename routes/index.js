const express = require("express");
const router = express.Router();

// Router retrieves other routes
router.use("/department", require("./department"));
router.use("/category", require("./category"));
router.use("/product", require("./product"));

module.exports = router;
