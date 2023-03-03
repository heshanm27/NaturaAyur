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
exports.getPaymentDetailsOfOneOrder = exports.payForOrder = exports.updateOrder = exports.addOrder = exports.getOneUserOrderList = exports.getAllOrderList = void 0;
const getAllOrderList = (req, res) => __awaiter(void 0, void 0, void 0, function* () { });
exports.getAllOrderList = getAllOrderList;
const getOneUserOrderList = (req, res) => __awaiter(void 0, void 0, void 0, function* () { });
exports.getOneUserOrderList = getOneUserOrderList;
const addOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () { });
exports.addOrder = addOrder;
const updateOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () { });
exports.updateOrder = updateOrder;
const payForOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () { });
exports.payForOrder = payForOrder;
const getPaymentDetailsOfOneOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () { });
exports.getPaymentDetailsOfOneOrder = getPaymentDetailsOfOneOrder;
//# sourceMappingURL=order.controller.js.map