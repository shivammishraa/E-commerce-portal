const express = require("express");
const UserRoutes = new express.Router();
const UserModel = require("../model/user.model");
UserRoutes.post("/sign-up", async (req, res) => {
  try {
    const user = await new UserModel({ ...req.body, admin: false });
    if (!user) {
      throw new Error("User not Created");
    }
    const saved = await user.save();
    if (!saved) {
      throw new Error("User not created");
    }
    res.status(201).send({
      message: "User Created Successfully",
      data: null,
    });
  } catch (err) {
    res.status(403).send({ message: err.message });
  }
});
UserRoutes.post("/login", async (req, res) => {
  try {
    const user = await UserModel.FindByCred(req.body.email, req.body.password);
    if (!user) {
      throw new Error("Login Again");
    }
    const token = await user.generateToken();
    if (!token) {
      throw new Error("Login Again");
    }
    res.status(200).send({
      message: "Login Successfully",
      data: user,
    });
  } catch (err) {
    res.status(403).send({ message: err.message });
  }
});
UserRoutes.post("/create-admin", async (req, res) => {
  try {
    console.log("Hello from admin");
    const user = await new UserModel({ ...req.body, admin: true });
    if (!user) {
      throw new Error("User not Created");
    }
    const saved = await user.save();
    if (!saved) {
      throw new Error("User not created");
    }
    res.status(201).send({
      message: "Admin Created Successfully",
      data: null,
    });
  } catch (err) {
    res.status(403).send({ message: err.message });
  }
});
module.exports = UserRoutes;
