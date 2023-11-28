const appRouter = require("express").Router();
const registerRouter = require("./registerRouter")


appRouter.use("/register", registerRouter);

module.exports = appRouter;
