import mongoose from "mongoose";
import logger from "./logger.config";

async function connect() {
  mongoose.set("strictQuery", false);
  await mongoose.connect(process.env.MONGOURL ?? "", {});
}

mongoose.connection.on("connected", () => {
  logger.info("Mongoose connected to db");
});
mongoose.connection.on("error", (err) => {
  logger.error("Mongoose connection error:", err);
  process.exit(1);
});

mongoose.connection.on("disconnected", () => {
  logger.info("Mongoose disconnected");
});
export default connect;
