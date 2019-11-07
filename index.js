const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
// init de server
const app = express();
app.use(bodyParser());

// connect to the database
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/catalog", {
  useNewUrlParser: true,
  useUnifiedTopologie: true // enlever un warning sur la console
});

// acces de routes
app.use(require("./routes"));

// Start server
app.listen(process.env.PORT || 3000, () => console.log("Server has started"));
// attenation on ne peut pas avoir plusieurs projets qui ecoutent sur le même port
// process.env.PORT c une variable qui nous ai donné par heroku
