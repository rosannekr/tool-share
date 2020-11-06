var express = require('express');
var router = express.Router();
var models = require("../models")


// get all borrowed products


router.get("/:id/products", function (req, res) {
  const { id } = req.params;

  models.User.findOne({
    where: {
      id,
    },
    include: ["Borrowed"],
  })
    .then((user) => {
      user
        .getProducts()
        .then((products) => res.send(products))
        .catch((error) => {
          res.status(500).send(error);
        });
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});


// ADD product to an user 

router.post("/:id", function (req, res) {
  const { id } = req.params;
  const { name, pricePerDay,isAvailable,description, picture, ownerId, CategoryId } = req.body;

  models.User.findOne({
    where: {
      id,
    },
  })
    .then((product) => {
      product
        .createProduct({ name, pricePerDay,isAvailable,description, picture, ownerId, CategoryId })
        .then((data) => {
          res.send(data);
        })
        .catch((error) => {
          res.status(500).send(error);
        });
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});


module.exports = router;
