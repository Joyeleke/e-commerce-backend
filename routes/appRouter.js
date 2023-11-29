const appRouter = require("express").Router();
const registerRouter = require("./registerRouter");
const loginRouter = require("./loginRouter");
const productsRouter = require("./productsRouter");
const authenticatedUser = require("../middleware/authenticateUser");

appRouter.use("/register", registerRouter);
appRouter.use("/login", loginRouter);

appRouter.use(authenticatedUser);
appRouter.use("/products", productsRouter);

module.exports = appRouter;
