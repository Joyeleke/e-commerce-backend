const registerRouter = require("express").Router();
const VerifyNewUserRequest = require("../middleware/verifynewuserrequest")
const { createUser } = require("../db/user");


registerRouter.post("/", VerifyNewUserRequest, async (req, res) => {
  const { email, password } = req.body;

  try {
    const createdEmail = await createUser(email, password);

    return res.send(createdEmail);
  } catch (error) {
    return res.status(500).send("Error during registration");
  }
});

module.exports = registerRouter;
