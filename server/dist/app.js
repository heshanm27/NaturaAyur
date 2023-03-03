"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const express_1 = __importDefault(require("express"));
const util_1 = require("./util");
require("express-async-errors");
const routes_1 = __importDefault(require("./routes"));
const db_connect_config_1 = __importDefault(require("./config/db-connect.config"));
const mongoose_1 = __importDefault(require("mongoose"));
const passport_1 = __importDefault(require("passport"));
const cors_1 = __importDefault(require("cors"));
require("./util/passport-config.util");
const app = (0, express_1.default)();
//cors oprions
const corsOptions = {
    origin: "http://localhost:3000",
    method: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
};
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(passport_1.default.initialize());
const server = app.listen(process.env.PORT, () => {
    util_1.logger.info(`Server is running on port ${process.env.PORT}🚀`);
    (0, db_connect_config_1.default)();
    (0, routes_1.default)(app);
});
// server grcefully shutdown handle
process.on("SIGINT", () => {
    util_1.logger.info("SIGINT signal received: closing HTTP server");
    server.close(() => {
        util_1.logger.info("HTTP server closed");
        mongoose_1.default.connection.close(false, () => {
            util_1.logger.info("MongoDb connection closed😢");
            process.exit(0);
        });
    });
});
process.on("SIGTERM", () => {
    util_1.logger.info("SIGTERM signal received: closing HTTP server");
    server.close(() => {
        util_1.logger.info("HTTP server closed😢");
        mongoose_1.default.connection.close(false, () => {
            util_1.logger.info("MongoDb connection closed😢");
            process.exit(0);
        });
    });
});
//# sourceMappingURL=app.js.map