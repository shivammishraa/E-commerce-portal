const express = require("express");
const CartRoute = new express.Router();
const CartModel = require("../model/cart.model");
const UserAuthGuard = require("../middleware/userAuth.middleware");
CartRoute.patch("/cart", UserAuthGuard, async (req, res) => {
  try {
    let cart = await CartModel.findOne({ user: req.user._id }).populate({
      path: "cart_items",
      populate: {
        path: "product",
      },
    });

    if (cart == null) {
      const cart_items = [];
      cart_items.push({
        product: req.body.product,
        quantity: req.body.quantity > 0 ? req.body.quantity : 0,
      });
      cart = await new CartModel({
        user: req.user._id,
        cart_items,
      });
      if (!cart) {
        throw new Error("Product not added");
      }
      const save = await cart.save();
      if (!save) {
        throw new Error("Product not added");
      }
    } else {
      const productPresentOnIndex = cart.cart_items.findIndex(
        (item) => item.product._id == req.body.product
      );

      if (productPresentOnIndex == -1) {
        cart.cart_items.push({
          product: req.body.product,
          quantity: req.body.quantity > 0 ? req.body.quantity : 0,
        });
        const saved = await cart.save();
        if (!saved) {
          throw new Error("Product not added");
        }
      } else {
        cart.cart_items[productPresentOnIndex].quantity =
          cart.cart_items[productPresentOnIndex].quantity + req.body.quantity >
          0
            ? cart.cart_items[productPresentOnIndex].quantity +
              req.body.quantity
            : 0;
        const saved = await cart.save();
        if (!saved) {
          throw new Error("Product not added");
        }
      }
    }
    updatedItems = cart.cart_items.filter((item) => item.quantity != 0);
    cart.cart_items = updatedItems;
    const updatedCart = await cart.save();
    if(!updatedCart){
      throw new Error("Product not added");
    }
    res.status(200).send({
      message: "Product added Cart",
      data: cart,
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});
CartRoute.get("/cart", UserAuthGuard, async (req, res) => {
  try {
    let cart = await CartModel.findOne({ user: req.user._id }).populate({
      path: "cart_items",
      populate: {
        path: "product",
      },
    });
    if (!cart) {
      throw new Error("Cart not found");
    }
    res.status(200).send({ message: "Cart Fetched", data: cart });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});
module.exports = CartRoute;
