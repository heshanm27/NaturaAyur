import express from "express";
import { getAllUsertList, getOneUser } from "../controller/user.controller";

const Router = express.Router();

//default routes
Router.route("/").get(getAllUsertList).post();
//paramterized routes
Router.route("/:id").get(getOneUser).patch().delete();

export default Router;
