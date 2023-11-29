const loginRouter = require("express").Router();
const passport = require("../config/passportConfig");

loginRouter.post(
  "/",
  passport.authenticate("local", {
    failureRedirect: "/",
    successRedirect: "/s",
  })
);

module.exports = loginRouter;