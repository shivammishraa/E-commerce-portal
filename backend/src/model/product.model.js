const mongoose = require("mongoose");
const ProductSchema = new mongoose.Schema({
  product_name: {
    type: String,
    required: true,
  },
  product_price: {
    type: Number,
    required: true,
  },
  product_image: {
    type: String,
    required: true,
  },
  product_details: {
    type: String,
    required: true,
  },
});
const ProductModel = new mongoose.model("Products", ProductSchema);
module.exports = ProductModel;
