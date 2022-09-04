const router = require("express").Router();
const {
  models: { User, Order, Product, OrderProduct },
} = require("../db");
const { requireToken } = require("./middleware");

router.get("/", requireToken, async (req, res, next) => {
  try {
    let order = await Order.findOne({
      where: {
        userId: req.user.dataValues.id,
        status: "open",
      },
    });
    if (!order) {
      order = await Order.create({
        status: "open",
        userId: req.user.dataValues.id,
      });
    }

    res.send(
      await Order.findOne({
        where: {
          id: order.id,
        },
        include: [Product],
        order: [[Product, "id", "desc"]], // adding order by so the result will not jump around
      })
    );
  } catch (ex) {
    next(ex);
  }
});

router.post("/", requireToken, async (req, res, next) => {
  try {
    console.log("req.body", req.body);
    // step 1: find or create the order
    let order = await Order.findOne({
      where: {
        userId: req.user.dataValues.id,
        status: "open",
      },
    });
    if (!order) {
      order = await Order.create({
        status: "open",
        userId: req.user.dataValues.id,
      });
    }

    // step 2: check whether this item is already in the cart
    let product = await OrderProduct.findOne({
      where: {
        orderId: order.id,
        productId: req.body.productId,
      },
    });
    // allowing user to add same item multiple times
    console.log("product", product);
    if (product) {
      const newQuantity = product.quantity + parseInt(req.body.quantity);
      const newCost = product.totalPrice + req.body.totalPrice;
      await product.update({
        quantity: newQuantity,
        totalCost: newCost,
      });
    } else {
      await OrderProduct.create({
        orderId: order.id,
        productId: req.body.productId,
        quantity: req.body.quantity,
        totalPrice: req.body.totalPrice,
      });
    }
    // step3: send back entire order
    res.send(
      await Order.findOne({
        where: {
          id: order.id,
        },
        include: [Product],
        order: [[Product, "id", "desc"]],
      })
    );
  } catch (error) {
    next(error);
  }
});

module.exports = router;
