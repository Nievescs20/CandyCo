const Sequelize = require("sequelize");
const db = require("../db");

const OrderProduct = db.define("orderProduct", {
  quantity: {
    type: Sequelize.INTEGER,
    defualtValue: 1,
  },
  totalPrice: {
    type: Sequelize.DECIMAL(10, 2),
  },
});

// OrderProduct.beforeValidate(
//   (orderProduct) =>
//     (orderProduct.totalPrice = orderProduct.price * orderProduct.quantity)
// );

module.exports = OrderProduct;
