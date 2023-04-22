import mongoose, { Model } from "mongoose";

const { Schema } = mongoose;

export interface IOrder {
  _id?: string;
  user: {
    type: mongoose.Schema.Types.ObjectId;
    ref: "User";
  };
  orderItems: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId;
        ref: "Product";
      };
      quantity: number;
      seller: {
        type: mongoose.Schema.Types.ObjectId;
      };
    }
  ];
  status: string;
  shippingAddress: {
    address: string;
    city: string;
    postalCode: number;
    country: string;
  };
  paymentMethod: string;
  paymentResult: {
    id: string;
    status: string;
    update_time: string;
    email_address: string;
  };
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
  isPaid: boolean;
  paidAt: Date;
  isDelivered: boolean;
  deliveredAt: Date;
}

interface IOrderMethod {}
interface OrderModel extends Model<IOrder, {}, IOrderMethod> {}

const OrderSchema = new Schema<IOrder, OrderModel, IOrderMethod>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    orderItems: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
        quantity: { type: Number, required: true },
        seller: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
      },
    ],
    status: {
      type: String,
      enum: ["pending", "new", "rejected", "approved", "accepted", "shipped", "cancelled"],
      default: "new",
    },
    shippingAddress: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: Number, required: true },
      country: { type: String, required: true },
    },
    taxPrice: { type: Number, required: true },
    shippingPrice: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    paidAt: { type: Date },
    deliveredAt: { type: Date },
    isDelivered: { type: Boolean, default: false },
    isPaid: { type: Boolean, default: false },
    paymentMethod: { type: String, required: true },
    paymentResult: {
      id: { type: String },
      status: { type: String },
      update_time: { type: String },
      email_address: { type: String },
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", OrderSchema);
export default Order;
