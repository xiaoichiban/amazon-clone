const router = require("express").Router();
const Product = require("../models/product");

const upload = require("../middlewares/upload-photo");

// POST request - create product
router.post("/products", upload.single("photo"), async (req, res) => {
  try {
    let product = new Product();
    product.ownerID = req.body.ownerID;
    product.categoryID = req.body.categoryID;
    product.price = req.body.price;
    product.title = req.body.title;
    product.description = req.body.description;
    product.photo = req.file.location;
    product.stockQuantity = req.body.stockQuantity;

    await product.save();

    res.json({
      status: true,
      message: "Successfully saved",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

// GET request - get all product
router.get("/products", async (req, res) => {
  try {
    let products = await Product.find().populate("owner category").exec();
    res.json({
      success: true,
      products: products,
    });
  } catch {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

// GET request - get a product
router.get("/products/:id", async (req, res) => {
  try {
    let product = await Product.findOne({ _id: req.params.id })
      .populate("owner category")
      .exec();

    res.json({
      success: true,
      product: product,
    });
  } catch {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

// PUT request -update a product
router.put("/products/:id", upload.single("photo"), async (req, res) => {
  try {
    let product = await Product.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          title: req.body.title,
          description: req.body.description,
          photo: req.file.location,
          stockQuantity: req.body.stockQuantity,
          price: req.body.price,
          owner: req.body.ownerID,
          category: req.body.categoryID,
        },
      },
      { upsert: true }
    );

    res.json({
      success: true,
      updateProduct: product,
    });
  } catch {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

// DELETE request - delete a product
router.delete("/products/:id", async (req, res) => {
  try {
    let deletedProduct = await Product.findOneAndDelete({ _id: req.params.id });

    if (deletedProduct) {
      res.json({
        success: true,
        message: "Successfully deleted product",
      });
    }
  } catch {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

module.exports = router;
