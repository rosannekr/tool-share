var express = require("express");
var router = express.Router();
var models = require("../models");

const isLoggedIn = require("../guards/isLoggedIn");

// GET all products a user has borrowed
router.get("/borrowed/:userId", isLoggedIn, async (req, res) => {
  // grab user id from decoded payload
  const { userId } = req.params;

  try {
    const requests = await models.Request.findAll({
      where: {
        UserId: userId,
      },
    });
    const productIds = requests.map((request) => request.ProductId);

    const products = await models.Product.findAll({
      where: {
        id: productIds,
      },
    });

    res.send(products);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
