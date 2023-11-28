const db = require("./index");

const createUser = async (email, password) => {
  const query = {
    text: "INSERT INTO users(email, password) VALUES($1, $2) RETURNING email",
    values: [email, password],
  };

  try {
    const result = await db.query(query);
    return result.rows[0].email;
  } catch (error) {
    throw new Error(`Error creating user: ${error.message}`);
  }
};

const getUserByEmail = async (email) => {
  const query = {
    text: "SELECT * FROM users WHERE email = $1",
    values: [email],
  };

  try {
    const result = await db.query(query);
    return result.rows[0];
  } catch (error) {
    throw new Error(`Error getting user by email: ${error.message}`);
  }
};

module.exports = {
  createUser,
  getUserByEmail,
};
