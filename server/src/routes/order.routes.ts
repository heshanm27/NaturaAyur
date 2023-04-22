import express from "express";
import { addOrder, deleteOrder, getAllOrderList } from "../controller/order.controller";

const Router = express.Router();

//default routes
Router.route("/").get(getAllOrderList).post(addOrder);

//paramterized routes
Router.route("/:id").delete(deleteOrder);

export default Router;
