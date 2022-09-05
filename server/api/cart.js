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
      await OrderProduct.findAll({
        order: ["orderId"], // adding order by so the result will not jump around
        where: {
          orderId: order.id,
        },
      })
    );
  } catch (ex) {
    next(ex);
  }
});

router.post("/", requireToken, async (req, res, next) => {
  try {
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
    if (product) {
      const newQuantity = product.quantity + parseInt(req.body.quantity);
      const newCost = Number(product.totalPrice) + req.body.totalPrice;
      await product.update({
        quantity: newQuantity,
        totalPrice: newCost,
      });
    } else {
      await OrderProduct.create({
        orderId: order.id,
        hello: req.body.productId,
        productId: req.body.productId,
        productName: req.body.productName,
        imageUrl: req.body.imageUrl,
        quantity: req.body.quantity,
        price: req.body.price,
        totalPrice: req.body.totalPrice,
      });
    }
    // step3: send back entire order
    res.send(
      await OrderProduct.findAll({
        where: {
          orderId: order.id,
        },
        order: [["createdAt", "asc"]],
      })
    );
  } catch (error) {
    next(error);
  }
});

router.post("/deleteItem", requireToken, async (req, res, next) => {
  try {
    let order = await Order.findOne({
      where: {
        userId: req.user.dataValues.id,
        status: "open",
      },
    });

    let product = await OrderProduct.findOne({
      where: {
        orderId: order.id,
        productId: req.body.productId,
      },
    });

    await product.destroy();

    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
