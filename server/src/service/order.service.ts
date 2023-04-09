import { BadRequestError } from "../errors";
import Order, { IOrder } from "../models/order.model";

export async function createOrder(input: any) {
  try {
    const { userId, products, shippingAddress, paymentMethod, taxPrice, totalPrice } = input;
    const order = await Order.create({
      userId,
      products,
      shippingAddress,
      paymentMethod,
      taxPrice,
      totalPrice,
    });
    return {
      message: "Order Created Successfully",
      order,
    };
  } catch (e: any) {
    return {
      message: e.message,
    };
  }
}

export async function patchOrder(input: any) {}

export async function removeOrder(input: any) {}

export async function findAllOrders(input: any) {}

export async function findOrderByUserId(input: any) {
  try {
    const orders = await Order.find({
      user: input.userId,
    });
    return {
      message: "Order List Fetched Successfully",
      orders,
    };
  } catch (e: any) {
    return {
      message: e.message,
    };
  }
}

export async function findPaymentDetailsByOrderId(input: any) {
  try {
    const FoundOrder = await Order.findOne({
      _id: input.orderId,
    });

    if (!FoundOrder) throw new BadRequestError("Order Not Found");

    return FoundOrder.paymentResult;
  } catch (e: any) {
    throw new Error(e.message);
  }
}

export async function payForOrder(input: any) {
  try {
    const foundOrder = await Order.findOne({
      _id: input.orderId,
    }).exec();

    if (!foundOrder) throw new BadRequestError("Order Not Found");

    foundOrder.status = "Paid";
    foundOrder.paymentResult = {
      id: input.paymentResult.id,
      status: input.paymentResult.status,
      update_time: input.paymentResult.update_time,
      email_address: input.paymentResult.email_address,
    };
    foundOrder.paidAt = new Date();
  } catch (e: any) {
    throw new Error(e.message);
  }
}

export async function deliverOrder(input: any) {
  try {
    const foundOrder = await Order.findOne({
      _id: input.orderId,
    }).exec();

    if (!foundOrder) throw new BadRequestError("Order Not Found");

    foundOrder.status = "Delivered";
    foundOrder.deliveredAt = new Date();

    await foundOrder.save();
  } catch (e: any) {
    throw new Error(e.message);
  }
}

export async function findOrderById(input: any) {
  try {
    const order = await Order.findOne({
      _id: input.orderId,
    });
    if (!order) throw new BadRequestError("Order Not Found");

    return order;
  } catch (e: any) {
    throw new Error(e.message);
  }
}
