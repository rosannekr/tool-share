var express = require("express");
var router = express.Router();
var models = require("../models");

/* GET all categories */
router.get("/", async function (req, res) {
  try {
    const categories = await models.Category.findAll();
    res.send(categories);
  } catch (error) {
    res.status(500).send(error);
  }
});

/* GET one category */
router.get("/:id", async function (req, res) {
  const { id } = req.params;
  try {
    const category = await models.Category.findOne({
      where: {
        id,
      },
    });
    res.send(category);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Get all products that belong in a category (filter)
router.get("/:id/products", async function (req, res, next) {
  const { id } = req.params;
  try {
    const category = await models.Product.findAll({
      where: {
        categoryId : id
      },
      include: models.User,
      
    });

    res.send(category);
  } catch (error) {
    res.status(500).send(error);
  }
});
module.exports = router;
