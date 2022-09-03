const Sequelize = require("sequelize");
const db = require("../db");

const OrderProduct = db.define("orderProduct", {
  price: {
    type: Sequelize.DECIMAL(10, 2),
  },
  quantity: {
    type: Sequelize.INTEGER,
  },
  totalPrice: {
    type: Sequelize.DECIMAL(10, 2),
  },
});

OrderProduct.beforeValidate(
  (orderProduct) =>
    (orderProduct.totalPrice = orderProduct.price * orderProduct.quantity)
);

module.exports = OrderProduct;
