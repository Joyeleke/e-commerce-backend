const db = require("./index");

const createUserCart = async (userId) => {
  const user_id = Number(userId);

  const query = {
    text: "INSERT INTO cart(user_id) VALUES($1)",
    values: [user_id],
  };

  try {
    await db.query(query);
    return;
  } catch (error) {
    throw new Error(`Error creating user cart: ${error.message}`);
  }
};

const getUserCartId = async (user_id) => {
  const query = {
    text: "SELECT cart_id FROM cart WHERE user_id = $1",
    values: [user_id],
  };

  try {
    const result = await db.query(query);
    return result.rows[0].cart_id;
  } catch (error) {
    throw new Error(`Error getting user cart: ${error.message}`);
  }
};

const getProductsFromCart = async (cart_id) => {
  const query = {
    text: "SELECT p.name, p.price, p.description, ci.quantity FROM cartitems as ci JOIN products as p ON p.product_id = ci.product_id WHERE ci.cart_id = $1",
    values: [cart_id],
  };

  try {
    const result = await db.query(query);
    return result.rows;
  } catch (error) {
    throw new Error(`Error getting user cart: ${error.message}`);
  }
};

const productExistsInCart = async (cart_id, product_id) => {
  const query = {
    text: "SELECT p.product_id FROM cartitems as ci JOIN cart as c ON c.cart_id = ci.cart_id JOIN products as p ON p.product_id = ci.product_id WHERE c.cart_id = $1 AND p.product_id = $2",
    values: [cart_id, product_id],
  };

  try {
    const result = await db.query(query);
    if (result.rows[0]) {
      return true;
    }
  } catch (error) {
    throw new Error(
      `Error checking product existence in cart: ${error.message}`
    );
  }
};

const addProductToCart = async (cart_id, product_id, quantity) => {
  const query = {
    text: "INSERT INTO cartitems(cart_id, product_id, quantity) VALUES($1, $2, $3)",
    values: [cart_id, product_id, quantity],
  };

  try {
    await db.query(query);
    return;
  } catch (error) {
    throw new Error(`Error adding item to cart: ${error.message}`);
  }
};

const updateProductInCart = async (cart_id, product_id, quantity) => {
  const query = {
    text: "UPDATE cartitems SET quantity = $1 WHERE product_id = $2 AND cart_id = $3",
    values: [quantity, product_id, cart_id],
  };

  try {
    await db.query(query);
    return;
  } catch (error) {
    throw new Error(`Error adding item to cart: ${error.message}`);
  }
};

const deleteProductFromCart = async (cart_id, product_id) => {
  const query = {
    text: "DELETE FROM cartitems WHERE product_id = $1 AND cart_id = $2",
    values: [product_id, cart_id],
  };

  try {
    await db.query(query);
    return;
  } catch (error) {
    throw new Error(`Error deleting item to cart: ${error.message}`);
  }
};

const deleteAllProductsFromCart = async (cart_id) => {
  const query = {
    text: "DELETE FROM cartitems WHERE cart_id = $1",
    values: [cart_id],
  };

  try {
    await db.query(query);
    return;
  } catch (error) {
    throw new Error(`Error deleting all items from cart: ${error.message}`);
  }
};

const cartNotEmpty = async (cart_id) => {
  const query = {
    text: "SELECT EXISTS (SELECT 1 FROM cartitems WHERE cart_id = $1)",
    values: [cart_id],
  };

  try {
    const result = await db.query(query);
    return result.rows[0].exists; 
  } catch (error) {
    throw new Error(`Error checking cart status: ${error.message}`);
  }
};

module.exports = {
  createUserCart,
  getUserCartId,
  getProductsFromCart,
  productExistsInCart,
  addProductToCart,
  updateProductInCart,
  deleteProductFromCart,
  deleteAllProductsFromCart,
  cartNotEmpty
};
