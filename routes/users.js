var express = require("express");
var router = express.Router();
var models = require("../models");
const multer = require("multer");
const { Storage } = require('@google-cloud/storage');

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
        picture: "public/pictures/dog.png",
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

// UPDATE current user's points
router.put("/points", isLoggedIn, async (req, res) => {
  // grab user id from decoded payload
  const { userId } = req;
  // get amount of points to add or subtract
  const { amount } = req.body;

  try {
    // find user
    const user = await models.User.findOne({
      where: {
        id: userId,
      },
    });
    // calculate new amount of points
    const points = user.points + amount;
    // update points in db
    await models.User.update(
      { points },
      {
        where: {
          id: userId,
        },
      }
    );
    res.send("Points updated");
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

//update profile pic

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

router.put("/:id/pic", uploader.single("picture"), function (req, res) {
  const { id } = req.params;


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

 models.User.update({
  picture: picture,
}, {
  where: {id},
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






module.exports = router;
