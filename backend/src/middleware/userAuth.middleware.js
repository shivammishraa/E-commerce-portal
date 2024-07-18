const jwt = require("jsonwebtoken");
const UserModel = require("../model/user.model");
const UserAuth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    if (!token) {
      throw new Error("Please Login");
    }
    const decode = await jwt.decode(
      token,
      "UniqueTokenStringForDemoApplication"
    );
    const user = await UserModel.findOne({
      _id: decode._id,
      token: token,
      admin: false,
    });

    if (user == null) {
      throw new Error("Token Expired,Login Again");
    } else if (!user) {
      throw new Error("Token Expired,Login Again");
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(401).send({
      error: err.message,
    });
  }
};
module.exports = UserAuth;
