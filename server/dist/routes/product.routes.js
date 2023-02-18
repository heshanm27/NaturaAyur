"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Router = express_1.default.Router();
//default routes
Router.route("/").get().post();
//paramterized routes
Router.route("/:id").get().patch().delete();
exports.default = Router;
//# sourceMappingURL=product.routes.js.map