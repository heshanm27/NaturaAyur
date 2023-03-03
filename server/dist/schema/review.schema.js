"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteReviewSchema = exports.updateReviewSchema = exports.addReviewSchema = void 0;
const mongoose_1 = require("mongoose");
const zod_1 = require("zod");
const RATING_ENUM = {
    1: "BAD",
    2: "NOT_BAD",
    3: "OKAY",
    4: "GRATE",
    5: "EXCELLENT",
};
exports.addReviewSchema = (0, zod_1.object)({
    user: (0, zod_1.string)({}).refine((data) => (0, mongoose_1.isValidObjectId)(data), { message: "UserId must be a valid Id" }),
    product: (0, zod_1.string)({}).refine((data) => (0, mongoose_1.isValidObjectId)(data), { message: "ProductId must be a valid Id" }),
    rating: (0, zod_1.nativeEnum)(RATING_ENUM),
    comment: (0, zod_1.string)({}).min(2, { message: "Comment must be at least 2 characters" }).max(350, { message: "Comment must be at most 350 characters" }),
});
exports.updateReviewSchema = exports.addReviewSchema.partial().extend({
    id: (0, zod_1.string)({}).refine((data) => (0, mongoose_1.isValidObjectId)(data), { message: "ReviewId must be a valid Id" }),
});
exports.deleteReviewSchema = (0, zod_1.object)({
    id: (0, zod_1.string)({}).refine((data) => (0, mongoose_1.isValidObjectId)(data), { message: "ReviewId must be a valid Id" }),
});
//# sourceMappingURL=review.schema.js.map