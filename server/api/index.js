const router = require("express").Router();
module.exports = router;

router.use("/users", require("./users"));
router.use("/products", require("./products"));
router.use("/orders", require("./orders"));
router.use("/cart", require("./cart"));
router.use("/payments", require("./payments"));
router.use("/stripe", require("./stripe"));

router.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});
