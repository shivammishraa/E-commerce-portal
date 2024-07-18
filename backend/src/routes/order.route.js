const express = require("express");
const OrderRoutes = new express.Router();
const UserAuthGuard = require("../middleware/userAuth.middleware");
const CartModel = require("../model/cart.model");
const OrderModel = require("../model/order.model");
OrderRoutes.post(`/order`, UserAuthGuard, async (req, res) => {
  try {
    const cart = await CartModel.find({ user: req.user._id }).populate({
      path: "cart_items",
      populate: {
        path: "product",
      },
    });
    if (!cart) {
      throw new Error("Order can't be created");
    }
    const product_items = [];
    let total_price = 0;
    for (let item of cart[0].cart_items) {
      total_price = total_price + item.product.product_price * item.quantity;
      product_items.push({
        product: item.product._id,
        quantity: item.quantity,
      });
    }
    const order = await new OrderModel({
      user: req.user._id,
      product_item: [...product_items],
      order_status: "Order Placed",
      order_price: total_price,
    });
    const saved = await order.save();
    if (!saved) {
      throw new Error("Order can't be created");
    }
    cart.cart_items = [];
    const UpdatedCart = await CartModel.findOneAndUpdate(
      { user: req.user._id },
      { cart_items: [] }
    );
    if (!UpdatedCart) {
      throw new Error("Order can't be created");
    }
    res.status(200).send({
      message: "Order Created",
      data: null,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err.message });
  }
});
OrderRoutes.get(`/order`, UserAuthGuard, async (req, res) => {
  try {
    const order = await OrderModel.find({ user: req.user._id }).populate({
      path: "product_item",
      populate: {
        path: "product",
      },
    });
    if (!order) {
      throw new Error("Order can't be feteched");
    }
    res.status(200).send({
      message: "User Order fetched",
      data: order,
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

module.exports = OrderRoutes;
