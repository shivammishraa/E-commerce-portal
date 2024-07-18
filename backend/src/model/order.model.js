const mongoose = require("mongoose");
const OrderSchema = new mongoose.Schema({
  product_item: [
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
    required: true,
  },
  order_status: {
    type: String,
    required: true,
  },
  order_price: {
    type: Number,
    required: true,
  },
});
const OrderModel = new mongoose.model("Orders", OrderSchema);
module.exports = OrderModel;
