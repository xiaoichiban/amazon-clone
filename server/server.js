//CRUD functions
const express = require("express");
//this Show API calls on terminal
const morgan = require("morgan");
//parse data from frontend form into JSON/URL-encoded
const bodyParser = require("body-parser");
//MongoDB
const Mongoose = require("mongoose");
//environment variables
const dotenv = require("dotenv");

const User = require("./models/user");

const cors = require("cors");

dotenv.config();

const app = express();

Mongoose.connect(
  process.env.DATEBASE,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Connected to DB");
    }
  }
);

//Middlewares - middleman between FE and BE
app.use(cors());
app.use(morgan("dev"));
app.unsubscribe(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// require apis
const productRoutes = require("./routes/product");
const categoryRoutes = require("./routes/category");
const ownerRoutes = require("./routes/owner");
const userRoutes = require("./routes/auth");

app.use("/api", productRoutes);
app.use("/api", categoryRoutes);
app.use("/api", ownerRoutes);
app.use("/api", userRoutes);

app.listen(3000, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Listening on port", 3000);
  }
});
