const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone_number: { type: Number, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  admin: {
    type: Boolean,
    required: true,
  },
  access_token: {
    type: String,
  },
});

UserSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcryptjs.hash(user.password, 8);
  }
  next();
});
UserSchema.statics.FindByCred = async (email, password) => {
  const user = await UserModel.findOne({ email: email });

  if (!user) {
    throw new Error("User not Found");
  }

  const matched = await bcryptjs.compare(password, user.password);

  if (!matched) {
    throw new Error("Invalid Password");
  }
  return user;
};
UserSchema.methods.generateToken = async function () {
  const user = this;
  const token = await jwt.sign(
    { _id: user._id },
    "UniqueTokenStringForDemoApplication"
  );
  if (!token) {
    throw new Error("Please Login Again");
  }

  user.access_token = token;
  await user.save();
  return token;
};
UserSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();
  delete userObject.password;
  return userObject;
};
const UserModel = new mongoose.model("Users", UserSchema);
module.exports = UserModel;
