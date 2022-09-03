const router = require("express").Router();
const {
  models: { Shipping },
} = require("../db");
const User = require("../db/models/User");
module.exports = router;

router.get("/:userId", async (req, res, next) => {
  try {
    const userId = req.params.userId;

    const shipping = await Shipping.findOne({
      where: { userId },
      include: [
        {
          model: User,
          as: "user",
        },
      ],
    });
    res.json(shipping);
  } catch (err) {
    next(err);
  }
});

router.post("/create", async (req, res, next) => {
  try {
    const newShipping = await Shipping.create(req.body);

    res.json(newShipping);
  } catch (err) {
    next(err);
  }
});

router.put("/update", async (req, res, next) => {
  const userId = req.body.userId;

  try {
    await Shipping.destroy({
      where: {
        userId,
      },
    });

    const updatedShipping = await Shipping.create(req.body);

    res.json(updatedShipping);
  } catch (err) {
    next(err);
  }
});
