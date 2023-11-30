const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const { getUserByEmail } = require("../db/user");
const { getUserCartId } = require("../db/cart");

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

passport.deserializeUser( async function (user_id, done) {
  try {
    const cart_id = await getUserCartId(user_id);
    
    if(!cart_id){
      throw new Error(`User cart was never created: ${error.message}`)
    }
    return done(null, {user_id, cart_id});
  } catch (error) {
    console.log(error.message);
    return done(error);
  }
});

passport.use(strategy);

module.exports = passport;
