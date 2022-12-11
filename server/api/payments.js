const router = require("express").Router();
const { v4: uuid } = require("uuid");
const stripeKey = process.env.STRIPE;
// const {BACKENDKEY} = require('../../webkeys');
// require('dotenv').config()
const stripe = require("stripe")(
  "sk_test_51LfnXoEpCZl0D0FK1mp4ni0XudoAKPcXVyZyl47FmUnAJmpN86xzmVXQV5P3VQTgAHSZK5YcMwwjGXk8kmsK6ssl00YaUC2Zcp"
);

router.post("/", async (req, res) => {
  let error;
  let status;
  try {
    const { product, token } = req.body;

    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    const idempotency_key = uuid();
    const charge = await stripe.charges.create(
      {
        amount: product.price * 100,
        currency: "usd",
        customer: customer.id,
        receipt_email: token.email,
        description: product.name,
        shipping: {
          name: token.card.name,
          address: {
            line1: token.card.address_line1,
            line2: token.card.address_line2,
            city: token.card.address_city,
            country: token.card.address_country,
            postal_code: token.card.address_zip,
          },
        },
      },
      {
        idempotency_key,
      }
    );
    status = "success";
  } catch (error) {
    console.error("Error:", error);
    status = "failure";
  }

  res.json({ error, status });
});

module.exports = router;
