import express from "express";
import { OrderpayemntHandler, addOrder } from "../controller/order.controller";
import { validateUserRoleAndToken } from "../middleware/auth.middleware";
import { ROLES } from "../models/user.model";
import { raw } from "body-parser";

const Router = express.Router();

Router.route("/payment/webhook").post(raw({ type: "*/*" }), OrderpayemntHandler);
//default routes
Router.use(validateUserRoleAndToken([ROLES.ADMIN, ROLES.SELLER, ROLES.USER]));
Router.route("/").get().post(addOrder);

//paramterized routes
Router.route("/:id").get().patch().delete();

export default Router;
