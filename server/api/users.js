const router = require("express").Router();
const { User } = require("../db");

router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.status(200).send(users);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
