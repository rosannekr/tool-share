const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const models = require("../models");
const bcrypt = require("bcrypt");

// Tell passport to use a Local Strategy (login with a username/email and password)
passport.use(
  new LocalStrategy(
    // this is the function that passport runs when calling
    // passport.authenticate(), the done() function is built into
    // passport. If the user is authenticated, done() will attach
    // the user to the request object and then call the next function
    // in the login route: (req, res) => { res.send(req.user) },
    // and passing the request along with the user attached
    async (username, password, done) => {
      try {
        // When a user tries to sign in this code runs
        const dbUser = await models.User.findOne({
          where: {
            username,
          },
        });

        // If there's no user with the given username
        if (!dbUser) {
          return done(null, false, {
            message: "Incorrect username.",
          });
        }
        // Check if password is valid
        const validPassword = await bcrypt.compare(password, dbUser.password);
        // If there is a user with the given username, but the password
        // the user gives us is incorrect
        if (!validPassword) {
          return done(null, false, {
            message: "Incorrect password.",
          });
        }
        // If none of the above, call the done function
        // and pass the user
        // by calling done, it's moving to the next stage (serialize user)
        return done(null, dbUser);
      } catch (err) {
        done(err);
      }
    }
  )
);

// In order to help keep authentication state across HTTP requests,
// Sequelize needs to serialize and deserialize the user
// Just consider this part boilerplate needed to make it all work
// passport.serializeUser((user, cb) => {
//   cb(null, user);
// });

// passport.deserializeUser((obj, cb) => {
//   cb(null, obj);
// });

// The serialize function is called after the user is authenticated
// It takes a piece of information from the user record and puts it in a cookie
passport.serializeUser((user, done) => {
  // the first argument is the error (null in this case),
  // second is the id of the user that was just authenticated
  // done puts this in a cookie and sends it to the browser
  done(null, user.id);
});

// The deserialize function is called when the user is already logged in
// and makes another request
// It decodes the cookie it received from the browser which contains the user id
passport.deserializeUser(async (id, done) => {
  // find the user this id belongs to
  const user = await models.User.findByPk(id);
  // pass the user to the next stage
  // done attaches the user to req (so you can use it in the route handler)
  done(null, user);
});

// Exporting configured passport
module.exports = passport;
