import express from "express";

const Router = express.Router();

//default routes
Router.route("/").get().post();
//paramterized routes
Router.route("/:id").get().patch().delete();

export default Router;
