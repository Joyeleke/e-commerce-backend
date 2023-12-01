const { getOrderById } = require("../db/order");

const verifyGetOrderByIdRequest = async (req, res, next) => {
  const { order_id } = req.body;

  if (!order_id) {
    return res.status(400).send("Missing cart id in request!");
  }

  try {
    const order = await getOrderById(order_id);

    if (!order) {
      return res.status(404).send("No order found!");
    }

    req.order = order;
    next();
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("Error verifying your order request");
  }
};

module.exports = verifyGetOrderByIdRequest;
