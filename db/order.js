const db = require("./index");
const { deleteAllProductsFromCart } = require("./cart");

const createNewOrder = async (user_id) => {
  const query = {
    text: "INSERT INTO orders(user_id) VALUES($1) RETURNING order_id",
    values: [Number(user_id)],
  };

  try {
    const result = await db.query(query);
    return result.rows[0].order_id;
  } catch (error) {
    throw new Error(`Error creating order_id: ${error.message}`);
  }
};

const addCartItemsToOrder = async (cart_id, order_id) => {
  const query = {
    text: "WITH currentCartItems AS ( SELECT ci.product_id, ci.quantity FROM cart AS c JOIN cartitems AS ci ON c.cart_id = ci.cart_id WHERE c.cart_id = $1) INSERT INTO orderitems (order_id, product_id, quantity) SELECT $2, product_id, quantity FROM currentCartItems",
    values: [Number(cart_id), Number(order_id)],
  };

  try {
    await db.query(query);
    return;
  } catch (error) {
    throw new Error(`Error moving cart items to order: ${error.message}`);
  }
};

const rollbackOrder = async (userId) => {
  const query = {
    text: "DELETE FROM orders WHERE user_id = $1",
    values: [userId],
  };

  try {
    await db.query(query);
  } catch (error) {
    throw new Error(`Error rolling back order: ${error.message}`);
  }
};

const placeOrder = async (cart_id, user_id) => {
  let orderCreated = false;

  try {
    const order_id = await createNewOrder(user_id);
    orderCreated = true;
    await addCartItemsToOrder(cart_id, order_id);
    await deleteAllProductsFromCart(cart_id);
    return;
  } catch (error) {
    if (orderCreated) {
      try {
        await rollbackOrder(user_id);
      } catch (rollbackError) {
        throw new Error(
          `Error rolling back order creation: ${rollbackError.message}`
        );
      }
    }
    throw new Error(`Error creating placing order: ${error.message}`);
  }
};

const getAllOrders = async (user_id) => {
  const query = {
    text: "SELECT p.name, p.price, p.description, oi.quantity FROM orderitems as oi JOIN orders as o ON o.order_id = oi.order_id JOIN products as p ON oi.product_id = p.product_id WHERE o.user_id = $1",
    values: [user_id],
  };

  try {
    const result = await db.query(query);
    return result.rows;
  } catch (error) {
    console.log(error.message);
    throw new Error(`Error getting all orders: ${error.message}`);
  }
};

const getOrderById = async (order_id) => {
  const query = {
    text: "SELECT p.name, p.price, p.description, oi.quantity FROM orderitems as oi JOIN products as p ON oi.product_id = p.product_id WHERE oi.order_id = $1",
    values: [order_id],
  };

  try {
    const result = await db.query(query);
    return result.rows[0];
  } catch (error) {
    console.log(error.message);
    throw new Error(`Error getting order by id: ${error.message}`);
  }
};

module.exports = {
  placeOrder,
  getAllOrders,
  getOrderById,
};
