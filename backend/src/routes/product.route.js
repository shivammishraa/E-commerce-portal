const express = require("express");
const ProductRoutes = new express.Router();
const AdminAuthGuard = require("../middleware/admin-middleware");
const ProductModel = require("../model/product.model");
ProductRoutes.post("/product", AdminAuthGuard, async (req, res) => {
  try {
    const product = await new ProductModel(req.body);
    if (!product) {
      throw new Error("Product not added");
    }
    const saved = await product.save();
    if (!saved) {
      throw new Error("Product not added");
    }
    res.status(201).send({
      message: "Product Added",
      data: product,
    });
  } catch (err) {
    res.status(403).send({
      message: err.message,
    });
  }
});
ProductRoutes.get(`/product`, async (req, res) => {
  try {
    const product = await ProductModel.find();
    if (!product) {
      throw new Error("Product not Found");
    }
    res.status(200).send({ message: "Products Fetched", data: product });
  } catch (err) {
    res.status(403).send({ message: err.message });
  }
});
ProductRoutes.delete(`/product/:id`, AdminAuthGuard, async (req, res) => {
  try {
    const id = req.params.id;
    const product = await ProductModel.findByIdAndDelete(id);
    if (!product) {
      throw new Error("Product was not deleted");
    }
    res.status(200).send({
      message: "Product Deleted",
      data: null,
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});
ProductRoutes.patch(`/product/:id`, AdminAuthGuard, async (req, res) => {
  try {
    const id = req.params.id;
    const objectsKeys = Object.keys(req.body);
    const product = await ProductModel.findById(id);
    if (!product) {
      throw new Error("Invalid product ID");
    }
    objectsKeys.map((keys) => (product[keys] = req.body[keys]));
    const saved = await product.save();
    if (!saved) {
      throw new Error("Product not modified");
    }
    res.status(200).send({ message: "Product Modified", data: product });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});
ProductRoutes.get(`/product/:id`, AdminAuthGuard, async (req, res) => {
  try {
    const id = req.params.id;
    const product = await ProductModel.findById(id);
    if (!product) {
      throw new Error("Invalid product ID");
    }
    res.status(200).send({ message: "Product Fetched", data: product });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});
module.exports = ProductRoutes;
