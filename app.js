require('dotenv').config();
require('express-async-errors');
const express = require('express');

const connectDB = require('./db/connect');
const productsRouter = require('./routes/products');
const notFoundMiddleware = require('./middlewares/not-found');
const errorMiddleware = require('./middlewares/error-handler');

const app = express();

// middleware
app.use(express.json());

// root
app.get('/', (req, res) => {
  res.send('<h1>Store API</h1><a href="/api/v1/products">/api/v1/products</a>');
});

app.use('/api/v1/products', productsRouter);

// products route

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, console.log(`Server is listening on port ${PORT} ...`));
  } catch (error) {
    console.log(error);
  }
};

start();
