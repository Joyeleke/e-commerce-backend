const { productExistsInCart } = require("../db/cart");
const { getProductById } = require("../db/products");

const verifyDeleteCartItemRequest = async (req, res, next) => {
  const product_id = Number(req.body.product_id);

  if (!product_id) {
    return res.status(400).send("Missing product id in request!");
  }

  try {
    const product = await getProductById(Number(product_id));

    if (!product) {
      return res.status(404).send("Product does not exist!");
    }

    const productExists = await productExistsInCart(
      req.user.cart_id,
      product_id
    );

    if (productExists !== true) {
      return res.status(404).send("Product does not exist in cart");
    }

    req.product = { product_id };
    next();
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("Error verifying your delete cart request!");
  }
};

module.exports = verifyDeleteCartItemRequest;
