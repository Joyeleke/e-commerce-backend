const appRouter = require("express").Router();
const registerRouter = require("./registerRouter");
const loginRouter = require("./loginRouter");
const productsRouter = require("./productsRouter");
const userRouter = require("./userRouter");
const authenticatedUser = require("../middleware/authenticateUser");

appRouter.use("/register", registerRouter);
appRouter.use("/login", loginRouter);

appRouter.use(authenticatedUser);
appRouter.use("/products", productsRouter);
appRouter.use("/user", userRouter);

module.exports = appRouter;
