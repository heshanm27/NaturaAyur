"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false },
    isSeller: { type: Boolean, required: true, default: false },
    seller: {
        name: { type: String },
        logo: { type: String },
        description: { type: String },
        rating: { type: Number, default: 0 },
        numReviews: { type: Number, default: 0 },
    },
    cart: {
        items: [
            {
                product: {
                    type: mongoose_1.default.Schema.Types.ObjectId,
                    ref: "Product",
                },
                quantity: { type: Number, required: true },
            },
        ],
    },
    address: {
        street: { type: String },
        city: { type: String },
        postalCode: { type: String },
        country: { type: String },
    },
    paymentMethod: { type: String },
    orders: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "Order",
        },
    ],
}, {
    timestamps: true,
});
const User = mongoose_1.default.model("User", UserSchema);
exports.default = User;
//# sourceMappingURL=user.mode.js.map