import { Express, Request, Response } from "express";
import ProdutRoute from "../routes/product.routes";
import UserRoute from "../routes/order.routes";
import OrderRoute from "../routes/order.routes";

function routes(app: Express) {
  app.get("/healthcheck", (req: Request, res: Response) => {
    res.status(200).json({
      server: "Server Is running",
    });
  });

  app.use("api/product", ProdutRoute);
  app.use("api/user", UserRoute);
  app.use("api/order", OrderRoute);
}

export default routes;
