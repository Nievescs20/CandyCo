"use strict";

const {
  db,
  models: { User, Product, OrderProduct, Order, Shipping },
} = require("../server/db");

const users = [
  {
    email: "kakarot@gmail.com",
    password: "chichi",
    firstName: "Goku",
    lastName: "Son",
    isAdmin: true,
  },
  {
    email: "saiyanhonor@gmail.com",
    password: "bulma",
    firstName: "Vegeta",
    lastName: "Vegeta",
    isAdmin: true,
  },
  {
    email: "ssayaman@gmail.com",
    password: "marin",
    firstName: "Gohan",
    lastName: "Son",
    isAdmin: false,
  },
  {
    email: "foreveralone@gmail.com",
    password: "single",
    firstName: "Yamcha",
    lastName: "Yamcha",
    isAdmin: false,
  },
  {
    email: "thirdeyeblind@gmail.com",
    password: "chiaotzu",
    firstName: "Tien",
    lastName: "Shinahn",
    isAdmin: false,
  },
  {
    email: "tallman@gmail.com",
    password: "tien",
    firstName: "Chiaotzu",
    lastName: "Chiaotzu",
    isAdmin: false,
  },
  {
    email: "mynameismark@gmail.com",
    password: "ilovebu",
    firstName: "Hercule",
    lastName: "Satan",
    isAdmin: false,
  },
  {
    email: "fromthefuture@gmail.com",
    password: "tastyandroids",
    firstName: "Cell",
    lastName: "Cell",
    isAdmin: false,
  },
  {
    email: "halfgotenks@gmail.com",
    password: "kidtrunks",
    firstName: "Trunks",
    lastName: "Vegeta",
    isAdmin: false,
  },
  {
    email: "otherhalfgotenks@gmail.com",
    password: "studysaiyan",
    firstName: "Goten",
    lastName: "Son",
    isAdmin: false,
  },
  {
    email: "immortality@gmail.com",
    password: "damnyougoku",
    firstName: "Freeza",
    lastName: "Freeza",
    isAdmin: false,
  },
  {
    email: "marronsmama@gmail.com",
    password: "kirllin<3",
    firstName: "Android",
    lastName: "18",
    isAdmin: false,
  },
  {
    email: "zookeeper@gmail.com",
    password: "animallover@gmail.com",
    firstName: "Android",
    lastName: "17",
    isAdmin: false,
  },
];

