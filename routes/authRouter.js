const authRouter = require("express").Router();
const bcrypt = require("bcrypt");

const VerifyNewUserRequest = require("../middleware/verifyNewUserRequest");
const passport = require("../config/passportConfig");
const { createUser } = require("../db/user");

// Change login path later on
authRouter.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/",
    successRedirect: "/welcome",
  })
);

authRouter.post("/register", VerifyNewUserRequest, async (req, res) => {
  const { email, password } = req.body;

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    const createdEmail = await createUser(email, hashedPassword);
    return res.send(createdEmail);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("Error during user registration");
  }
});

module.exports = authRouter;
