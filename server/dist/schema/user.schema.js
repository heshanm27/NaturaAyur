"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserToSellerSchema = void 0;
const zod_1 = require("zod");
exports.UpdateUserToSellerSchema = (0, zod_1.object)({
    isSeller: (0, zod_1.boolean)({
        required_error: "isSeller is required",
    }),
    seller: (0, zod_1.object)({
        storeName: (0, zod_1.string)({
            required_error: "Store Name is required",
        })
            .min(2, { message: "Name must be at least 2 characters" })
            .max(75, { message: "Name must be at most 75 characters" }),
        logo: (0, zod_1.string)({}).optional(),
        description: (0, zod_1.string)({
            required_error: "Description is required",
        })
            .min(2, { message: "Description must be at least 2 characters" })
            .max(200, { message: "Description must be at most 200 characters" }),
    }),
});
//# sourceMappingURL=user.schema.js.map