"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const util_1 = require("./util");
const routes_1 = __importDefault(require("./routes"));
const db_connect_util_1 = __importDefault(require("./util/db-connect.util"));
const mongoose_1 = __importDefault(require("mongoose"));
const passport_1 = __importDefault(require("passport"));
const cors_1 = __importDefault(require("cors"));
require("express-async-errors");
const errorhandler_middleware_1 = __importDefault(require("./middleware/errorhandler.middleware"));
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
    util_1.logger.info(`Server is running on port ${process.env.PORT}`);
    (0, db_connect_util_1.default)();
    (0, routes_1.default)(app);
    app.use(errorhandler_middleware_1.default);
});
//server grcefully shutdown handle
process.on("SIGINT", () => {
    util_1.logger.info("SIGINT signal received: closing HTTP server");
    server.close(() => {
        util_1.logger.info("HTTP server closed");
        mongoose_1.default.connection.close(false, () => {
            util_1.logger.info("MongoDb connection closed");
            process.exit(0);
        });
    });
});
process.on("SIGTERM", () => {
    util_1.logger.info("SIGTERM signal received: closing HTTP server");
    server.close(() => {
        util_1.logger.info("HTTP server closed");
        mongoose_1.default.connection.close(false, () => {
            util_1.logger.info("MongoDb connection closed");
            process.exit(0);
        });
    });
});
//# sourceMappingURL=app.js.map