const products = [
  {
    name: "CREEPY CANDY COFFIN",
    description: "Coffin Shaped box of gummy body parts!",
    price: 10.0,
    imageUrl:
      "https://cdn.shopify.com/s/files/1/0150/8992/6198/products/20220613-By-Asha-Fuller-DCB-0034_836x.jpg?v=1661192633",
    imageUrl2:
      "https://cdn.shopify.com/s/files/1/0150/8992/6198/products/20220613-By-Asha-Fuller-DCB-0036_836x.jpg?v=1661192633",
    quantity: 100,
    mainCategory: "Halloween",
    subCategory: "Gummy",
    reviews: Math.floor(Math.random() * 200),
  },
  {
    name: "HALLOWEEN SURPRISE SMASH PUMPKIN",
    description: "Halloweens hottest treat is a serious *SMASH*",
    price: 70.0,
    imageUrl:
      "https://cdn.shopify.com/s/files/1/0150/8992/6198/products/20220614-By-Asha-Fuller-DCB0040_836x.jpg?v=1660147193",
    imageUrl2:
      "https://cdn.shopify.com/s/files/1/0150/8992/6198/products/20220614-By-Asha-Fuller-DCB0050_836x.jpg?v=1660147193",
    quantity: 100,
    mainCategory: "Halloween",
    subCategory: "Mix",
    reviews: Math.floor(Math.random() * 200),
  },
  {
    name: "MONSTER MASH CRISPY POP",
    description:
      "This chocolate-covered Rice Crispy Treat is definitely more sweet than scary",
    price: 70.0,
    imageUrl:
      "https://cdn.shopify.com/s/files/1/0150/8992/6198/products/20220613-By-Asha-Fuller-DCB-0055_836x.jpg?v=1660076741",
    imageUrl2:
      "https://cdn.shopify.com/s/files/1/0150/8992/6198/products/20220613-By-Asha-Fuller-DCB-0060_836x.jpg?v=1660076758",
    quantity: 100,
    mainCategory: "Halloween",
    subCategory: "Baked Good",
    reviews: Math.floor(Math.random() * 200),
  },
  {
    name: "GRAVEYARD GRUB MIX",
    description:
      "This monster popcorn candy mix is sweet, salty, and so Halloween-ready!",
    price: 70.0,
    imageUrl:
      "https://cdn.shopify.com/s/files/1/0150/8992/6198/products/20220803-By-Asha-Fuller-DCB-0095_836x.jpg?v=1661183435",
    imageUrl2:
      "https://cdn.shopify.com/s/files/1/0150/8992/6198/products/20220803-By-Asha-Fuller-DCB-0100_836x.jpg?v=1661183435",
    quantity: 100,
    mainCategory: "Halloween",
    subCategory: "Snack",
    reviews: Math.floor(Math.random() * 200),
  },
  {
    name: "7 ½” GUMMY BEAR BANK WITH GUMMY BEARS",
    description:
      "Giant bear container filled with chewy, fruity gummy bears is a perfect gift!",
    price: 22.0,
    imageUrl:
      "https://cdn.shopify.com/s/files/1/0150/8992/6198/products/11193-PRODUCT_01-500_500-1520266471897_fe05b6b7-8eee-441e-a05f-8dcef343e9f2_836x.png?v=1586438802",
    imageUrl2:
      "https://cdn.shopify.com/s/files/1/0150/8992/6198/products/DCB_2020_SignatureMixes_CupcakeFilledwithGummyBears-4_836x.jpg?v=1648573267",
    quantity: 100,
    mainCategory: "Gummy",
    subCategory: "Gummy",
    reviews: Math.floor(Math.random() * 200),
  },
  {
    name: "NOSTALGIA GIFT BUCKET",
    description:
      "This retro candy gift box is packed with vintage-style treats from the past",
    price: 75.0,
    imageUrl:
      "https://cdn.shopify.com/s/files/1/0150/8992/6198/products/8928-PRODUCT_01-500_500-1424881876723_01bc4005-c559-455d-a648-5d03bf8aec6c_836x.png?v=1565185061",
    imageUrl2:
      "https://cdn.shopify.com/s/files/1/0150/8992/6198/products/8928-PRODUCT_03-500_500-1424438648917_a1843665-1eed-4a52-aa1e-aa77fe291aa2_836x.png?v=1565185061",
    quantity: 100,
    mainCategory: "Bulk",
    subCategory: "Bulk",
    reviews: Math.floor(Math.random() * 200),
  },
  {
    name: "BEST OF DYLAN'S CANDY BAR GIFT BASKET",
    description:
      "This ultimate goodie basket has all our Dylan’s Candy Bar faves and will satisfy anyone’s sweet tooth",
    price: 100.0,
    imageUrl:
      "https://cdn.shopify.com/s/files/1/0150/8992/6198/products/2019-12-05-DCB-AF11886_836x.jpg?v=1576675249",
    imageUrl2:
      "https://cdn.shopify.com/s/files/1/0150/8992/6198/products/2019-12-05-DCB-AF11889_836x.jpg?v=1648569770",
    quantity: 100,
    mainCategory: "Bulk",
    subCategory: "Bulk",
    reviews: Math.floor(Math.random() * 200),
  },
  {
    name: "CHOCOLATE LOVERS GIFT BASKET",
    description: "Chocolate, chocolate and more chocolate!",
    price: 75.0,
    imageUrl:
      "https://cdn.shopify.com/s/files/1/0150/8992/6198/products/DCB_2020_Baskets_ChocolateLoversBucket_02_836x.jpg?v=1604446787",
    imageUrl2:
      "https://cdn.shopify.com/s/files/1/0150/8992/6198/products/DCB_2020_Baskets_ChocolateLoversBucket_03_836x.jpg?v=1604446787",
    quantity: 100,
    mainCategory: "Bulk",
    subCategory: "Bulk",
    reviews: Math.floor(Math.random() * 200),
  },
  {
    name: "ULTIMATE TUB OF FUN",
    description:
      "Stuffed with sweets like Swedish Fish®, Runts®, Gobstoppers®, Nerds®, WARHEADS® & more!",
    price: 22.0,
    imageUrl:
      "https://cdn.shopify.com/s/files/1/0150/8992/6198/products/DCB_2021_Gifting_UltimatePartyInABucket_2-KS-EDITED_836x.jpg?v=1630071222",
    imageUrl2:
      "https://cdn.shopify.com/s/files/1/0150/8992/6198/products/20210610-By-Asha-Fuller-DCB-0052-KS-EDITED_836x.jpg?v=1648569880",
    quantity: 100,
    mainCategory: "Bulk",
    subCategory: "Bulk",
    reviews: Math.floor(Math.random() * 200),
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
