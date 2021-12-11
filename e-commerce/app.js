require('dotenv').config();

// express
const express = require('express');
const app = express();

// database
const connectDB = require('./db/connect');

const PORT = process.env.PORT || 5000;
const start = async () => {
  try {
    const conn = await connectDB(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);

    app.listen(PORT, console.log(`Server is running on port ${PORT}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
