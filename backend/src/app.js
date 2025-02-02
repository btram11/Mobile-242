const compression = require("compression");
const express = require("express");
const app = express();
const swaggerDocs = require("./swagger");
const cors = require("cors");

// init middlewares
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
  const morgan = require("morgan");
  app.use(morgan("dev"));
}

app.use(compression());
app.use(express.json());
app.use(cors());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// init database
require("./dbs/init.postgres");

// init swagger
swaggerDocs(app);

// init routes
app.use("/", require("./routes/index"));

// handle error
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  const statusCode = error.status || 500;
  return res.status(statusCode).json({
    status: "error",
    code: statusCode,
    message: error.message || "Internal Server Error",
  });
});

module.exports = app;
