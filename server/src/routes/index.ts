import { Express, Request, Response } from "express";
import ProdutRoute from "../routes/product.routes";
import UserRoute from "../routes/order.routes";
import OrderRoute from "../routes/order.routes";
import AuthRoute from "../routes/auth.routes";

import NotFoundMiddleware from "../middleware/notfound.middleware";
import ErrorHandlerMiddleware from "../middleware/errorhandler.middleware";
import { validateUserRoleAndToken } from "../middleware/auth.middleware";
import { ROLES } from "../models/user.model";
import { upload } from "../util/multerConfig";

function routes(app: Express) {
  app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
      server: "Server Is running",
    });
  });

  // app.get("/bucket", (req: Request, res: Response) => {
  //   const params: PutObjectCommandInput = {
  //     Bucket: process.env.S3BUCKETNAME,
  //     Key: "test",
  //     Body: "test",
  //     ContentType: "text/plain",
  //   };
  //   const command = new PutObjectCommand(params);
  // });

  app.post("/test", upload.array("files", 6), (req: Request, res: Response) => {
    const files = req.files;
    res.status(200).json({
      files,
    });
  });
  app.use("/api/v1/product", validateUserRoleAndToken([ROLES.ADMIN, ROLES.SELLER]), ProdutRoute);
  app.use("/api/v1/user", UserRoute);
  app.use("/api/v1/order", OrderRoute);
  app.use("/api/v1/auth", AuthRoute);
  app.use(NotFoundMiddleware);
  app.use(ErrorHandlerMiddleware);
}

export default routes;
