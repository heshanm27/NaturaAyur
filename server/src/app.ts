import dotenv from "dotenv";
dotenv.config();
import express, { Express } from "express";
import { logger } from "./util";
import routes from "./routes";
import connect from "./config/db-connect.config";
import mongoose from "mongoose";
import passport from "passport";
import cors from "cors";
import "express-async-errors";
import ErrorHandlerMiddleware from "./middleware/errorhandler.middleware";
import "./util/passport-config.util";
const app: Express = express();

//cors oprions
const corsOptions = {
  origin: "http://localhost:3000",
  method: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());

const server = app.listen(process.env.PORT, () => {
  logger.info(`Server is running on port ${process.env.PORT}`);
  connect();

  routes(app);
  app.use(ErrorHandlerMiddleware);
});

//server grcefully shutdown handle
process.on("SIGINT", () => {
  logger.info("SIGINT signal received: closing HTTP server");
  server.close(() => {
    logger.info("HTTP server closed");
    mongoose.connection.close(false, () => {
      logger.info("MongoDb connection closed");
      process.exit(0);
    });
  });
});

process.on("SIGTERM", () => {
  logger.info("SIGTERM signal received: closing HTTP server");
  server.close(() => {
    logger.info("HTTP server closed");
    mongoose.connection.close(false, () => {
      logger.info("MongoDb connection closed");
      process.exit(0);
    });
  });
});
