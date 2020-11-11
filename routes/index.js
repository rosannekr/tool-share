var express = require("express");
var router = express.Router();
var models = require("../models");
const { Op } = require("sequelize");

const isLoggedIn = require("../guards/isLoggedIn");

// GET all requests (to borrow a product)
// get all the entries in borrowedproducts where this user is the owner of the product
router.get("/requests", isLoggedIn, async function (req, res) {
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
      result = await models.BorrowedProduct.findAll({
        where: { productId: { [Op.in]: productIds } },
      });
    }
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

// DELETE a request
router.delete("/requests/:id", async function (req, res) {
  const { id } = req.params;

  try {
    await models.BorrowedProduct.destroy({
      where: {
        id,
      },
    });
    res.send("Request deleted");
  } catch (error) {
    console.log(error);
  }
});

// UPDATE confirmed status of request
router.put("/requests/:id", async function (req, res) {
  const { id } = req.params;
  const { status } = req.body;

  console.log(id, status);

  try {
    // delete user
    await models.BorrowedProduct.update(
      { confirmed: status },
      {
        where: {
          id,
        },
      }
    );
    res.send("Request updated");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
