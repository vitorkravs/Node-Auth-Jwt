import mongoose = require("mongoose");

const { MONGODB_USER, MONGODB_PASSWORD } = process.env;

const DbConfig = `mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@cluster0.5l36xxj.mongodb.net/?retryWrites=true&w=majority`;

const dbConnection = mongoose.connect(DbConfig);

dbConnection
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
  });

export default dbConnection;
