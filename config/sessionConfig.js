const session = require("express-session");

const sessionConfig = session({
  secret: "quqwuqyq",
  cookie: {
    maxAge: 1000 * 60 * 24,
    sameSite: "none",
    secure: false,
  },
  saveUninitialized: false,
  resave: false,
});

module.exports = sessionConfig;
