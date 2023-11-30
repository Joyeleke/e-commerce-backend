const { createUserCart } = require("./cart");
const db = require("./index");

const createUser = async (email, password) => {
  const query = {
    text: "INSERT INTO users(email, password) VALUES($1, $2) RETURNING *",
    values: [email, password],
  };

  try {
    const result = await db.query(query);
    await createUserCart(result.rows[0].user_id);
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

const getUserById = async (id) => {
  const query = {
    text: "SELECT * FROM users WHERE user_id = $1",
    values: [id],
  };

  try {
    const result = await db.query(query);
    return result.rows[0];
  } catch (error) {
    throw new Error(`Error getting user by id: ${error.message}`);
  }
};

const getExistingEmail = async (email) => {
  const query = {
    text: "SELECT email FROM users WHERE email = $1",
    values: [email],
  };

  try {
    const result = await db.query(query);
    return result.rows[0];
  } catch (error) {
    throw new Error(`Error getting user by email: ${error.message}`);
  }
};

const updateUserEmail = async (email, id) => {
  const query = {
    text: "UPDATE users SET email = $1 WHERE user_id = $2 RETURNING email",
    values: [email, id],
  };

  try {
    const result = await db.query(query);
    return result.rows[0];
  } catch (error) {
    throw new Error(`Error getting user by email: ${error.message}`);
  }
};

const updateUserPassword = async (password, id) => {
  const query = {
    text: "UPDATE users SET password = $1 WHERE user_id = $2 RETURNING user_id",
    values: [password, id],
  };

  try {
    const result = await db.query(query);

    if (result.rows[0].user_id == id) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    throw new Error(`Error getting user by id: ${error.message}`);
  }
};

module.exports = {
  createUser,
  getUserByEmail,
  getUserById,
  getExistingEmail,
  updateUserEmail,
  updateUserPassword
};
