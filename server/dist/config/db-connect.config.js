"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const logger_config_1 = __importDefault(require("./logger.config"));
function connect() {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        mongoose_1.default.set("strictQuery", false);
        yield mongoose_1.default.connect((_a = process.env.MONGOURL) !== null && _a !== void 0 ? _a : "", {});
    });
}
mongoose_1.default.connection.on("connected", () => {
    logger_config_1.default.info("Mongoose connected to db😍");
});
mongoose_1.default.connection.on("error", (err) => {
    logger_config_1.default.error("Mongoose connection error:😢", err);
    process.exit(1);
});
mongoose_1.default.connection.on("disconnected", () => {
    logger_config_1.default.info("Mongoose disconnected😢");
});
exports.default = connect;
//# sourceMappingURL=db-connect.config.js.map