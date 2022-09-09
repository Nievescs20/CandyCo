const Sequelize = require("sequelize");
const db = require("../db");

const OrderHistory = db.define("orderHistory", {
  customerId: {
    type: Sequelize.INTEGER,
  },
  orderNumber: {
    type: Sequelize.INTEGER,
  },
  customerName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  customerEmail: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  total: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false,
  },
});

module.exports = OrderHistory;
