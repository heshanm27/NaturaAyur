import * as dotenv from "dotenv";
dotenv.config();
import "express-async-errors";
import cors from "cors";
import express, { Express } from "express";
const app: Express = express();
import logger from "./config/logger.config";
import { createProxyMiddleware, Filter, Options, RequestHandler } from "http-proxy-middleware";

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
  logger.info(`Server is running on port ${process.env.PORT}`);
  console.log(`Server is running on port ${process.env.PORT}`);
  console.log(`Press CTRL-C to stop\n`);
});

// server grcefully shutdown handle
process.on("SIGINT", () => {
  logger.info("SIGINT signal received: closing HTTP server");
  server.close(() => {
    logger.info("HTTP server closed");
  });
});

process.on("SIGTERM", () => {
  logger.info("SIGTERM signal received: closing HTTP server");
  server.close(() => {
    logger.info("HTTP server closed😢");
  });
});
