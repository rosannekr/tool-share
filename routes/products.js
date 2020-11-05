var express = require('express');
var router = express.Router();
var models = require("../models")

//GET all products 

router.get("/", function (req, res) {
  models.Products.findAll()
    .then((data) => res.send(data))
    .catch((error) => {
      res.status(500).send(error);
    });
});

//GET one product

router.get("/:id", function(req, res) {
  let id = req.params.id;
  models.Products.findOne({
    where: {
      id,
    },
    include: models.Product,
  })
    .then((data) => res.send(data))
    .catch((error) => {
      res.status(500).send(error);
    });
});

//Adds a new product

router.post("/", function (req, res) {
  const { name, pricePerDay,isAvailable,description, picture, ownerId, CategoryId } = req.body;
  models.Products.create({ name, pricePerDay,isAvailable,description, picture, ownerId, CategoryId })
    .then((data) => res.send(data))
    .catch((error) => {
      res.status(500).send(error);
    });
});

// Updates product listing

router.put("/:id", function (req, res) {
  Book.update(
    {title: req.body.title},
    {returning: true, where: {id: req.params.bookId} }
  )
  .then(function([ rowsUpdate, [updatedBook] ]) {
    res.json(updatedBook)
  })
  .catch(next)
 })

module.exports = router;
