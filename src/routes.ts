import express from "express";
import UserController from "./controllers/UserController";

const routes = express.Router();

//Rota products
routes.get("/", UserController.read);
routes.post("/auth/register", UserController.create);
routes.post("/auth/login", UserController.login);
routes.get("/user/:id", UserController.checkToken, UserController.privateRoute);

export default routes;
