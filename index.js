const express = require('express');
const morgan = require('morgan');
const app = express();

const port = 3000;

app.use(morgan('dev'));

// Parse JSON bodies
app.use(express.json());

app.get("/", (req, res) => {
  res.send("All good to gowew!");
});

app.listen(port, () => {
  console.log(`Listening on Port ${port}`);
});
