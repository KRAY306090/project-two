const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { User } = require("../models");

passport.use(
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      passReqtoCallBack: true,
    },

    async function (username, password, done) {
      let user = await User.findOne({
        where: {
          username: username,
        },
      });

      let verify;
      if (user != null) {
          console.log(user);
        verify = await user.checkPassword(password);
      }

      if (!user) {
        return done(null, false, { message: "Incorrect username!" });
      } else if (!verify) {
        return done(null, false, { message: "Incorrect password!" });
      }
      return done(null, user);
    }
  )
);


passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

module.exports = passport;
