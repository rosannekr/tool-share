var express = require("express");
var router = express.Router();
var models = require("../models");

/* GET all users */
router.get("/", async function (req, res, next) {
  try {
    const users = await models.User.findAll();
    res.send(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

/* GET one user */
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

/* GET all products that belong to a user */
router.get("/:id/products", async function (req, res, next) {
  const { id } = req.params;
  try {
    const user = await models.User.findOne({
      where: {
        id,
      },
    });

    const products = await user.getProducts();

    res.send(products);
  } catch (error) {
    res.status(500).send(error);
  }
});

// TODO
/* GET all products a user has borrowed */
router.get("/:id/borrowedproducts", async function (req, res, next) {
  const { id } = req.params;
  try {
    res.send();
  } catch (error) {
    res.status(500).send(error);
  }
});

/* ADD a new user */
router.post("/", async function (req, res, next) {
  const { name, username, password } = req.body;
  try {
    const user = await models.User.create({
      name,
      username,
      password,
    });
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

/* UPDATE a user */
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

/* DELETE a user */
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

module.exports = router;
