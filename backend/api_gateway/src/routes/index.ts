import axios from "axios";
import { Express, Request, Response } from "express";

function routes(app: Express) {
  app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
      server: "Api GateWay Server Is running",
    });
  });

  app.all("/:apiName/:path", (req, res) => {
    axios({
      method: req.method,
      url: `http://localhost:8000/api/v1/${req.params.apiName}/${req.params.path}`,
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
}

export default routes;
