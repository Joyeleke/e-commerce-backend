const ordersRouter = require("express").Router();
const { getAllOrders } = require("../db/order");
const verifyGetOrderByIdRequest = require("../middleware/verifyGetOrderByIdRequest");

ordersRouter.get("/", async (req, res) => {
  const user_id = Number(req.user.user_id);

  try {
    const allOrders = await getAllOrders(user_id);
    return res.status(200).send(allOrders);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("Error getting all orders");
  }
});

ordersRouter.get("/:orderId", verifyGetOrderByIdRequest, async (req, res) => {
  const order = req.order;
  return res.status(200).send(order);
});

module.exports = ordersRouter;
