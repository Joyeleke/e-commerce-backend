const db = require("./index");
const { deleteAllProductsFromCart } = require("./cart");

const createNewOrder = async (user_id) => {
  const query = {
    text: "INSERT INTO orders(user_id) VALUES($1)",
    values: [Number(user_id)],
  };

  try {
    await db.query(query);
    return;
  } catch (error) {
    throw new Error(`Error creating order_id: ${error.message}`);
  }
};

const addCartItemsToOrder = async (cart_id) => {
  const query = {
    text: "INSERT INTO orderitems(order_id, product_id, quantity) SELECT o.order_id, ci.product_id, ci.quantity FROM orders as o JOIN cart as c ON c.user_id = o.user_id JOIN cartitems as ci ON c.cart_id = ci.cart_id WHERE c.cart_id = $1",
    values: [Number(cart_id)],
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
    await createNewOrder(user_id);
    orderCreated = true;
    await addCartItemsToOrder(cart_id);
    await deleteAllProductsFromCart(cart_id);
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

module.exports = {
  placeOrder,
};
