const sequelize = require("sequelize");
const Sequelize = require("sequelize");
const db = require("../db");

const Product = db.define("product", {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  fullDescription: {
    type: Sequelize.TEXT,
    allowNull: false,
    defaultValue:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  price: {
    type: Sequelize.DECIMAL(10, 2),
    defaultValue: 1,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue:
      "https://target.scene7.com/is/image/Target/GUEST_a9af3b2a-1266-47eb-8dee-cc5abc667d28",
  },
  imageUrl2: {
    type: Sequelize.STRING,
    defaultValue:
      "http://cdn.shopify.com/s/files/1/1140/8354/collections/Dragon_Ball_z_400.png?v=1588174725",
  },
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  highlight1: {
    type: Sequelize.STRING,
    defaultValue:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
  },
  highlight2: {
    type: Sequelize.STRING,
    defaultValue: "Curabitur gravida arcu ac tortor",
  },
  highlight3: {
    type: Sequelize.STRING,
    defaultValue:
      "Sed adipiscing diam donec adipiscing tristique risus nec feugiat",
  },
  mainCategory: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  subCategory: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  reviews: {
    type: sequelize.INTEGER,
    defaultValue: Math.floor(Math.random() * 100),
  },
});

module.exports = Product;
