const jwt = require("jsonwebtoken");
require("dotenv").config();
const supersecret = process.env.SUPER_SECRET;

function isLoggedIn(req, res, next) {
  // grab token from header in request
  const token = req.headers["x-access-token"];

  if (!token) {
    res.status(401).send({ message: "Provide a token" });
  } else {
    console.log("in guard");

    // check if token is valid
    jwt.verify(token, supersecret, function (err, decoded) {
      if (err) {
        res.status(401).send(err.message);
      } else {
        // get user id from decoded pay load and attach to req
        req.userId = decoded.userId;
        next();
      }
    });
  }
}

module.exports = isLoggedIn;
