require("dotenv").config();
import express from "express";
import jwt from "jsonwebtoken";

import "./config/DbConfig";
import routes from "./routes";

const app = express();
const PORT = 3333;

//Config JSON response
app.use(express.json());

app.use(routes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
