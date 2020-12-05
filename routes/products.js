var express = require("express");
var router = express.Router();
var models = require("../models");
const sequelize = require("sequelize");
const { QueryTypes, where } = require("sequelize");
const Op = sequelize.Op;
const multer = require("multer");
const { Storage } = require('@google-cloud/storage');


//GET all available products

router.get("/", async function (req, res) {
  const offset = req.query.offset ? req.query.offset : 0;
  const q = req.query.q ? req.query.q : null;
  const condition = req.query.condition ? req.query.condition : null;
  const category_id = req.query.category_id ? req.query.category_id : null;
  const distance = req.query.distance ? req.query.distance : 20000000;
  const sort_by = req.query.sort_by ? req.query.sort_by : null;
  const lat = req.query.lat ? req.query.lat : 40.41677;
  const lng = req.query.lng ? req.query.lng : -3.70379;

  let filters = {};
  let sort = [];

  // Set where condition
  if (q) filters["name"] = { [Op.like]: `%${q}%` };
  if (condition) filters["condition"] = condition;
  if (category_id) filters["categoryId"] = category_id;

  if (sort_by === "newest")
    // Set order by condition
    sort = [["createdAt", "DESC"]];
  else if (sort_by === "distance")
    sort = [
      [
        sequelize.fn(
          "ST_Distance",
          sequelize.fn(
            "Point",
            sequelize.col("User.lat"),
            sequelize.col("User.lng")
          ),
          sequelize.fn("Point", lat, lng)
        ),
        "ASC",
      ],
    ];
  else sort = [["id", "ASC"]];

  try {
    const products = await models.Product.findAll({
      where: {
        [Op.and]: [
          filters,
          sequelize.where(
            sequelize.fn(
              "ST_Distance_Sphere",
              sequelize.fn(
                "Point",
                sequelize.col("User.lat"),
                sequelize.col("User.lng")
              ),
              sequelize.fn("Point", lat, lng)
            ),
            { [Op.lt]: +distance }
          ),
        ],
      },
      order: sort,
      offset: +offset,
      limit: 9,
      include: models.User,
    });
    res.send(products);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Get one product

router.get("/:id", async function (req, res) {
  const { id } = req.params;
  try {
    const product = await models.Product.findOne({
      where: {
        id,
      },
      include: models.User,
    });
    res.send(product);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Adds a new product

const storage = new Storage({
  projectId: process.env.GCLOUD_PROJECT_ID,
  keyFilename: process.env.GCLOUD_APPLICATION_CREDENTIALS,
});

const bucket = storage.bucket(process.env.GCLOUD_STORAGE_BUCKET_URL);

// Initiating a memory storage engine to store files as Buffer objects
const uploader = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // limiting files size to 5 MB
  },
});

// Upload endpoint to send file to Firebase storage bucket
router.post('/', uploader.single('picture'), async (req, res, next) => {

  const {
    name,
    pricePerDay,
    description,
    UserId,
    CategoryId,
    condition,
    numOfDaysAvailable,
  } = req.body;


  try {
    if (!req.file) {
      res.status(400).send('Error, could not upload file');
      return;
    }

    // Create new blob in the bucket referencing the file
    const blob = bucket.file(req.file.originalname);

    // Create writable stream and specifying file mimetype
    const blobWriter = blob.createWriteStream({
      metadata: {
        contentType: req.file.mimetype,
      },
    });

    blobWriter.on('error', (err) => next(err));

    blobWriter.on('finish', () => {
      // Assembling public URL for accessing the file via HTTP
      const picture = `https://firebasestorage.googleapis.com/v0/b/${
        bucket.name
      }/o/${encodeURI(blob.name)}?alt=media`;


//save rest of information plus firebase picture url 

let rating = 0;

models.Product.create({
      name,
      pricePerDay,
      description,
      UserId,
      CategoryId,
      condition,
      picture,
      numOfDaysAvailable,
      rating,
    })
      .then((data) => res.send(data))
      .catch((error) => {
        res.status(500).send(error);
      });



  // Return the file name and its public URL
  res
  .status(200)
  .send({ fileName: req.file.originalname, fileLocation: picture });
  
});

// When there is no more data to be consumed from the stream
blobWriter.end(req.file.buffer);
} catch (error) {
res.status(400).send(`Error, could not upload file: ${error}`);
return;
}

});



//search products by name

router.get("/search/:search", async function (req, res) {
  let search = req.params.search;
  search = search.toLowerCase();

  try {
    const products = await models.Product.findAll({
      where: {
        name: {
          [Op.like]: `%${search}%`,
        },
      },
      include: models.User,
    });
    res.send(products);
  } catch (error) {
    res.status(500).send(error);
  }
});

// GET all requests of product
router.get("/:id/requests", async function (req, res) {
  const { id } = req.params;
  try {
    const borrowed = await models.Request.findAll({
      where: {
        productId: id,
      },
      include: models.Product,
    });
    res.send(borrowed);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update product

router.put("/:id", async function (req, res) {
  const { id } = req.params;

  try {
    await models.Product.update(req.body, {
      where: {
        id,
      },
    });
    res.send("Product updated");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//Delete product

router.delete("/:id", async function (req, res, next) {
  const { id } = req.params;
  try {
    await models.Request.destroy({
      where: {
        ProductId: id,
      },
    });
    await models.Product.destroy({
      where: {
        id,
      },
    });
    res.send("Product deleted");
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
