import { Express, Request, Response } from "express";
import AuthRoute from "./auth";
import ProductRoute from "./product";
import OrderRoute from "./order";
import ReviewRoute from "./review";
import UserRoute from "./user";
import CategoryRoute from "./category";
import { ROLES, validateUserRoleAndToken } from "../middleware/auth.middleware";
import NotFoundMiddleware from "../middleware/notfound.middleware";
import ErrorHandlerMiddleware from "../middleware/errorhandler.middleware";

function routes(app: Express) {
  app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
      server: "Api GateWay Server Is running",
    });
  });

  // app.all("/:apiName/:path", (req, res) => {
  //   axios({
  //     method: req.method,
  //     url: `http://localhost:8000/api/v1/${req.params.apiName}/${req.params.path}`,
  //     headers: req.headers,
  //     data: req.body,
  //     params: req.params,
  //   })
  //     .then((response) => {
  //       res.header(response.headers).status(response.status).json(response.data);
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     });
  // });
  app.use("/api/v1/auth", AuthRoute);
  app.use("/api/v1/product", ProductRoute);
  app.use("/api/v1/order", validateUserRoleAndToken([ROLES.ADMIN, ROLES.SELLER, ROLES.USER]), OrderRoute);
  app.use("/api/v1/review", validateUserRoleAndToken([ROLES.ADMIN, ROLES.SELLER, ROLES.USER]), ReviewRoute);
  app.use("/api/v1/user", UserRoute);
  app.use("/api/v1/category", validateUserRoleAndToken([ROLES.ADMIN]), CategoryRoute);
  app.use(NotFoundMiddleware);
  app.use(ErrorHandlerMiddleware);
}

export default routes;
