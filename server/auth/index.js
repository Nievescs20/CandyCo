const router = require("express").Router();
const User = require("../db/models/User");

router.post("/login", async (req, res, next) => {
  try {
    res.send({
      token: await User.authenticate({
        email: req.body.username,
        password: req.body.password,
      }),
    });
  } catch (err) {
    next(err);
  }
});

router.post("/signup", async (req, res, next) => {
  try {
    const { username, password, firstName, lastName } = req.body;
    const user = await User.create({
      email: username,
      password,
      firstName,
      lastName,
    });
    res.send({ token: await user.generateToken() });
  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError") {
      res.status(401).send("User already exists");
    } else {
      next(err);
    }
  }
});

router.get("/me", async (req, res, next) => {
  try {
    res.send(await User.findByToken(req.headers.authorization));
  } catch (ex) {
    next(ex);
  }
});

router.put("/me", async (req, res, next) => {
  try {
    const users = await User.findByToken(req.headers.authorization);
    const { username, firstName, lastName, email, address } = req.body;
    res.send(
      await users.update({ username, firstName, lastName, email, address })
    );
  } catch (ex) {
    next(ex);
  }
});

module.exports = router;
