const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { User } = require("../models");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;


// Passport local strategy login
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


passport.serializeUser((user, cb) => {
  console.log(user);
  cb(null, user);
});

passport.deserializeUser((obj, cb) => {
  cb(null, obj);
});

// Google OAuth
passport.use(new GoogleStrategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: 'http://localhost:3001/auth/google/callback',
  userProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo',
},
function(accessToken, refreshToken, profile, cb) {
  console.log(profile);
  User.findOrCreate({where: { googleId: profile.id } , defaults: {username: profile.displayName}}).then(user => cb(null, user)).catch(err => cb(err, null))
}
));

// Facebook OAuth

passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: "http://localhost:3001/auth/facebook/callback"
},
function(accessToken, refreshToken, profile, cb) {
  console.log(profile);
  User.findOrCreate({where: { facebookId: profile.id } , defaults: {username: profile.displayName}}).then(user => cb(null, user)).catch(err => cb(err, null))
}
));


module.exports = passport;
