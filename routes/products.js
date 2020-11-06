var express = require('express');
var router = express.Router();
var models = require("../models");
const sequelize = require('sequelize');
const { QueryTypes } = require('sequelize');
const Op = sequelize.Op


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
  const { name, pricePerDay,isAvailable,description, picture, userId, categoryId } = req.body;
  models.Product.create({ name, pricePerDay,isAvailable,description, picture, userId, categoryId })
    .then((data) => res.send(data))
    .catch((error) => {
      res.status(500).send(error);
    });
});

//search products by name

router.get("/search/:search", async function(req, res) {
  let search = req.params.search;
  search = search.toLowerCase();

   models.sequelize.query(`SELECT * FROM Products WHERE name LIKE ?`,
    { replacements: [`%${search}%`], type: sequelize.QueryTypes.SELECT })
    .then((products) => res.send(products))
    .catch((error) => {
      res.status(500).send(error);
    })
})
  
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

//GET all products 

router.get("/", async function (req, res) {
  try {
    const products = await models.Product.findAll();
    res.send(products);
  } catch (error) {
    res.status(500).send(error);
  }
});


module.exports = router;


