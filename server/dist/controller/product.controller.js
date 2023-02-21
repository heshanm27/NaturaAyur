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
exports.getPaymentDetailsOfOneProduct = exports.payForProduct = exports.updateProduct = exports.addProduct = exports.getOneUserProductList = exports.getAllProductList = void 0;
const getAllProductList = (req, res) => __awaiter(void 0, void 0, void 0, function* () { });
exports.getAllProductList = getAllProductList;
const getOneUserProductList = (req, res) => __awaiter(void 0, void 0, void 0, function* () { });
exports.getOneUserProductList = getOneUserProductList;
const addProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () { });
exports.addProduct = addProduct;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () { });
exports.updateProduct = updateProduct;
const payForProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () { });
exports.payForProduct = payForProduct;
const getPaymentDetailsOfOneProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () { });
exports.getPaymentDetailsOfOneProduct = getPaymentDetailsOfOneProduct;
//# sourceMappingURL=product.controller.js.map