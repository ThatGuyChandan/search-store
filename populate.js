require("dotenv").config();

const connectDb = require("./database/connect");
const Product = require("./models/products");

const jsonProducts = require("./product.json");

const start = async () => {
  try {
    await connectDb(process.env.MONGO_URI);
    await Product.deleteMany();
    await Product.create(jsonProducts);
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
start();
