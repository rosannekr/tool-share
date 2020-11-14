var express = require("express");
var router = express.Router();
var models = require("../models");

const isLoggedIn = require("../guards/isLoggedIn");

// GET all products a user has borrowed
router.get("/borrowed", isLoggedIn, async (req, res) => {
  // grab user id from decoded payload
  const { userId } = req;

  try {
    const requests = await models.Request.findAll({
      where: {
        UserId: userId,
      },
      include: models.Product,
    });

    res.send(requests);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
