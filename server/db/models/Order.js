const Sequelize = require("sequelize");
const db = require("../db");

const Order = db.define("order", {
  isOpen: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
  },
  orderStatus: {
    type: Sequelize.ENUM(
      "Canceled",
      "Processing",
      "Shipping",
      "Delivered",
      "In-Cart"
    ),
    defaultValue: "In-Cart",
  },
});

module.exports = Order;
