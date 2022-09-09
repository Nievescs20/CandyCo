const db = require("./db");
const User = require("./models/User");
const Product = require("./models/Product");
const OrderProduct = require("./models/OrderProduct");
const Order = require("./models/Order");
const OrderHistory = require("./models/OrderHistory");

Order.belongsToMany(Product, { through: OrderProduct });
Product.belongsToMany(Order, { through: OrderProduct });

User.hasMany(Order);
Order.belongsTo(User);

// User.belongsTo(Shipping);
// Shipping.hasMany(User);

module.exports = {
  db,
  models: {
    User,
    Product,
    OrderProduct,
    Order,
    OrderHistory,
  },
};
