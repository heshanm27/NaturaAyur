"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOrderSchema = exports.updateOrderSchema = exports.addOrderSchema = void 0;
const mongoose_1 = require("mongoose");
const zod_1 = require("zod");
exports.addOrderSchema = (0, zod_1.object)({
    user: (0, zod_1.string)({}).refine((data) => (0, mongoose_1.isValidObjectId)(data), { message: "UserId must be a valid Id" }),
    products: (0, zod_1.object)({
        product: (0, zod_1.string)({}).refine((data) => (0, mongoose_1.isValidObjectId)(data), { message: "ProductId must be a valid Id" }),
        quantity: (0, zod_1.number)({}).positive({ message: "Quantity must be a positive number" }),
    }),
    shippingAddress: (0, zod_1.object)({
        address: (0, zod_1.string)({}).min(2, { message: "Address must be at least 2 characters" }).max(350, { message: "Address must be at most 350 characters" }),
        city: (0, zod_1.string)({}).min(2, { message: "City must be at least 2 characters" }).max(350, { message: "City must be at most 350 characters" }),
        postalCode: (0, zod_1.number)({}).positive({ message: "PostalCode must be a positive number" }),
        country: (0, zod_1.string)({}).min(2, { message: "Country must be at least 2 characters" }).max(350, { message: "Country must be at most 350 characters" }),
    }),
    paymentMethod: (0, zod_1.string)({})
        .min(2, { message: "PaymentMethod must be at least 2 characters" })
        .max(350, { message: "PaymentMethod must be at most 350 characters" }),
});
exports.updateOrderSchema = exports.addOrderSchema.partial().extend({
    id: (0, zod_1.string)({}).refine((data) => (0, mongoose_1.isValidObjectId)(data), { message: "OrderId must be a valid Id" }),
});
exports.deleteOrderSchema = (0, zod_1.object)({
    id: (0, zod_1.string)({}).refine((data) => (0, mongoose_1.isValidObjectId)(data), { message: "OrderId must be a valid Id" }),
});
//# sourceMappingURL=order.schema.js.map