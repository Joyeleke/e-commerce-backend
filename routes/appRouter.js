const appRouter = require("express").Router();
const registerRouter = require("./registerRouter");
const loginRouter = require("./loginRouter");
const productsRouter = require("./productsRouter");
const userRouter = require("./userRouter");
const cartRouter = require("./cartRouter");
const ordersRouter = require("./ordersRouter");
const authenticatedUser = require("../middleware/authenticateUser");

appRouter.use("/register", registerRouter);
appRouter.use("/login", loginRouter);

appRouter.use(authenticatedUser);
appRouter.use("/products", productsRouter);
appRouter.use("/user", userRouter);
appRouter.use("/cart", cartRouter);
appRouter.use("/orders", ordersRouter);

module.exports = appRouter;
