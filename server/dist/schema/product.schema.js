"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProductSchema = exports.updateProductSchema = exports.addProdutSchema = void 0;
const mongoose_1 = require("mongoose");
const zod_1 = require("zod");
exports.addProdutSchema = (0, zod_1.object)({
    name: (0, zod_1.string)({
        required_error: "Product name is required",
    })
        .min(2, { message: "Name must be at least 2 characters" })
        .max(150, { message: "Name must be at most 150 characters" }),
    description: (0, zod_1.string)({
        required_error: "Product description is required",
    })
        .min(2, { message: "Description must be at least 2 characters" })
        .max(350, { message: "Description must be at most 350 characters" }),
    price: (0, zod_1.number)({
        required_error: "Product price is required",
    })
        .gte(0, { message: "Price must be at grater than or equal to 0" })
        .lte(1500000, { message: "Price must be at most 1,500,000 characters" }),
    stock: (0, zod_1.number)({
        required_error: "Product quantity is required",
    })
        .gt(0, { message: "Quantity must be at grater than or equal to 0" })
        .lte(1000000, { message: "Quantity must be at most 1,000,000 characters" }),
    category: (0, zod_1.string)({
        required_error: "Product category is required",
    })
        .min(2, { message: "Category must be at least 2 characters" })
        .max(50, { message: "Category must be at most 50 characters" }),
    subCategory: (0, zod_1.string)({
        required_error: "Product sub category is required",
    })
        .min(2, { message: "Sub Category must be at least 2 characters" })
        .max(50, { message: "Sub Category must be at most 50 characters" }),
    images: (0, zod_1.object)({}).optional(),
    seller: (0, zod_1.string)({
        required_error: "Product seller is required",
    })
        .min(2, { message: "Seller must be at least 2 characters" })
        .refine((data) => (0, mongoose_1.isValidObjectId)(data), { message: "Seller must be a valid Id" }),
});
exports.updateProductSchema = exports.addProdutSchema.partial().extend({
    id: (0, zod_1.string)({}).refine((data) => (0, mongoose_1.isValidObjectId)(data), { message: "Id must be a valid Id" }),
});
exports.deleteProductSchema = (0, zod_1.object)({
    id: (0, zod_1.string)({
        required_error: "Product id is required",
    })
        .min(2, { message: "Id must be at least 2 characters" })
        .refine((data) => (0, mongoose_1.isValidObjectId)(data), { message: "Id must be a valid Id" }),
});
//# sourceMappingURL=product.schema.js.map