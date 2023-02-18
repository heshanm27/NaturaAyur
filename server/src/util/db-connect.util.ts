import mongoose from "mongoose";
import logger from "./logger.util";

async function connect() {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.MONGOURL ?? "", {});
    logger.info("DB connected");
  } catch (error) {
    logger.error("Could not connect to db");
    process.exit(1);
  }
}

export default connect;
