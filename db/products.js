const db = require("./index");

const getAllProducts = async () => {
  const query = {
    text: "SELECT * FROM products",
  };

  try {
    const result = await db.query(query);
    return result.rows;
  } catch (error) {
    throw new Error(`Error getting all products: ${error.message}`);
  }
};

const getProductById = async (product_id) => {
  const query = {
    text: "SELECT * FROM products where product_id = $1",
    values: [product_id],
  };

  try {
    const result = await db.query(query);
    return result.rows[0];
  } catch (error) {
    throw new Error(`Error getting products: ${error.message}`);
  }
};

module.exports = {
  getAllProducts,
  getProductById,
};
