const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const { getUserByEmail } = require("../db/user");

const strategy = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
  },
  async (email, password, done) => {
    try {
      const user = await getUserByEmail(email);

      if (!user) {
        return done(null, false);
      }
      if (user.password !== password) {
        return done(null, false);
      }
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
);

passport.serializeUser(function (user, done) {
  return done(null, user.user_id);
});

passport.deserializeUser(function (user_id, done) {
  return done(null, user_id);
});

passport.use(strategy);

module.exports = passport;
