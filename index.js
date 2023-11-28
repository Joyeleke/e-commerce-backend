const morgan = require('morgan');
const express = require('express');
const app = express();

const port = 3000;

//Setting up morgan
app.use(morgan('dev'));

// Parse JSON bodies
app.use(express.json());

//Import Router
const appRouter = require('./routes/appRouter');
app.use(appRouter);



app.listen(port, () => {
  console.log(`Listening on Port ${port}`);
});
