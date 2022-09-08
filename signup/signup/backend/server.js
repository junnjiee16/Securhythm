const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const routesUrls = require("./routes/routes.js");
const cors = require("cors");
mongoose.connect(process.env.DATABASE_ACCESS, () =>
  console.log("Database connected")
);
const port = 4000;

app.use(express.json());
app.use(cors());
app.use("/app", routesUrls);
app.listen(port, () => console.log("Server is running on port: " + port));
