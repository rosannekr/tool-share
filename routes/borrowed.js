var express = require("express");
var router = express.Router();
var models = require("../models");

const isLoggedIn = require("../guards/isLoggedIn");

// GET all borrowed products
router.get("/", async function (req, res) {
  try {
    const borrowed = await models.BorrowedProduct.findAll();
    res.send(borrowed);
  } catch (error) {
    res.status(500).send(error);
  }
});

// GET all reservations of product
router.get("/:id", async function (req, res) {
  const { id } = req.params;
  try {
    const borrowed = await models.BorrowedProduct.findAll({
      where: {
        ProductId: id,
      },
      include: models.Product,
    });
    res.send(borrowed);
  } catch (error) {
    res.status(500).send(error);
  }
});

// ADD to borrowed products
router.post("/", isLoggedIn, async (req, res) => {
  // grab user id from decoded payload
  const { userId } = req;

  const { productId, startDate, endDate } = req.body;

  try {
    // get the user
    const user = await models.User.findOne({
      where: {
        id: userId,
      },
    });

    // add borrowed product to user
    await user.addBorrowed(productId, {
      through: {
        startDate,
        endDate,
      },
    });

    res.send("Product added");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//return product

router.delete("/:productId", async function (req, res, next) {
  const { productId } = req.params;
  try {
    await models.BorrowedProduct.destroy({
      where: {
        productId,
      },
    });
    res.send("Product deleted");
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
