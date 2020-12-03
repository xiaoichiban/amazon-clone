const router = require("express").Router();
const Category = require("../models/category");
const { route } = require("./product");

// POST
router.post("/categories", async (req, res) => {
  try {
    let category = new Category();
    category.type = req.body.type;

    await category.save();

    res.json({
      success: true,
      message: "Successfully saved category",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

// GET
router.get("/categories", async (req, res) => {
  try {
    let categories = await Category.find();

    res.json({
      success: true,
      categories: categories,
    });
  } catch {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

module.exports = router;
