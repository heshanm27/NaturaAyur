"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const util_1 = require("./util");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
dotenv_1.default.config();
app.listen(process.env.PORT || 8000, () => {
    util_1.logger.info(`Server is running on port ${process.env.PORT || 8000}`);
    console.log("Server is running on port 3000");
});
//# sourceMappingURL=app.js.map