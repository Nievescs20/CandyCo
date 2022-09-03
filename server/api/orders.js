const router = require("express").Router();
const {
  models: { Order, Product, User, OrderProduct },
} = require("../db");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      attributes: ["id", "isOpen", "orderStatus"],
      include: [
        {
          model: Product,
          as: "products",
        },
        {
          model: User,
          as: "user",
          attributes: ["id", "firstName", "lastName", "email"],
        },
      ],
    });
    res.json(orders);
  } catch (err) {
    next(err);
  }
});

// get ALL orders for user with userId
router.get("/user/:userId", async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      attributes: ["id", "isOpen", "orderStatus"],
      include: [
        {
          model: Product,
          as: "products",
        },
        {
          model: User,
          as: "user",
          attributes: ["id", "firstName", "lastName", "email"],
          where: {
            id: req.params.userId,
          },
        },
      ],
    });

    res.json(orders);
  } catch (err) {
    next(err);
  }
});

// get OPEN orders for user with userId
router.get("/user/:userId/open", async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      attributes: ["id", "isOpen", "orderStatus"],
      where: { isOpen: true },
      include: [
        {
          model: Product,
          as: "products",
        },
        {
          model: User,
          as: "user",
          attributes: ["id", "firstName", "lastName", "email"],
          where: {
            id: req.params.userId,
          },
        },
      ],
    });
    res.json(orders);
  } catch (err) {
    next(err);
  }
});

// get CLOSED orders for user with userId
router.get("/user/:userId/closed", async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      attributes: ["id", "isOpen", "orderStatus"],
      where: { isOpen: false },
      include: [
        {
          model: Product,
          as: "products",
        },
        {
          model: User,
          as: "user",
          attributes: ["id", "firstName", "lastName", "email"],
          where: {
            id: req.params.userId,
          },
        },
      ],
    });
    res.json(orders);
  } catch (err) {
    next(err);
  }
});

router.post("/create", async (req, res, next) => {
  const userId = req.body.userId;

  try {
    const [order, created] = await Order.findOrCreate({
      where: { userId, orderStatus: "In-Cart" },
    });

    res.json(order);
  } catch (err) {
    next(err);
  }
});

router.put("/update/orderStatus/:orderId", async (req, res, next) => {
  const orderId = req.params.orderId;

  try {
    const InCartOrder = await Order.findByPk(orderId, {
      where: { orderStatus: "In-Cart" },
    });

    const updatedOrder = await InCartOrder.update({
      orderStatus: "Processing",
    });

    res.json(updatedOrder);
  } catch (error) {
    next(error);
  }
});

router.put("/update", async (req, res, next) => {
  const orderId = req.body[0].orderId;

  try {
    await OrderProduct.destroy({
      where: {
        orderId,
      },
    });

    await Promise.all(
      req.body.map((item) => {
        OrderProduct.create(item);
      })
    );

    res.json(req.body);
  } catch (err) {
    next(err);
  }
});

router.delete("/delete/:orderId", async (req, res, next) => {
  const orderId = req.params.orderId;

  console.log(orderId);

  try {
    await OrderProduct.destroy({
      where: {
        orderId,
      },
    });

    await Order.destroy({
      where: {
        id: orderId,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.delete(
  "/delete/:orderId/product-delete/:productId",
  async (req, res, next) => {
    const orderId = req.params.orderId;
    const productId = req.params.productId;

    try {
      await OrderProduct.destroy({
        where: {
          orderId,
          productId,
        },
      });

      const orderProducts = await OrderProduct.findAll({
        where: {
          orderId,
        },
      });

      if (!orderProducts.length) {
        await Order.destroy({
          where: {
            id: orderId,
          },
        });
      }

      res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  }
);
