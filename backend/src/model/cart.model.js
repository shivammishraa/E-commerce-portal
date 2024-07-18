const mongoose = require("mongoose");
const CartSchema = new mongoose.Schema({
  cart_items: [
    {
      product: {
        type: mongoose.Types.ObjectId,
        ref: "Products",
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  user: {
    type: mongoose.Types.ObjectId,
    ref: "Users",
  },
});
const CartModel = new mongoose.model("cart", CartSchema);
module.exports = CartModel;
