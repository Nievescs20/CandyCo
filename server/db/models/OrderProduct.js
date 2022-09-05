const Sequelize = require("sequelize");
const db = require("../db");

const OrderProduct = db.define("orderProduct", {
  productName: {
    type: Sequelize.STRING,
  },
  imageUrl: {
    type: Sequelize.STRING,
  },
  price: {
    type: Sequelize.DECIMAL(10, 2),
  },
  quantity: {
    type: Sequelize.INTEGER,
    defualtValue: 1,
  },
  totalPrice: {
    type: Sequelize.DECIMAL(10, 2),
  },
});

module.exports = OrderProduct;
