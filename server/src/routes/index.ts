import { Express, Request, Response } from "express";
import ProdutRoute from "../routes/product.routes";
import UserRoute from "../routes/order.routes";
import OrderRoute from "../routes/order.routes";
import AuthRoute from "../routes/auth.routes";
import S3 from "../util/s3-client.util";
import multer from "multer";
import multerS3 from "multer-s3";
import { v4 as uuidv4 } from "uuid";
import NotFoundMiddleware from "../middleware/notfound.middleware";
import ErrorHandlerMiddleware from "../middleware/errorhandler.middleware";
import { validateUserRoleAndToken, UserRole } from "../middleware/auth.middleware";

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
  const upload = multer({
    storage: multerS3({
      s3: S3,
      bucket: process.env.S3_BUCKET_NAME ?? "",
      metadata: function (req, file, cb) {
        cb(null, { fieldName: file.fieldname });
      },
      key: function (req, file, cb) {
        cb(null, uuidv4());
      },
    }),
  });
  app.post("/test", upload.array("files", 6), (req: Request, res: Response) => {
    const files = req.files;
    res.status(200).json({
      files,
    });
  });
  app.use("/api/v1/product", validateUserRoleAndToken(UserRole.Admin), ProdutRoute);
  app.use("/api/v1/user", UserRoute);
  app.use("/api/v1/order", OrderRoute);
  app.use("/api/v1/auth", AuthRoute);
  app.use(NotFoundMiddleware);
  app.use(ErrorHandlerMiddleware);
}

export default routes;
