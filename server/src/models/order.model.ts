import mongoose, { Model } from "mongoose";

const { Schema } = mongoose;

export interface IOrder {
  _id?: string;
  orderId: string;
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
  receipt_url: string;
}

interface IOrderMethod {}
interface OrderModel extends Model<IOrder, {}, IOrderMethod> {}

const OrderSchema = new Schema<IOrder, OrderModel, IOrderMethod>(
  {
    orderId: { type: String, required: true, unique: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    orderItems: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        quantity: { type: Number },
      },
    ],
    status: {
      type: String,
      enum: ["pending", "new", "rejected", "approved", "processing", "shipped", "cancelled"],
      default: "new",
    },
    shippingAddress: {
      address: { type: String },
      city: { type: String },
      postalCode: { type: Number },
      country: { type: String },
    },
    taxPrice: { type: Number, default: 0 },
    shippingPrice: { type: Number, default: 0 },
    totalPrice: { type: Number, default: 0 },
    paidAt: { type: Date },
    deliveredAt: { type: Date },
    isDelivered: { type: Boolean, default: false },
    isPaid: { type: Boolean, default: false },
    paymentMethod: { type: String },
    paymentResult: {
      id: { type: String },
      status: { type: String },
      update_time: { type: String },
      email_address: { type: String },
    },
    receipt_url: { type: String },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", OrderSchema);
export default Order;
