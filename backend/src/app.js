const express = require("express");
const cors = require("cors");
const app = express();
/* database import */
require("./db/db");
const UserRoutes = require("./routes/user.route");
const ProductRoutes = require("./routes/product.route");
const CartRoute = require("./routes/cart.route");
const OrderRoute = require("./routes/order.route");
app.use(cors());
app.use(express.json());
app.use(UserRoutes);
app.use(ProductRoutes);
app.use(CartRoute);
app.use(OrderRoute);
app.listen(4000, () => {});
