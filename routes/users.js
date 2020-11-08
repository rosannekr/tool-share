var express = require("express");
var router = express.Router();
var models = require("../models");

var jwt = require("jsonwebtoken");
require("dotenv").config();
var bcrypt = require("bcrypt");
const saltRounds = 10;

const isLoggedIn = require("../guards/isLoggedIn");

const supersecret = process.env.SUPER_SECRET;

// LOGIN
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    // check if there is a user with provided username
    const user = await models.User.findOne({
      where: {
        username,
      },
    });

    if (user) {
      // verify password (by comparing the typed in password with hash stored in db)
      const match = await bcrypt.compare(password, user.password);

      if (match) {
        // generate token with user id as payload and secret key
        const token = jwt.sign({ userId: user.id }, supersecret);
        // send token to the user
        res.send({ message: "Login successful", token });
      } else {
        throw new Error("Incorrect password");
      }
    } else {
      // throw error if user is not in the database
      throw new Error("Invalid username");
    }
  } catch (error) {
    res.status(401).send({ message: error.message });
  }
});

// REGISTER
router.post("/register", async (req, res) => {
  const { name, username, password } = req.body;

  try {
    // check if username already exists
    const user = await models.User.findOne({
      where: {
        username,
      },
    });
    // if not, create new user
    if (!user) {
      // hash password
      const hash = await bcrypt.hash(password, saltRounds);

      const user = await models.User.create({
        name,
        username,
        password: hash,
      });
      res.send(user);
    } else {
      res.status(500).send("Username already exists");
    }
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

// GET user info
router.get("/profile", isLoggedIn, async (req, res) => {
  // grab user id from decoded payload
  const { userId } = req;

  try {
    // find user
    const user = await models.User.findOne({
      where: {
        id: userId,
      },
      include: models.Product,
    });

    res.send(user);
  } catch (error) {
    res.status(401).send({ message: error.message });
  }
});

// GET one user
router.get("/:id", isLoggedIn, async function (req, res, next) {
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
  console.log(productId);
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
