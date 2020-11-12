var express = require("express");
var router = express.Router();
var models = require("../models");
const sequelize = require("sequelize");
const { QueryTypes } = require("sequelize");
const Op = sequelize.Op;
const multer = require("multer");

//GET all available products

router.get("/", async function (req, res) {
  try {
    const products = await models.Product.findAll({
      where: {
        isAvailable: 1,
      },
      include: models.User,
    });
    res.send(products);
  } catch (error) {
    res.status(500).send(error);
  }
});

//make product unavailable after being borrowed

router.put("/:id/borrow", async function (req, res) {
  const { id } = req.params;
  try {
    const result = await models.Product.update(
      { isAvailable: 0 },
      { where: { id } }
    );
    res.send("Product is now unavailable");
  } catch (error) {
    res.status(500).send(error);
  }
});

//make product available after being returned

router.put("/:id/return", async function (req, res) {
  const { id } = req.params;
  try {
    const result = await models.Product.update(
      { isAvailable: 1 },
      { where: { id } }
    );
    res.send("Product is now available");
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
      include: models.User,
    });
    res.send(product);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Adds a new product

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/pictures");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

router.post("/", upload.single("picture"), function (req, res) {
  let picture = req.file.path;
  let isAvailable = true;
  let rating = 0;

  const {
    name,
    pricePerDay,
    description,
    UserId,
    CategoryId,
    condition,
    NumOfDaysAvailable,

  } = req.body;

  models.Product.create({
    name,
    pricePerDay,
    isAvailable,
    description,
    UserId,
    CategoryId,
    condition,
    picture,
    NumOfDaysAvailable,
    rating
  })
    .then((data) => res.send(data))
    .catch((error) => {
      res.status(500).send(error);
    });

  console.log(req.file.path);
});

//search products by name

router.get("/search/:search", async function (req, res) {
  let search = req.params.search;
  search = search.toLowerCase();

  try {
    const products = await models.Product.findAll({
      where: {
        name: {
          [Op.like]: `%${search}%`,
        },
      },
      include: models.User,
    });
    res.send(products);
  } catch (error) {
    res.status(500).send(error);
  }
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
