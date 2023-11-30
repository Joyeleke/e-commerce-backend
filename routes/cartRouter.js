const cartRouter = require("express").Router();
const verifyNewCartItemRequest = require("../middleware/verifyNewCartItemRequest");
const verifyUpdateCartItemRequest = require("../middleware/verifyUpdateCartItemRequest");
const verifyDeleteCartItemRequest = require("../middleware/verifyDeleteCartRequest");
const verifyPlaceOrderRequest = require("../middleware/verifyPlaceOrderRequest");
const { placeOrder } = require("../db/order");
const {
  addProductToCart,
  getProductsFromCart,
  updateProductInCart,
  deleteProductFromCart,
  deleteAllProductsFromCart,
} = require("../db/cart");

cartRouter.post("/cartitems", verifyNewCartItemRequest, async (req, res) => {
  const productToAdd = req.product;
  const cart_id = Number(req.user.cart_id);

  try {
    await addProductToCart(
      cart_id,
      productToAdd.product_id,
      productToAdd.quantity
    );
    res.status(200).send("Item Successfully Added");
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("Internal server error!");
  }
});

cartRouter.get("/", async (req, res) => {
  const cart_id = Number(req.user.cart_id);
  try {
    const allCartItems = await getProductsFromCart(cart_id);
    res.send(allCartItems);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("Internal server error!");
  }
});

cartRouter.put("/", verifyUpdateCartItemRequest, async (req, res) => {
  const productToAdd = req.product;
  const cart_id = Number(req.user.cart_id);

  try {
    await updateProductInCart(
      cart_id,
      productToAdd.product_id,
      productToAdd.quantity
    );
    res.status(200).send("Item Successfully Updated");
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("Internal server error!");
  }
});

cartRouter.delete(
  "/cartitems",
  verifyDeleteCartItemRequest,
  async (req, res) => {
    const productToDelete = req.product;
    const cart_id = Number(req.user.cart_id);

    try {
      await deleteProductFromCart(cart_id, productToDelete.product_id);
      res.status(200).send("Item Successfully Deleted");
    } catch (error) {
      console.log(error.message);
      return res.status(500).send("Internal server error!");
    }
  }
);

cartRouter.post("/checkout", verifyPlaceOrderRequest, async (req, res) => {
  const cart_id = Number(req.user.cart_id);
  const user_id = Number(req.user.user_id);

  try {
    await placeOrder(cart_id, user_id);
    res.status(200).send("Order Placed!");
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("Internal server error!");
  }
});

cartRouter.delete("/", async (req, res) => {
  const cart_id = Number(req.user.cart_id);

  try {
    deleteAllProductsFromCart(cart_id);
    res.status(200).send("Cart has been cleared!");
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("Internal server error!");
  }
});

module.exports = cartRouter;
