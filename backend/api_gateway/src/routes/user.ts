import express from "express";
const Router = express.Router();
import axios from "axios";

Router.all("/:path", (req, res) => {
  axios({
    method: req.method,
    url: `http://localhost:8000/api/v1/${req.params.path}`,
    headers: req.headers,
    data: req.body,
    params: req.params,
  })
    .then((response) => {
      res.header(response.headers).status(response.status).json(response.data);
    })
    .catch((e) => {
      console.log(e);
    });
});

export default Router;
