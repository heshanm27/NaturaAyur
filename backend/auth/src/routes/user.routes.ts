import express from "express";
import { getAllUsertList, getOneUser, updateUserProfile } from "../controller/user.controller";

const Router = express.Router();

//default routes
Router.route("/").get(getAllUsertList).post();
//paramterized routes
Router.route("/:id").get(getOneUser).patch(updateUserProfile).delete();

export default Router;
