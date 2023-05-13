import * as dotenv from "dotenv";
dotenv.config();
import express, { Express } from "express";
import logger from "./util/logger.config";
import "express-async-errors";
import routes from "./routes/";
import connect from "./util/db-connect.config";
import cors from "cors";
import "./util/passport-config.util";
import * as Scheduler from "./scheduler/order-scheduler";
const app: Express = express();

//cors oprions
const corsOptions = {
  origin: "http://localhost:3000",
  method: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));

const server = app.listen(process.env.PORT, () => {
  logger.info(`Server is running on port ${process.env.PORT}🚀`);
  
  Scheduler.dailySchedule.start();
  connect();
  routes(app);
});

// server grcefully shutdown handle
process.on("SIGINT", () => {
  logger.info("SIGINT signal received: closing HTTP server");
  server.close(() => {
    logger.info("HTTP server closed");
    process.exit(0);
  });
});

process.on("SIGTERM", () => {
  logger.info("SIGTERM signal received: closing HTTP server");
  server.close(() => {
    logger.info("HTTP server closed😢");
    logger.info("MongoDb connection closed😢");
    process.exit(0);
  });
});
