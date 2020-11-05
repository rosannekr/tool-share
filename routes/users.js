var express = require("express");
var router = express.Router();
var models = require("../models");

/* GET all users */
router.get("/", async function (req, res, next) {
  try {
    const users = await models.Users.findAll();
    res.send(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

/* GET one user */
router.get("/:id", async function (req, res, next) {
  const { id } = req.params;
  try {
    const user = await models.Users.findOne({
      where: {
        id,
      },
    });
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

/* ADD a new user */
router.post("/", async function (req, res, next) {
  const { name, username, password } = req.body;
  try {
    const user = await models.Users.create({
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
router.put("/", async function (req, res, next) {});

/* DELETE a user */
router.delete("/:id", async function (req, res, next) {
  const { id } = req.params;
  try {
    await models.Users.destroy({
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
