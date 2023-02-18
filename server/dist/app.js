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
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.listen(process.env.PORT, () => {
    util_1.logger.info(`Server is running on port ${process.env.PORT}`);
    (0, db_connect_util_1.default)();
    (0, routes_1.default)(app);
});
//# sourceMappingURL=app.js.map