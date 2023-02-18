"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const ProductSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: [String], required: true },
    image: { type: [String], required: true },
    stock: { type: Number, required: true },
    rating: { type: Number },
    numReviews: { type: Number },
    reviews: { type: [mongoose_1.default.Schema.Types.ObjectId], ref: "Reviews" },
    seller: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
    },
}, {
    timestamps: true,
});
const Product = mongoose_1.default.model("Product", ProductSchema);
exports.default = Product;
//# sourceMappingURL=product.model.js.map