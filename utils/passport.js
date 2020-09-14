const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { User } = require("../models");
const GoogleStrategy = require('passport-google-oauth20').Strategy;

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

// Google OAuth
passport.use(new GoogleStrategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: 'http://localhost:3001/auth/google/recipe',
  userProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo',
},
function(accessToken, refreshToken, profile, cb) {
  console.log(profile);
  User.findOrCreate({ googleId: profile.id }, function (err, user) {
    return cb(err, user);
  });
}
));



module.exports = passport;
