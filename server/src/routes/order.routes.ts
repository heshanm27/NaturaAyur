import express from "express";
import { addOrder, deleteOrder, getAllOrderList, getLiveOrder, getOrderHistory } from "../controller/order.controller";

const Router = express.Router();

//default routes
Router.route("/").get(getAllOrderList).post(addOrder);

//paramterized routes
Router.route("/:id").delete(deleteOrder);

Router.route("/live").get(getLiveOrder);
Router.route("/history").get(getOrderHistory);

export default Router;
