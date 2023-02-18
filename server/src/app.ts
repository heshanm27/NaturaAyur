import express, { Express } from "express";
import dotenv from "dotenv";
import { logger } from "./util";
import routes from "./routes";
const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

dotenv.config();

app.listen(process.env.PORT || 8000, () => {
  logger.info(`Server is running on port ${process.env.PORT || 8000}`);
  console.log("Server is running on port 3000");
  routes(app);
});
