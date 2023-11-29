const productsRouter = require("express").Router();
const { getAllProducts, getProductById } = require("../db/products");

productsRouter.param("productId", async (req, res, next, id) => {
  const productId = Number(id);

  try {
    const product = await getProductById(productId);
    if (!product) {
      return res.status(404).send("Product not found!");
    }
    req.product = product;
    next();
  } catch (error) {
    return res.status(500).send("Internal server error!");
  }
});

productsRouter.get("/", async (req, res) => {
  try {
    const products = await getAllProducts();
    return res.send(products);
  } catch (error) {
    return res.send(500).status("Internal status error here!");
  }
});

productsRouter.get("/:productId", async (req, res) => {
  res.send(req.product);
});

module.exports = productsRouter;
