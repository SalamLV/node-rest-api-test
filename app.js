require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const receiptModel = require("./src/models/receiptModel");
const receiptRouter = require("./src/routers/receiptRouter")(receiptModel);
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger/swagger-output.json");

const app = express();
const port = process.env.PORT || 3100;
const dbName = process.env.DBNAME;
const dbConnectionString = process.env.MONGODB_CONN;

mongoose
  .connect(dbConnectionString, { dbName: dbName })
  .then((conn) => console.log("Successfully connected to DB"))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });

// App configs
app.use(express.json());
app.use(morgan("tiny"));
app.use("/api", receiptRouter);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.server = app.listen(port, () => {
  console.log(`Server started on ${port}`);
});

module.exports = app;
