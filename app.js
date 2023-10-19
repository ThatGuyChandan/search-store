require("dotenv").config();
require("express-async-errors");

const port = process.env.PORT || 3000;
const express = require("express");
const app = express();

const connectDB = require("./database/connect");
const productsRouter = require("./routes/product");

const notFound = require("./middleware/notFound");
const errHandler = require("./middleware/errorHandler");
const { connect } = require("http2");

app.use(express.json());

//routes
app.get("/", (req, res) => {
  res.send("<h1>Store api</h1>");
});

app.use("/api/v1/products", productsRouter);

//products routes
app.use(errHandler);
app.use(notFound);

const start = async () => {
  try {
    const mongoURI = process.env.MONGO_URI; // Get the MongoDB URI from environment variables
    if (!mongoURI) {
      throw new Error("MongoDB URI is not defined in environment variables");
    }

    await connectDB(mongoURI);
    app.listen(port, console.log(`server is listening on port ${port}`));
  } catch (error) {
    console.error(error.message);
    process.exit(1); // Exit the process with an error code
  }
};

start();
