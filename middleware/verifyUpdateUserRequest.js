const { getExistingEmail } = require("../db/user");

const verifyUpdateUserEmailRequest = async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).send("Missing email in request!");
  }

  try {
    const existingEmail = await getExistingEmail(email);

    if (existingEmail) {
      return res.status(409).send("Email already exists");
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("Error checking email existence!");
  }

  next();
};

const verifyUpdateUserPasswordRequest = (req, res, next) => {
  const { password } = req.body;

  if (!password) {
    return res.status(400).send("Missing password in request!");
  }

  next();
};

module.exports = {
  verifyUpdateUserEmailRequest,
  verifyUpdateUserPasswordRequest,
};
