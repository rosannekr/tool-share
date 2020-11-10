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

// GET current user
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

// GET all products a user owns
router.get("/products", isLoggedIn, async (req, res) => {
  // grab user id from decoded payload
  const { userId } = req;

  try {
    const user = await models.User.findOne({
      where: {
        id: userId,
      },
      include: models.Product,
    });
    res.send(user.Products);
  } catch (error) {
    res.status(500).send(error);
  }
});

// UPDATE current user
router.put("/profile", isLoggedIn, async (req, res) => {
  // grab user id from decoded payload
  const { userId } = req;

  try {
    await models.User.update(req.body, {
      where: {
        id: userId,
      },
    });
    res.send("User updated");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// GET all products a user has borrowed
router.get("/borrowed", isLoggedIn, async (req, res) => {
  // grab user id from decoded payload
  const { userId } = req;

  try {
    const user = await models.User.findOne({
      where: {
        id: userId,
      },
      include: ["Borrowed"],
    });
    res.send(user.Borrowed);
  } catch (error) {
    res.status(500).send(error);
  }
});

// TODO put guard back
// ADD to borrowed products
router.post("/borrowed", async (req, res) => {
  // grab user id from decoded payload
  // const { userId } = req;

  const { userId, productId, startDate, endDate } = req.body;

  try {
    // get the user
    const user = await models.User.findOne({
      where: {
        id: userId,
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
    // await user.addBorrowed(product, { startDate, endDate });

    // const result = await models.BorrowedProducts.create({
    //   userId,
    //   productId,
    //   startDate,
    //   endDate,
    // });

    res.send("Product added");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// GET all users
router.get("/", async (req, res) => {
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
      include: models.Product,
    });
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

// UPDATE a user
router.put("/:id", async (req, res) => {
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
router.delete("/", isLoggedIn, async (req, res) => {
  // grab user id from decoded payload
  const { userId } = req;
  try {
    // delete products this user owns
    await models.Product.destroy({
      where: {
        UserId: userId,
      },
    });
    // delete user
    await models.User.destroy({
      where: {
        id: userId,
      },
    });
    res.send("User deleted");
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
