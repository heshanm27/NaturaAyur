import express from "express";
import { addOrder } from "../controller/order.controller";

const Router = express.Router();

//default routes
Router.route("/").get().post(addOrder);
//paramterized routes
Router.route("/:id").get().patch().delete();

export default Router;
