require('dotenv').config();
const connectDB = require('./db/connect');

const dummyProducts = require('./products.json');
const Product = require('./models/product');

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);

    await Product.deleteMany();
    await Product.create(dummyProducts);

    console.log('Data populated!');
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
