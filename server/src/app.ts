import * as dotenv from "dotenv";
dotenv.config();
import express, { Express } from "express";
import { logger } from "./util";
import "express-async-errors";
import routes from "./routes";
import connect from "./config/db-connect.config";
import mongoose from "mongoose";
import passport from "passport";
import cors from "cors";
import "./util/passport-config.util";
import cookieParser from "cookie-parser";
import { raw } from "body-parser";
import { OrderpayemntHandler } from "./controller/order.webhook.controller";
import * as Scheduler from "./scheduler/order-scheduler";
import { schedule } from "node-cron";

const app: Express = express();

//cors oprions
const corsOptions = {
  origin: "http://localhost:3000",
  method: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};
app.post("/webhook", raw({ type: "*/*" }), OrderpayemntHandler);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(passport.initialize());
app.use(cookieParser());

const server = app.listen(process.env.PORT, () => {
  logger.info(`Server is running on port ${process.env.PORT}🚀`);
  connect();

  Scheduler.dailySchedule.start();
  // Scheduler.dailyScheduleTwo.start();
  // schedule(
  //   "* * * * * *",
  //   () => {
  //     console.log("running every minute 1, 2, 4 and 5");
  //   },
  //   {
  //     scheduled: false,
  //     name: "test",
  //   }
  // ).start();
  routes(app);
});

// server grcefully shutdown handle
process.on("SIGINT", () => {
  logger.info("SIGINT signal received: closing HTTP server");
  server.close(() => {
    logger.info("HTTP server closed");
    mongoose.connection.close(false, () => {
      logger.info("MongoDb connection closed😢");
      process.exit(0);
    });
  });
});

process.on("SIGTERM", () => {
  logger.info("SIGTERM signal received: closing HTTP server");
  server.close(() => {
    logger.info("HTTP server closed😢");
    mongoose.connection.close(false, () => {
      logger.info("MongoDb connection closed😢");
      process.exit(0);
    });
  });
});
