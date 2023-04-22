import { BadRequestError } from "../errors";
import Order, { IOrder } from "../models/order.model";

//create funtion to update order status to pending after 1 hour
export async function updateOrderStatusToPending() {
  const orders = await Order.find({}, { status: "new", createdAt: { $gte: new Date(new Date().getTime() - 1 * 60 * 60 * 1000) } });
  if (orders) {
    await Order.updateMany(orders, { status: "pending" });
  }
}

//create funtion to update order status when received status
export async function updateOrderStatusToReceived(input: any) {
  const order = await Order.findOneAndUpdate({ _id: input.orderId }, { status: input.status }, { new: true }).exec();

  if (!order) {
    throw new BadRequestError("Order not found");
  }
  return order;
}

export async function addOrder(input: any) {
  try {
    const order = new Order({
      user: input.user,
      orderItems: input.orderItems,
      shippingAddress: input.shippingAddress,
      paymentMethod: input.paymentMethod,
      itemsPrice: input.itemsPrice,
      shippingPrice: input.shippingPrice,
      taxPrice: input.taxPrice,
      totalPrice: input.totalPrice,
    });

    const createdOrder = await order.save();

    return {
      message: "Order Created Successfully",
      order: createdOrder,
    };
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

export async function findRecentOrders(input: any) {
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

//find all orders that status not pending or new
export async function findOrdersHistory() {
  try {
    const orders = await Order.find({ status: { $nin: ["new", "pending"] } });
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

//find all orders that passed seller id match with order items seller id
//orders should be found by seller id
// this function should map each item and check if seller id match with order item seller id
//if match return order item with order details except other order items
//if not match return null

export async function findOrdersDetailsBySellerId(input: any) {}

export async function findOrdersBySellerId(input: any) {
  try {
    const orders = await Order.find({ "orderItems.seller": input.sellerId });
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
