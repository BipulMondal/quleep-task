const express = require("express");

const {home, createProduct, getProduct, getProducts} = require("../controllers/productController");

const router = express.Router();

router.get("/", home);
router.post("/createProduct", createProduct);
router.get("/getproduct", getProduct);
router.get("/getproducts", getProducts);


module.exports = router;