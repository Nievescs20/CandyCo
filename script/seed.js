"use strict";

const {
  db,
  models: { User, Product, OrderProduct, Order, Shipping },
} = require("../server/db");

const users = [
  {
    email: "user@gmail.com",
    password: "123",
    firstName: "test",
    lastName: "user",
    isAdmin: false,
  },
  {
    email: "admin@gmail.com",
    password: "123",
    firstName: "test",
    lastName: "admin",
    isAdmin: true,
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
    mainCategory: "Gift",
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
    mainCategory: "Gift",
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
    mainCategory: "Gift",
    subCategory: "Bulk",
    reviews: Math.floor(Math.random() * 200),
  },
  {
    name: "ULTIMATE TUB OF FUN",
    description:
      "Stuffed with sweets like Swedish Fish®, Runts®, Gobstoppers®, Nerds®, WARHEADS® & more!",
    price: 180.0,
    imageUrl:
      "https://cdn.shopify.com/s/files/1/0150/8992/6198/products/DCB_2021_Gifting_UltimatePartyInABucket_2-KS-EDITED_836x.jpg?v=1630071222",
    imageUrl2:
      "https://cdn.shopify.com/s/files/1/0150/8992/6198/products/20210610-By-Asha-Fuller-DCB-0052-KS-EDITED_836x.jpg?v=1648569880",
    quantity: 100,
    mainCategory: "Gift",
    subCategory: "Bulk",
    reviews: Math.floor(Math.random() * 200),
  },
  {
    name: '5" MINI BEAR BANK WITH SOUR TRIPLE BEARS',
    description:
      "Giant mini bear filled with fruity, marshmallowy Sour Triple Bears is an adorable treat!",
    price: 12.0,
    imageUrl:
      "https://cdn.shopify.com/s/files/1/0150/8992/6198/products/DCB_2021_Gifting_UltimatePartyInABucket_2-KS-EDITED_836x.jpg?v=1630071222",
    imageUrl2:
      "https://cdn.shopify.com/s/files/1/0150/8992/6198/products/ROLLOVERFILL2_836x.jpg?v=1635968657",
    quantity: 100,
    mainCategory: "Gummy",
    subCategory: "Gummy",
    reviews: Math.floor(Math.random() * 200),
  },
  {
    name: "UNDER THE SEA GRAB & GO POUCH",
    description:
      "Under The Sea creature gummy mix is the cutest gift for the sea animal lover",
    price: 7.5,
    imageUrl:
      "https://cdn.shopify.com/s/files/1/0150/8992/6198/products/Grab_Go-UnderTheSea-836x836_836x.jpg?v=1619617603",
    imageUrl2:
      "https://cdn.shopify.com/s/files/1/0150/8992/6198/products/2020-01-23-DCB-AF12406_836x.jpg?v=1619209286",
    quantity: 100,
    mainCategory: "Gummy",
    subCategory: "Gummy",
    reviews: Math.floor(Math.random() * 200),
  },
  {
    name: "SUPER SOUR GRAB & GO POUCH",
    description:
      "Carry your candy in sweet style with this exclusive signature mix of assorted sour candy",
    price: 7.5,
    imageUrl:
      "https://cdn.shopify.com/s/files/1/0150/8992/6198/products/Grab_Go-SuperSourl-836x836_836x.jpg?v=1619208212",
    imageUrl2:
      "https://cdn.shopify.com/s/files/1/0150/8992/6198/products/2020-01-23-DCB-AF12401_836x.jpg?v=1619208212",
    quantity: 100,
    mainCategory: "Gummy",
    subCategory: "Gummy",
    reviews: Math.floor(Math.random() * 200),
  },
  {
    name: "VINTAGE STYLE GUMBALL MACHINE",
    description:
      "This vintage-style gumball machine is a nostalgic gift that's on everyone’s list!",
    price: 75.0,
    imageUrl:
      "https://cdn.shopify.com/s/files/1/0150/8992/6198/products/20220805-By-Asha-Fuller-DCB-0011_836x.jpg?v=1661443480",
    imageUrl2:
      "https://cdn.shopify.com/s/files/1/0150/8992/6198/products/20210719-By-Asha-Fuller-DCB-0022_836x.jpg?v=1661443480",
    quantity: 100,
    mainCategory: "Gift",
    subCategory: "Gumball",
    reviews: Math.floor(Math.random() * 200),
  },
  {
    name: "MEGA CANDY BUTTONS",
    description:
      "Make way for the mega-sized version of the nostalgic candy buttons from your childhood!",
    price: 5.0,
    imageUrl:
      "https://cdn.shopify.com/s/files/1/0150/8992/6198/products/7789-PRODUCT_01-500_500-1414529464582_0024d656-8f27-4b98-a8f3-502d6230d756_836x.png?v=1565185052",
    imageUrl2:
      "https://cdn.shopify.com/s/files/1/0150/8992/6198/products/7789-PRODUCT_02-500_500-1414529468960_de5bcb72-d2ee-450b-9456-c88ad5937d6d_836x.png?v=1565185053",
    quantity: 100,
    mainCategory: "Candy",
    subCategory: "Candy",
    reviews: Math.floor(Math.random() * 200),
  },
  {
    name: "MEGA CANDY NECKLACE",
    description:
      "Accessorize with this giant, colorful and tasty edible candy necklace with nearly 3 feet of stylish sweets.",
    price: 6.5,
    imageUrl:
      "https://cdn.shopify.com/s/files/1/0150/8992/6198/products/9502-PRODUCT_01-500_500-1445271983859_aa2d2f8f-ee69-4484-a405-e3b0e9255fb6_836x.png?v=1564486580",
    imageUrl2:
      "https://cdn.shopify.com/s/files/1/0150/8992/6198/products/9502-PRODUCT_02-500_500-1445271988438_836x.png?v=1564486580",
    quantity: 100,
    mainCategory: "Candy",
    subCategory: "Candy",
    reviews: Math.floor(Math.random() * 200),
  },
  {
    name: "SWEET CANDY HOUSE",
    description:
      "We've upped the ante and stuffed our Sweet Candy House with goodies galore!",
    price: 6.5,
    imageUrl:
      "https://cdn.shopify.com/s/files/1/0150/8992/6198/products/20210610-By-Asha-Fuller-DCB-0021_836x.jpg?v=1624892798",
    imageUrl2:
      "https://cdn.shopify.com/s/files/1/0150/8992/6198/products/20210610-By-Asha-Fuller-DCB-0023_836x.jpg?v=1624892798",
    quantity: 100,
    mainCategory: "Candy",
    subCategory: "Candy",
    reviews: Math.floor(Math.random() * 200),
  },
  {
    name: "SMALL DELUXE CANDY CAKE",
    description:
      "A Small alternative candy bar birthday cake constructed entirely of candy favorites like Hershey’s® Cookies ‘n’ Creme, Twizzlers®, Airheads® and more!",
    price: 100.0,
    imageUrl:
      "https://cdn.shopify.com/s/files/1/0150/8992/6198/products/20211214-By-Asha-Fuller-DCB-0053_836x.jpg?v=1644849886",
    imageUrl2:
      "https://cdn.shopify.com/s/files/1/0150/8992/6198/products/20211214-By-Asha-Fuller-DCB-0055_836x.jpg?v=1644849886",
    quantity: 100,
    mainCategory: "Gift",
    subCategory: "Bulk",
    reviews: Math.floor(Math.random() * 200),
  },
  {
    name: "MEDIUM DELUXE CANDY CAKE",
    description:
      "Our Medium Sized alternative candy bar birthday cake constructed entirely of candy favorites like Hershey’s® Cookies ‘n’ Creme, Twizzlers®, Airheads® and more!",
    price: 150.0,
    imageUrl:
      "https://cdn.shopify.com/s/files/1/0150/8992/6198/products/20211214-By-Asha-Fuller-DCB-0050_836x.jpg?v=1644867005",
    imageUrl2:
      "https://cdn.shopify.com/s/files/1/0150/8992/6198/products/20211214-By-Asha-Fuller-DCB-0052_836x.jpg?v=1644849931",
    quantity: 100,
    mainCategory: "Gift",
    subCategory: "Bulk",
    reviews: Math.floor(Math.random() * 200),
  },
  {
    name: "LARGE DELUXE CANDY CAKE",
    description:
      "Our Largest alternative candy bar birthday cake constructed entirely of candy favorites like Hershey’s® Cookies ‘n’ Creme, Twizzlers®, Airheads® and more!",
    price: 175.0,
    imageUrl:
      "https://cdn.shopify.com/s/files/1/0150/8992/6198/products/20211214-By-Asha-Fuller-DCB-0048_836x.jpg?v=1644867019",
    imageUrl2:
      "https://cdn.shopify.com/s/files/1/0150/8992/6198/products/20211214-By-Asha-Fuller-DCB-0054_836x.jpg?v=1644849983",
    quantity: 100,
    mainCategory: "Gift",
    subCategory: "Bulk",
    reviews: Math.floor(Math.random() * 200),
  },
  {
    name: "MEGA SOUR CANDY BUTTONS",
    description:
      "We've turned this classic treat into a super-sized, totally tart candy experience",
    price: 5.0,
    imageUrl:
      "https://cdn.shopify.com/s/files/1/0150/8992/6198/products/7790-PRODUCT_01-500_500-1414529481244_06c0c710-5ece-4fb9-8102-65e1147c4ca7_836x.png?v=1565185053",
    imageUrl2:
      "https://cdn.shopify.com/s/files/1/0150/8992/6198/products/7790-PRODUCT_02-500_500-1414529485692_a256aa64-7e9a-4b78-b92e-fae7474b93ba_836x.png?v=1565185053",
    quantity: 100,
    mainCategory: "Candy",
    subCategory: "Candy",
    reviews: Math.floor(Math.random() * 200),
  },
  {
    name: "UNBEARABLY AWESOME GRAB & GO POUCH",
    description:
      "Carry your candy in sweet style with this unique, hard-to-find mix of gummy bears",
    price: 7.5,
    imageUrl:
      "https://cdn.shopify.com/s/files/1/0150/8992/6198/products/Grab_Go-UnBearblyAwesome-836x836_836x.jpg?v=1619617605",
    imageUrl2:
      "https://cdn.shopify.com/s/files/1/0150/8992/6198/products/2020-01-23-DCB-AF12408_836x.jpg?v=1619208680",
    quantity: 100,
    mainCategory: "Gummy",
    subCategory: "Gummy",
    reviews: Math.floor(Math.random() * 200),
  },
  {
    name: "OVER THE RAINBOW GRAB & GO POUCH",
    description:
      "Take a rainbow anywhere you go! Full of delicious candies in every shade, this resealable rainbow-colored candy pouch is ready for any adventure",
    price: 7.5,
    imageUrl:
      "https://cdn.shopify.com/s/files/1/0150/8992/6198/products/2020-01-23-DCB-AF12340_836x.jpg?v=1596142416",
    imageUrl2:
      "https://cdn.shopify.com/s/files/1/0150/8992/6198/products/2020-01-23-DCB-AF12393_836x.jpg?v=1596137681",
    quantity: 100,
    mainCategory: "Gummy",
    subCategory: "Gummy",
    reviews: Math.floor(Math.random() * 200),
  },
  {
    name: "JUNK FOOD GRAB & GO POUCH",
    description:
      " Indulge with fast food-shaped gummies and candies like Gummy Cola Bottles, Gummy Fried Eggs, Gummy Hot Dogs and more",
    price: 7.5,
    imageUrl:
      "https://cdn.shopify.com/s/files/1/0150/8992/6198/products/Grab_Go-JunkFood-836x836_e66798fe-0f06-4b9c-a129-53f739c60a54_836x.jpg?v=1619195084",
    imageUrl2:
      "https://cdn.shopify.com/s/files/1/0150/8992/6198/products/2020-01-23-DCB-AF12412_836x.jpg?v=1619195084",
    quantity: 100,
    mainCategory: "Gummy",
    subCategory: "Gummy",
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
