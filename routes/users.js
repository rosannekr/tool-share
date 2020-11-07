var express = require("express");
var router = express.Router();
var models = require("../models");

// Import functions for password encryption
var bcrypt = require("bcrypt");
const saltRounds = 10;

// Import Passport configuration
const passport = require("../config/passport");

// LOGIN
// Using the passport.authenticate middleware with our local strategy.
// passport.authenticate() is a middle ware provided by passport
// and is configured (in config/passport.js)
router.post("/login", passport.authenticate("local"), (req, res) => {
  // If this function gets called, authentication was successful.
  // `req.user` contains the authenticated user.
  res.send(req.user);
});

// REGISTER
router.post("/register", async (req, res) => {
  const { name, username, password } = req.body;

  // hash password
  const hash = await bcrypt.hash(password, saltRounds);

  try {
    const user = await models.User.create({
      name,
      username,
      password: hash,
    });
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

// GET all users
router.get("/", async function (req, res, next) {
  try {
    const users = await models.User.findAll();
    res.send(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

// GET one user
router.get("/:id", async function (req, res, next) {
  const { id } = req.params;
  try {
    const user = await models.User.findOne({
      where: {
        id,
      },
    });
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

// UPDATE a user
router.put("/:id", async function (req, res, next) {
  const { id } = req.params;
  try {
    await models.User.update(req.body, {
      where: {
        id,
      },
    });
    res.send("User updated");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// DELETE a user
router.delete("/:id", async function (req, res, next) {
  const { id } = req.params;
  try {
    await models.User.destroy({
      where: {
        id,
      },
    });
    res.send("User deleted");
  } catch (error) {
    res.status(500).send(error);
  }
});

// GET all products a user owns
router.get("/:id/products", async function (req, res, next) {
  const { id } = req.params;
  try {
    const user = await models.User.findOne({
      where: {
        id,
      },
      include: models.Product,
    });
    res.send(user.Products);
  } catch (error) {
    res.status(500).send(error);
  }
});

// GET all products a user has borrowed
router.get("/:id/borrowed", async function (req, res, next) {
  const { id } = req.params;
  try {
    const user = await models.User.findOne({
      where: {
        id,
      },
      include: ["Borrowed"],
    });
    res.send(user.Borrowed);
  } catch (error) {
    res.status(500).send(error);
  }
});

// ADD to borrowed products
router.post("/:id/borrowed", async function (req, res, next) {
  const { id } = req.params;
  const { productId } = req.body;

  try {
    // get the user
    const user = await models.User.findOne({
      where: {
        id,
      },
    });
    // get the product
    const product = await models.Product.findOne({
      where: {
        id: productId,
      },
    });
    // add borrowed product to user
    await user.addBorrowed(product);

    res.send("Product added");
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
