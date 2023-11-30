const { cartNotEmpty } = require("../db/cart");

const verifyPlaceOrderRequest = async (req, res, next) => {
  try {
    const cartExists = await cartNotEmpty(Number(req.user.cart_id));

    if (!cartExists) {
      return res.status(400).send("Empty Cart!");
    }
    next();
  } catch (error) {
    console.log(error.message);
    throw new Error(`Error verifying order request: ${error.message}`);
  }
};

module.exports = verifyPlaceOrderRequest;
