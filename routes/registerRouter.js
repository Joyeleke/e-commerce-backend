const registerRouter = require("express").Router();
const VerifyNewUserRequest = require("../middleware/verifyNewUserRequest")
const { createUser } = require("../db/user");


registerRouter.post("/", VerifyNewUserRequest, async (req, res) => {
  const { email, password } = req.body;

  try {
    const createdEmail = await createUser(email, password);
    return res.send(createdEmail);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("Error during registration");
  }
});

module.exports = registerRouter;
