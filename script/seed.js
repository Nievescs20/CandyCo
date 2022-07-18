"use strict";

const { db, User, Product } = require("../server/db");

const users = [
  {
    username: "SonGoku",
    password: "chichi",
    email: "kakarot@gmail.com",
  },
  {
    username: "PrinceVegeta",
    password: "bulma",
    email: "saiyanhonor@gmail.com",
    role: "admin",
  },
];

const products = [
  {
    name: "Son Goku Action Figure",
    description: "Goku Figurine",
    price: 22.99,
    imageUrl:
      "https://target.scene7.com/is/image/Target/GUEST_232d2b10-81eb-4016-8f3e-df68270643e8",
    quantity: 100,
    mainCategory: "Collectable",
    subCategory: "Action Figure",
    reviews: Math.floor(Math.random() * 200),
  },
  {
    name: "Vegeta Action Figure",
    description: "Vegeta Figurine",
    price: 22.99,
    imageUrl: "https://i.ebayimg.com/images/g/IUgAAOSwe5ZiGeAF/s-l400.jpg",
    quantity: 100,
    mainCategory: "Collectable",
    subCategory: "Action Figure",
    reviews: Math.floor(Math.random() * 200),
  },
  {
    name: "Picolo Action Figure",
    description: "Picolo Figurine",
    price: 22.99,
    imageUrl: "https://i.ebayimg.com/images/g/XeUAAOSwOztccAta/s-l400.jpg",
    quantity: 100,
    mainCategory: "Collectable",
    subCategory: "Action Figure",
    reviews: Math.floor(Math.random() * 200),
  },
  {
    name: "Gohan Action Figure",
    description: "Gohan Figurine",
    price: 22.99,
    imageUrl:
      "https://target.scene7.com/is/image/Target/GUEST_3c240bc4-ab8d-4c93-9d52-e80d3c0f4dd9",
    quantity: 100,
    mainCategory: "Collectable",
    subCategory: "Action Figure",
    reviews: Math.floor(Math.random() * 200),
  },
  {
    name: "Krillin",
    description: "Krillin Figurine",
    price: 22.99,
    imageUrl:
      "https://target.scene7.com/is/image/Target/GUEST_8f8ef81d-2e46-4310-b7b5-5bddca5d7624",
    quantity: 100,
    mainCategory: "Collectable",
    subCategory: "Action Figure",
    reviews: Math.floor(Math.random() * 1000),
  },
];
/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  await Promise.all(
    users.map((user) => {
      return User.create(user);
    })
  );

  await Promise.all(
    products.map((product) => {
      return Product.create(product);
    })
  );

  console.log(`seeded successfully`);
}

async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
