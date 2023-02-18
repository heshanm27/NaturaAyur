import dotenv from "dotenv";
dotenv.config();
import express, { Express } from "express";
import { logger } from "./util";
import routes from "./routes";
const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(process.env.PORT, () => {
  logger.info(`Server is running on port ${process.env.PORT}`);
  routes(app);
});
