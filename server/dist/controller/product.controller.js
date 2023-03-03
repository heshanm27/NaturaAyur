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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.getReviewsForProduct = exports.getProductByCategory = exports.getOneSellerProductList = exports.getOneProductDetails = exports.getAllProductList = exports.addNewProduct = void 0;
const product_service_1 = require("../service/product.service");
const addNewProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield (0, product_service_1.addProduct)(req.body);
    return res.status(200).json({
        message: "Product Added Successfully",
        product,
    });
});
exports.addNewProduct = addNewProduct;
const getAllProductList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { search, sortBy, order, cat, subCat, limit, page } = req.query;
    //if only pass one sub category then it will be string
    //so convert it to array
    if (typeof subCat === "string") {
        subCat = [subCat];
    }
    //convert sub category to lowercase and trim
    subCat = subCat === null || subCat === void 0 ? void 0 : subCat.map((item) => item.trim().toLowerCase());
    //call service function
    const { products, total } = yield (0, product_service_1.findAllProducts)({ search, sortBy, cat, subCat, order, limit, page });
    return res.status(200).json({
        message: "Products found Successfully",
        total,
        products,
    });
});
exports.getAllProductList = getAllProductList;
const getOneProductDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield (0, product_service_1.findProductById)(req.body);
    return res.status(200).json({
        message: "Product Added Successfully",
        product,
    });
});
exports.getOneProductDetails = getOneProductDetails;
const getOneSellerProductList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield (0, product_service_1.findProductBySellerId)(req.body);
    return res.status(200).json({
        message: "Product Added Successfully",
        products,
    });
});
exports.getOneSellerProductList = getOneSellerProductList;
const getProductByCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield (0, product_service_1.findProductByCategory)(req.body);
    return res.status(200).json({
        message: "Product Added Successfully",
        products,
    });
});
exports.getProductByCategory = getProductByCategory;
const getReviewsForProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productReviews = yield (0, product_service_1.getAllReviewsForProduct)(req.body);
    return res.status(200).json({
        message: "Product Added Successfully",
        productReviews,
    });
});
exports.getReviewsForProduct = getReviewsForProduct;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updateProduct = yield (0, product_service_1.patchProduct)(req.body);
        return res.status(200).json({
            message: "Product Updated Successfully",
            updateProduct,
        });
    }
    catch (e) {
        throw new Error(e.message);
    }
});
exports.updateProduct = updateProduct;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedProduct = yield (0, product_service_1.removeProduct)(req.body);
    return res.status(200).json({
        message: "Product Deleted Successfully",
        deletedProduct,
    });
});
exports.deleteProduct = deleteProduct;
//# sourceMappingURL=product.controller.js.map