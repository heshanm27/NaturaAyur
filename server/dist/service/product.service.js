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
exports.getAllReviewsForProduct = exports.findProductByCategory = exports.findProductBySellerId = exports.findProductById = exports.findAllProducts = exports.removeProduct = exports.patchProduct = exports.addProduct = void 0;
const product_model_1 = __importDefault(require("../models/product.model"));
const errors_1 = require("../errors");
function addProduct(input) {
    return __awaiter(this, void 0, void 0, function* () {
        const product = yield product_model_1.default.create(input);
        return product;
    });
}
exports.addProduct = addProduct;
function patchProduct(input) {
    return __awaiter(this, void 0, void 0, function* () {
        const updateProduct = yield product_model_1.default.findByIdAndUpdate(input.id, input, {
            new: true,
            runValidators: true,
        });
        if (!updateProduct) {
            throw new errors_1.BadRequestError("Product not found");
        }
        return updateProduct;
    });
}
exports.patchProduct = patchProduct;
function removeProduct(input) {
    return __awaiter(this, void 0, void 0, function* () {
        const deletedProduct = yield product_model_1.default.findByIdAndDelete(input.id);
        if (!deletedProduct) {
            throw new errors_1.BadRequestError("Product not found");
        }
        return deletedProduct;
    });
}
exports.removeProduct = removeProduct;
function findAllProducts({ sortBy, limit = 10, page = 1 }) {
    return __awaiter(this, void 0, void 0, function* () {
        const products = yield product_model_1.default.find({})
            .sort(sortBy)
            .limit(limit)
            .skip(limit * (page - 1));
        return products;
    });
}
exports.findAllProducts = findAllProducts;
function findProductById(input) {
    return __awaiter(this, void 0, void 0, function* () {
        const product = yield product_model_1.default.findById(input.id);
        if (!product) {
            throw new errors_1.BadRequestError("Product not found");
        }
        return product;
    });
}
exports.findProductById = findProductById;
function findProductBySellerId(input) {
    return __awaiter(this, void 0, void 0, function* () {
        const products = yield product_model_1.default.find({ sellerId: input.sellerId });
        if (!products) {
            throw new errors_1.BadRequestError("Product not found");
        }
        return products;
    });
}
exports.findProductBySellerId = findProductBySellerId;
function findProductByCategory(input) {
    return __awaiter(this, void 0, void 0, function* () {
        const products = yield product_model_1.default.find({ category: input.category });
        if (!products) {
            throw new errors_1.BadRequestError("Product not found");
        }
        return products;
    });
}
exports.findProductByCategory = findProductByCategory;
function getAllReviewsForProduct(input) {
    return __awaiter(this, void 0, void 0, function* () {
        const produtReviews = yield product_model_1.default.findById(input.id).populate("reviews");
        if (!produtReviews) {
            throw new errors_1.BadRequestError("Product not found");
        }
        return produtReviews;
    });
}
exports.getAllReviewsForProduct = getAllReviewsForProduct;
//# sourceMappingURL=product.service.js.map