const express = require("express");
const app = express();

const morgan = require("morgan");

const sessionConfig = require("./config/sessionConfig")
const passport = require("./config/passportConfig");
const appRouter = require("./routes/appRouter");

//Setting up morgan
app.use(morgan("dev"));

// Parse JSON bodies
app.use(express.json());

//Configure session
app.use(sessionConfig);

//Configure passport
app.use(passport.initialize());
app.use(passport.session());

//Import Router
app.use(appRouter);

app.get("/s", (req, res) => {
  //  if(req.isAuthenticated()){
    const user_id = req.user.user_id;
    const cart_id = req.user.cart_id;
    res.send(`Your user_id is ${user_id} and Your cart_id is ${cart_id}`);
});

const port = 3000;

app.listen(port, () => {
  console.log(`Listening on Port ${port}`);
});
