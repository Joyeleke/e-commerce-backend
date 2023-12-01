const { getUserByEmail } = require("../db/user");

const VerifyNewUserRequest = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send("Empty email or password in payload!");
  }

  try {
    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return res.status(409).send("User already exists");
    }
  } catch (error) {
    return res.status(500).send("Error checking user existence");
  }

  next();
};

module.exports = VerifyNewUserRequest;
