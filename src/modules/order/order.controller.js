import { catchAsyncError } from "../../utils/catchAsyncError.js";
import { AppError } from "../../utils/AppError.js";
import { cartModel } from "../../../Database/models/cart.model.js";
import { productModel } from "../../../Database/models/product.model.js";
import { orderModel } from "../../../Database/models/order.model.js";

import Stripe from "stripe";
import { userModel } from "../../../Database/models/user.model.js";
const stripe = new Stripe(
  "",
);

const createCashOrder = catchAsyncError(async (req, res, next) => {
  let cart = await cartModel.findById(req.params.id);

  // console.log(cart);
  let totalOrderPrice = cart.totalPriceAfterDiscount
    ? cart.totalPriceAfterDiscount
    : cart.totalPrice;

  console.log(cart.cartItem);
  const order = new orderModel({
    userId: req.user._id,
    cartItem: cart.cartItem,
    totalOrderPrice,
    shippingAddress: req.body.shippingAddress,
  });

  await order.save();

  // console.log(order);
  if (order) {
    let options = cart.cartItem.map((item) => ({
      updateOne: {
        filter: { _id: item.productId },
        update: { $inc: { quantity: -item.quantity, sold: item.quantity } },
      },
    }));

    await productModel.bulkWrite(options);

    await cartModel.findByIdAndDelete(req.params.id);

    return res.status(201).json({ message: "success", order });
  } else {
    next(new AppError("Error in cart ID", 404));
  }
});

const getSpecificOrder = catchAsyncError(async (req, res, next) => {
  console.log(req.user._id);

  let order = await orderModel
    .findOne({ userId: req.user._id })
    .populate("cartItems.productId");

  res.status(200).json({ message: "success", order });
});

const getAllOrders = catchAsyncError(async (req, res, next) => {
  let orders = await orderModel.findOne({}).populate("cartItems.productId");

  res.status(200).json({ message: "success", orders });
});

const createCheckOutSession = catchAsyncError(async (req, res, next) => {
  let cart = await cartModel.findById(req.params.id);
  if(!cart) return next(new AppError("Cart was not found",404))

  console.log(cart);

  // console.log(cart);
  let totalOrderPrice = cart.totalPriceAfterDiscount
    ? cart.totalPriceAfterDiscount
    : cart.totalPrice;

  let sessions = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "egp",
          unit_amount: totalOrderPrice * 100,
          product_data: {
            name: req.user.name,
          },
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: "",
    cancel_url: "",
    customer_email: req.user.email,
    client_reference_id: req.params.id,
    metadata: req.body.shippingAddress,
  });

  res.json({ message: "success", sessions });
});

const createOnlineOrder = catchAsyncError(async (request, response) => {
  const sig = request.headers["stripe-signature"].toString();

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      request.body,
      sig,
      ""
    );
  } catch (err) {
    return response.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  if (event.type == "checkout.session.completed") {
    // const checkoutSessionCompleted = event.data.object;
    card(event.data.object,response)


  } else {
    console.log(`Unhandled event type ${event.type}`);
  }
});



async function card (e,res){
  let cart = await cartModel.findById(e.client_reference_id);

  if(!cart) return next(new AppError("Cart was not found",404))

  let user = await userModel.findOne({email:e.customer_email})
  const order = new orderModel({
    userId: user._id,
    cartItem: cart.cartItem,
    totalOrderPrice : e.amount_total/100,
    shippingAddress: e.metadata.shippingAddress,
    paymentMethod:"card",
    isPaid:true,
    paidAt:Date.now()
  });

  await order.save();

  // console.log(order);
  if (order) {
    let options = cart.cartItem.map((item) => ({
      updateOne: {
        filter: { _id: item.productId },
        update: { $inc: { quantity: -item.quantity, sold: item.quantity } },
      },
    }));

    await productModel.bulkWrite(options);

    await cartModel.findOneAndDelete({userId: user._id});

    return res.status(201).json({ message: "success", order });
  } else {
    next(new AppError("Error in cart ID", 404));
  }
}

export {
  createCashOrder,
  getSpecificOrder,
  getAllOrders,
  createCheckOutSession,
  createOnlineOrder,
};
