"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_controller_1 = require("../controller/product.controller");
const schemavalidator_middleware_1 = __importDefault(require("../middleware/schemavalidator.middleware"));
const product_schema_1 = require("../schema/product.schema");
const Router = express_1.default.Router();
//default routes
Router.route("/").get(product_controller_1.getAllProductList).post((0, schemavalidator_middleware_1.default)(product_schema_1.addProdutSchema), product_controller_1.addNewProduct);
//paramterized routes
Router.route("/:id").get(product_controller_1.getOneProductDetails).patch(product_controller_1.updateProduct).delete(product_controller_1.deleteProduct).post(product_controller_1.getProductByCategory);
Router.route("/reviews/:id").get(product_controller_1.getReviewsForProduct);
Router.route("/seller/:id").get(product_controller_1.getOneSellerProductList);
exports.default = Router;
//# sourceMappingURL=product.routes.js.map