var express = require("express");
var router = express.Router();
var models = require("../models");

const isLoggedIn = require("../guards/isLoggedIn");

// GET all requests (to borrow a product) where this user is the owner of the product
router.get("/", isLoggedIn, async function (req, res) {
  const { userId } = req;

  try {
    // grab ids of products this user owns
    let result = await models.Product.findAll({
      attributes: ["id"],
      where: { userId },
    });

    if (result.length) {
      // transform results into array of ids
      const productIds = result.map((e) => e.id);

      // grab entries in borrowedproducts table with those product ids
      result = await models.Request.findAll({
        where: { productId: productIds },
      });
    }
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

// GET one request
router.get("/:id", async function (req, res) {
  const { id } = req.params;

  try {
    const request = await models.Request.findOne({
      where: {
        id,
      },
      include: models.User,
    });
    res.send(request);
  } catch (error) {
    res.status(500).send(error);
  }
});

// ADD to requests
router.post("/", isLoggedIn, async (req, res) => {
  // grab user id from decoded payload
  const { userId } = req;

  const { productId, startDate, endDate } = req.body;

  try {
    models.Request.create({
      UserId: userId,
      ProductId: productId,
      startDate,
      endDate,
    });

    res.send("Request added");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// DELETE a request
router.delete("/:id", async function (req, res) {
  const { id } = req.params;

  try {
    await models.Request.destroy({
      where: {
        id,
      },
    });
    res.send("Request deleted");
  } catch (error) {
    res.status(500).send(error);
  }
});

// UPDATE confirmed status of request
router.put("/:id", async function (req, res) {
  const { id } = req.params;

  try {
    await models.Request.update(req.body, {
      where: {
        id,
      },
    });
    res.send("Request updated");
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
