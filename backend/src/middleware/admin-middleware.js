const jwt = require("jsonwebtoken");
const UserModel = require("../model/user.model");
const AdminAuth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    if (!token) {
      throw new Error("Please Login");
    }
    const decode = await jwt.decode(
      token,
      "UniqueTokenStringForDemoApplication"
    );
    const adminUser = await UserModel.findOne({
      _id: decode._id,
      token: token,
      admin: true,
    });
    if (!adminUser) {
      throw new Error("Token Expired,Login Again");
    }
    req.user = adminUser;
    next();
  } catch (err) {
    res.status(401).send({
      error: err.message,
    });
  }
};
module.exports = AdminAuth;
