import { Express, Request, Response } from "express";

import UserRoute from "../routes/user.routes";
import AuthRoute from "../routes/auth.routes";
import NotFoundMiddleware from "../middleware/notfound.middleware";
import ErrorHandlerMiddleware from "../middleware/errorhandler.middleware";
import { validateUserRoleAndToken } from "../middleware/auth.middleware";
import { ROLES } from "../model/user.model";
import { upload } from "../util/multerConfig";

function routes(app: Express) {
  app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
      server: "Server Is running",
    });
  });

  app.post("/test", upload.array("files", 6), (req: Request, res: Response) => {
    const files = req.files;
    res.status(200).json({
      files,
    });
  });
  app.use("/api/v1/user", validateUserRoleAndToken([ROLES.ADMIN, ROLES.SELLER, ROLES.USER]), UserRoute);
  app.use("/api/v1/auth", AuthRoute);
  app.use(NotFoundMiddleware);
  app.use(ErrorHandlerMiddleware);
}

export default routes;
