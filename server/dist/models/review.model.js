"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const ReviewSchema = new Schema({
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
    },
    product: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Product",
    },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    isDeleted: { type: Boolean, required: true, default: false },
    isEdited: { type: Boolean, required: true, default: false },
    deletedAt: { type: Date },
}, { timestamps: true });
const Reviews = mongoose_1.default.model("Reviews", ReviewSchema);
exports.default = Reviews;
//# sourceMappingURL=review.model.js.map