const appRouter = require("express").Router();

const authRouter = require("./authRouter");
const productsRouter = require("./productsRouter");
const userRouter = require("./userRouter");
const cartRouter = require("./cartRouter");
const ordersRouter = require("./ordersRouter");

const authenticatedUser = require("../middleware/authenticateUser");

appRouter.use("/auth", authRouter);
appRouter.use(authenticatedUser);

appRouter.get("/welcome", (req, res) => {
    res.status(200).send("Welcome home user!");
});

appRouter.use("/products", productsRouter);
appRouter.use("/user", userRouter);
appRouter.use("/cart", cartRouter);
appRouter.use("/orders", ordersRouter);

module.exports = appRouter;
