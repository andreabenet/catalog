const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
// init de server
const app = express();
app.use(bodyParser());

// connect to the database
mongoose.connect("mongodb://localhost/catalog", { useNewUrlParser: true });

// acces de routes
app.use(require("./routes"));

// Start server
app.listen(3000, () => console.log("Server has started"));
