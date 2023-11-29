const appRouter = require("express").Router();
const registerRouter = require("./registerRouter");
const loginRouter = require("./loginRouter");

appRouter.use("/register", registerRouter);
appRouter.use("/login", loginRouter);

module.exports = appRouter;
