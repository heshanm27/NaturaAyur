import express from "express";
import { addOrder, deleteOrder, getAllOrderList, getLiveOrder, getOneOrder, getOrderHistory, patchOrderStatus } from "../controller/order.controller";

const Router = express.Router();

//default routes
Router.route("/").get(getAllOrderList).post(addOrder);

Router.route("/live").get(getLiveOrder);
Router.route("/history").get(getOrderHistory);
//paramterized routes
Router.route("/:id").get(getOneOrder).patch(patchOrderStatus).delete(deleteOrder);

export default Router;
