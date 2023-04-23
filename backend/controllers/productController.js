const Product = require("../models/productModel");
const multer = require("multer");

const FILE_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const isValid = FILE_TYPE_MAP[file.mimetype];
    let uploadError = new Error("Invalid image type");

    if (isValid) {
      uploadError = null;
    }

    cb(uploadError, "public/uploads");
  },
  filename: function (req, file, cb) {
    const fileName = file.originalname.split(" ").join("-");
    const extention = FILE_TYPE_MAP[file.mimetype];

    cb(null, `${fileName}-${Date.now()}.${extention}`);
  },
});

const upload = multer({ storage: storage });

exports.home = (req, res) => {
  res.send("Welcome to dashboard");
};

exports.createProduct = async (req, res) => {
  upload.array("images", 6)(req, res, async (err) => {
    const files = req.files;

    if(!files || files.length === 0) {
        return res.status(400).send("no image in the request")
        //  console.log("no image in the request")
    }

    const images = [];
    const basePath = `${req.protocol}://${req.get("host")}/public/uploads/`;
    for(let i = 0; i <files.length; i++){
        const fileName = files[i].filename;
        images.push(`${basePath}${fileName}`)
    }


    const {name, description, price, currency, color} = req.body;

    if(!name || !description || !price || !currency || !color){
        console.log("All fields are required")
    }
    else{
    let product = new Product({
      name: req.body.name,
      description: req.body.description,
      color: req.body.color,
      price: req.body.price,
      currency: req.body.currency,
      images: images,
    });
    product = await product.save();

    if (!product) {
      res.status(500).send("The product can not be created");
    }

    res.status(201).json({
      message: "product created successfully",
      product,
    });
}
  });
};

exports.getProduct = async (req, res) => {
  const product = await Product.findById("req.params.id");

  if (!product) {
    res.status(500).json({
      success: false,
      message: "Can not find product",
    });
  }

  res.status(201).json({
    success: true,
    product,
  });
};

exports.getProducts = async (req, res) => {
  const product = await Product.find();

  if (!product) {
    res.status(500).json({
      success: false,
      message: "Can not find product",
    });
  }

  res.status(201).send(product);
};
