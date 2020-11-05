var express = require('express');
var router = express.Router();
var models = require("../models")

//GET all products 

router.get("/", async function (req, res) {
  try {
    const products = await models.Product.findAll();
    res.send(products);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Get one product

router.get("/:id", async function (req, res) {
  const { id } = req.params;
  try {
    const product = await models.Product.findOne({
      where: {
        id,
      },
    });
    res.send(product);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Adds a new product

router.post("/", function (req, res) {
  const { name, pricePerDay,isAvailable,description, picture, ownerId, CategoryId } = req.body;
  models.Product.create({ name, pricePerDay,isAvailable,description, picture, ownerId, CategoryId })
    .then((data) => res.send(data))
    .catch((error) => {
      res.status(500).send(error);
    });
});

// Update product 

router.put("/:id", async function (req, res) {
  const { id } = req.params;
  try {
    await models.Product.update(req.body, {
      where: {
        id,
      },
    });
    res.send("Product updated");
  } catch (error) {
    res.status(500).send(error.message);
  }
});


//Delete product

router.delete("/:id", async function (req, res, next) {
  const { id } = req.params;
  try {
    await models.Product.destroy({
      where: {
        id,
      },
    });
    res.send("Product deleted");
  } catch (error) {
    res.status(500).send(error);
  }
});



module.exports = router;
