import express from "express";
import UserController from "./controllers/UserController";

const routes = express.Router();

//Rota products
routes.get("/", UserController.read);
routes.post("/auth/register", UserController.create);

export default routes;
