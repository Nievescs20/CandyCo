const router = require("express").Router();
const {
  models: { Product, User },
} = require("../db");
const { Op } = require("sequelize");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (err) {
    next(err);
  }
});

router.get("/bulk", async (req, res, next) => {
  try {
    const products = await Product.findAll({
      where: {
        mainCategory: "Bulk",
      },
    });
    res.json(products);
  } catch (err) {
    next(err);
  }
});

router.get("/gift", async (req, res, next) => {
  try {
    const products = await Product.findAll({
      where: {
        mainCategory: "Gift",
      },
    });
    res.json(products);
  } catch (err) {
    next(err);
  }
});

router.get("/halloween", async (req, res, next) => {
  try {
    const products = await Product.findAll({
      where: {
        mainCategory: "Halloween",
      },
    });
    res.json(products);
  } catch (err) {
    next(err);
  }
});

router.get("/sale", async (req, res, next) => {
  try {
    const products = await Product.findAll({
      where: {
        mainCategory: "Sale",
      },
    });
    res.json(products);
  } catch (err) {
    next(err);
  }
});

// router.get("/category/:category", async (req, res, next) => {
//   try {
//     const category = req.params.category;
//     if (category === "Action-Figure") {
//       const products = await Product.findAll({
//         where: { subCategory: "Action-Figure" },
//       });
//       res.json(products);
//     } else if (category === "Clothing") {
//       const products = await Product.findAll({
//         where: { mainCategory: "Clothing" },
//       });
//       res.json(products);
//     } else if (category === "Media") {
//       const products = await Product.findAll({
//         where: { mainCategory: "Media" },
//       });
//       res.json(products);
//     } else if (category === "low-stock") {
//       const products = await Product.findAll({
//         where: { inventory: { [Op.between]: [1, 60] } },
//       });
//       res.json(products);
//     } else {
//       res.status(404).send("Not Found");
//     }
//   } catch (err) {
//     next(err);
//   }
// });

router.get("/:productId", async (req, res, next) => {
  try {
    const productId = req.params.productId;
    const product = await Product.findByPk(productId);
    res.json(product);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.body.token);
    if (user && user.isAdmin) {
      res.status(201).send(await Product.create(req.body));
    } else {
      const error = Error("Not authorized to add product");
      error.status = 401;
      throw error;
    }
  } catch (err) {
    next(err);
  }
});

router.delete("/:productId", async (req, res, next) => {
  try {
    console.log("delete req.headers", req.headers);
    const user = await User.findByToken(req.headers.authorization);
    const product = await Product.findByPk(req.params.productId);
    if (user && user.isAdmin) {
      if (product) {
        await product.destroy();
        res.status(204).send(product);
      } else {
        res.status(404).send("Not Found");
      }
    } else {
      const error = Error("Not authorized to delete product");
      error.status = 401;
      throw error;
    }
  } catch (err) {
    next(err);
  }
});

router.put("/:productId", async (req, res, next) => {
  try {
    console.log("put req.body", req.body);
    const user = await User.findByToken(req.body.token);
    const product = await Product.findByPk(req.params.productId);
    if (user && user.isAdmin) {
      if (product) {
        res.send(await product.update(req.body));
      } else {
        res.status(404).send("Not Found");
      }
    } else {
      const error = Error("Not authorized to edit product");
      error.status = 401;
      throw error;
    }
  } catch (err) {
    next(err);
  }
});
