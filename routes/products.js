var express = require("express");
var router = express.Router();
var models = require("../models");
const sequelize = require("sequelize");
const { QueryTypes } = require("sequelize");
const Op = sequelize.Op;
const multer = require("multer");

//GET all available products

router.get("/", async function (req, res) {
  const q = req.query.q ? req.query.q : null;
  const condition = req.query.condition ? req.query.condition : null;
  const category_id = req.query.category_id ? req.query.category_id : null;
  const sort_by = req.query.sort_by ? req.query.sort_by : null;

  let filters = {};
  let sort = [];

  // Set where condition
  if (q) filters["name"] = { [Op.like]: `%${q}%` };
  if (condition) filters["condition"] = condition;
  if (category_id) filters["categoryId"] = category_id;

  // Set order by condition
  if (sort_by === "newest") sort = [["createdAt", "DESC"]];
  else sort = [["id", "ASC"]];

  try {
    const products = await models.Product.findAll({
      where: filters,
      order: sort,
      limit: 20,
      include: models.User,
    });
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
  let rating = 0;

  const {
    name,
    pricePerDay,
    description,
    UserId,
    CategoryId,
    condition,
    numOfDaysAvailable,
  } = req.body;

  models.Product.create({
    name,
    pricePerDay,
    description,
    UserId,
    CategoryId,
    condition,
    picture,
    numOfDaysAvailable,
    rating,
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

// GET all requests of product
router.get("/:id/requests", async function (req, res) {
  const { id } = req.params;
  try {
    const borrowed = await models.Request.findAll({
      where: {
        productId: id,
      },
      include: models.Product,
    });
    res.send(borrowed);
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
    await models.Request.destroy({
      where: {
        ProductId: id,
      },
    });
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
