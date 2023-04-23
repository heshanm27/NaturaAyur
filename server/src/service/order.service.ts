import Product from "../models/product.model";
import mongoose from "mongoose";
import { BadRequestError } from "../errors";
import Order, { IOrder } from "../models/order.model";
import { sendEmail } from "../util/send-mail";
import { generateOrderEmailBody } from "../util/mail-html-body-gen";

interface IOrderPay {
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
  shippingPrice: number;
  totalPrice: number;
  isPaid: boolean;
  paidAt: Date;
  orderId: string;
}

export async function addOrder(input: any) {
  try {
    const order = new Order({
      user: input.user,
      orderItems: input.orderItems,
      orderId: input.orderId,
    });

    const createdOrder = await order.save();

    return createdOrder;
  } catch (e: any) {
    throw new Error(e.message);
  }
}

export async function payForOrder(input: IOrderPay) {
  console.log(input);
  try {
    const foundOrder = await Order.findOne({
      orderId: input.orderId,
    }).exec();

    if (!foundOrder) throw new BadRequestError("Order Not Found");
    foundOrder.paymentResult = {
      id: input.paymentResult.id,
      status: input.paymentResult.status,
      update_time: input.paymentResult.update_time,
      email_address: input.paymentResult.email_address,
    };
    foundOrder.paidAt = new Date();
    foundOrder.paymentMethod = input.paymentMethod;
    foundOrder.shippingAddress = {
      address: input.shippingAddress.address,
      city: input.shippingAddress.city,
      postalCode: input.shippingAddress.postalCode,
      country: input.shippingAddress.country,
    };
    foundOrder.isPaid = true;
    foundOrder.paidAt = new Date();

    await foundOrder.save();
  } catch (e: any) {
    throw new Error(e.message);
  }
}

export async function sendOrderRecipet(username: string, email: string, recieptUrl: string): Promise<void> {
  try {
    const mailStatus = await sendEmail({
      subject: "Order Recipet",
      emailBody: generateOrderEmailBody(username, recieptUrl, "http://localhost:3000/seller/orders/live"),
      toEmail: email,
    });

    if (!mailStatus) console.log("Error in sending email");

    console.log("Email Sent");

    // const foundOrder = await Order.findOne({
    //   _id: input.orderId,
    // }).exec();
    // if (!foundOrder) throw new BadRequestError("Order Not Found");
    // foundOrder.status = "Sent";
    // foundOrder.sentAt = new Date();
    // await foundOrder.save();
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

export async function findRecentOrders() {
  //get  orders within 24 hours
  try {
    const orders = await Order.find({
      createdAt: {
        $gte: new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
      },
    });
    return {
      message: "Order List Fetched Successfully",
      orders,
    };
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

export async function findAllOrders(input: any) {
  try {
    const orders = await Order.find({});
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

//find all orders that status not pending or new
export async function findOrdersHistory() {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const orders = await Order.find({ status: { $nin: ["new", "pending"] } });
    const rejectedOrders = orders.filter((order) => order.status === "rejected").length;
    const approvedOrders = orders.filter((order) => order.status === "approved").length;
    const totalOrders = await Order.countDocuments({
      status: { $nin: ["new", "pending"] },
      createdAt: { $lt: today },
    });
    return {
      message: "Order List Fetched Successfully",
      orders,
      rejectedOrders,
      approvedOrders,
      totalOrders,
    };
  } catch (e: any) {
    return {
      message: e.message,
    };
  }
}

//find al order that status is pending or new
export async function findLiveOrders() {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const orders = await Order.find({ status: { $in: ["new", "pending"] } })
      .sort({ createdAt: -1 })
      .populate("user");
    const newOrders = orders.filter((order) => order.status === "new").length;
    const pendingOrders = orders.filter((order) => order.status === "pending").length;
    const ordersReceivedToday = await Order.countDocuments({ createdAt: { $gte: today } });
    return {
      message: "Order List Fetched Successfully",
      orders,
      newOrders,
      pendingOrders,
      ordersReceivedToday,
    };
  } catch (e: any) {
    return {
      message: e.message,
    };
  }
}

export async function findOrdersDetailsBySellerId(input: any) {}

export async function findOrdersForSeller(sellerId: string) {
  const orders = await Order.find().populate({
    path: "orderItems.product",
    populate: {
      path: "sellerId",
    },
  });
  const filteredOrders = orders.filter((order) => {
    return order.orderItems.some((orderItem: any) => orderItem.product.sellerId._id.toString() === sellerId);
  });
  return {
    message: "Order List Fetched Successfully",
    orders: filteredOrders,
  };
}

//create funtion to update order status when received status
export async function updateOrderStatus(input: any) {
  try {
    const order = await Order.findOneAndUpdate({ _id: input.orderId }, { status: input.status }, { new: true }).exec();

    if (!order) {
      throw new BadRequestError("Order not found");
    }
    return order;
  } catch (e: any) {
    throw new Error(e.message);
  }
}

export async function deleteOrder(id: string) {
  return Order.findByIdAndDelete(id);
}

export async function updateOrderStatusToPending() {
  const currentDate = new Date().getTime();
  const oneHourAgo = new Date(currentDate - 60 * 60 * 1000); // subtract one hour in milliseconds

  const orders = await Order.find({ createdAt: { $lt: oneHourAgo } });

  for (const order of orders) {
    order.status = "pending";
    await order.save();
  }

  return {
    message: "Orders updated successfully",
  };
}
// export async function updateOrderPaymentStatus(input: any) {
//   try {
//     const foundOrder = await Order.findOne({
//       _id: input.orderId,
//     }).exec();

//     if (!foundOrder) throw new BadRequestError("Order Not Found");

//     foundOrder.isPaid = true;
//     foundOrder.paidAt = new Date();

//     await foundOrder.save();
//   } catch (e: any) {
//     throw new Error(e.message);
//   }
// }

// export async function addOrderShippingDetails(input: any) {
//   try {
//     const foundOrder = await Order.findOne({
//       _id: input.orderId,
//     }).exec();

//     if (!foundOrder) throw new BadRequestError("Order Not Found");
//     foundOrder.paymentMethod = input.paymentMethod;
//     foundOrder.shippingAddress = {
//       address: input.shippingAddress.address,
//       city: input.shippingAddress.city,
//       postalCode: input.shippingAddress.postalCode,
//       country: input.shippingAddress.country,
//     };

//     await foundOrder.save();
//   } catch (e: any) {
//     throw new Error(e.message);
//   }
// }
