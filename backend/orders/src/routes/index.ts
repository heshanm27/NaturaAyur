import { Express, Request, Response } from "express";
import OrderRoute from "../routes/order.routes";
import NotFoundMiddleware from "../middleware/notfound.middleware";
import ErrorHandlerMiddleware from "../middleware/errorhandler.middleware";
// import { validateUserRoleAndToken } from "../middleware/auth.middleware";
export enum ROLES {
  ADMIN = "admin",
  USER = "user",
  SELLER = "seller",
}

function routes(app: Express) {
  app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
      server: "Server Is running",
    });
  });
  // app.use("/api/v1/order", validateUserRoleAndToken([ROLES.ADMIN, ROLES.SELLER, ROLES.USER]), OrderRoute);
  app.use("/api/v1/order", OrderRoute);
  app.use(NotFoundMiddleware);
  app.use(ErrorHandlerMiddleware);
}

export default routes;
