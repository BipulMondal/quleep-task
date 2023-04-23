require("dotenv").config();
const express = require ('express');
const app = express();
const connectToDB = require ("./config/db");
const cors = require ("cors")
const productsRoutes = require ("./routes/productRoutes");

app.use(cors());
app.options("*", cors());

//middleware
app.use(express.json());
app.use("/public/uploads", express.static(__dirname + "/public/uploads"));

connectToDB();

app.use("/", productsRoutes);

module.exports = app;
