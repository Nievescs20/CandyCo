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
    name: "Son Goku Action Figure",
    description: "Goku Figurine",
    price: 22.99,
    imageUrl:
      "https://target.scene7.com/is/image/Target/GUEST_232d2b10-81eb-4016-8f3e-df68270643e8",
    quantity: 100,
    mainCategory: "Collectable",
    subCategory: "Action-Figure",
    reviews: Math.floor(Math.random() * 200),
  },
  {
    name: "Vegeta Action Figure",
    description: "Vegeta Figurine",
    price: 22.99,
    imageUrl: "https://i.ebayimg.com/images/g/IUgAAOSwe5ZiGeAF/s-l400.jpg",
    quantity: 100,
    mainCategory: "Collectable",
    subCategory: "Action-Figure",
    reviews: Math.floor(Math.random() * 200),
  },
  {
    name: "Picolo Action Figure",
    description: "Picolo Figurine",
    price: 22.99,
    imageUrl: "https://i.ebayimg.com/images/g/XeUAAOSwOztccAta/s-l400.jpg",
    quantity: 100,
    mainCategory: "Collectable",
    subCategory: "Action-Figure",
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
    subCategory: "Action-Figure",
    reviews: Math.floor(Math.random() * 200),
  },
  {
    name: "Krillin Action Figure",
    description: "Krillin Figurine",
    price: 22.99,
    imageUrl:
      "https://target.scene7.com/is/image/Target/GUEST_8f8ef81d-2e46-4310-b7b5-5bddca5d7624",
    quantity: 100,
    mainCategory: "Collectable",
    subCategory: "Action-Figure",
    reviews: Math.floor(Math.random() * 1000),
  },
];

const shippings = [
  {
    address: "123 Redwood Dr",
    city: "Pallet Town",
    country: "USA",
    state: "NY",
    zipcode: "12345",
  },
  {
    address: "456 Bluewood Dr",
    city: "Bridge City",
    country: "USA",
    state: "KY",
    zipcode: "54321",
  },
  {
    address: "789 Sunshine Rd",
    city: "Tiny Town",
    country: "USA",
    state: "CA",
    zipcode: "13579",
  },
  {
    address: "135 Moonglow Ct",
    city: "West Village",
    country: "USA",
    state: "FL",
    zipcode: "24680",
  },
  {
    address: "246 Oakview Rd",
    city: "Morrow",
    country: "USA",
    state: "IL",
    zipcode: "09876",
  },
  {
    address: "678 Vine Tree Ln",
    city: "Mecca",
    country: "USA",
    state: "OR",
    zipcode: "90983",
  },
];

const orders = [
  {
    status: "closed",
  },
  {
    status: "closed",
  },
  {
    status: "closed",
  },
  {
    status: "closed",
  },
  {
    status: "closed",
  },
];

const orderProducts = [
  {
    quantity: 1,
    totalPrice: 22.99,
    productId: 1,
    orderId: 1,
  },
  {
    quantity: 3,
    totalPrice: 68.97,
    productId: 1,
    orderId: 2,
  },
  {
    quantity: 2,
    totalPrice: 45.98,
    productId: 2,
    orderId: 1,
  },
  {
    quantity: 1,
    totalPrice: 22.99,
    productId: 3,
    orderId: 3,
  },
  {
    quantity: 4,
    totalPrice: 91.96,
    productId: 4,
    orderId: 4,
  },
  {
    quantity: 1,
    totalPrice: 22.99,
    productId: 4,
    orderId: 2,
  },
  {
    quantity: 2,
    totalPrice: 45.98,
    productId: 4,
    orderId: 5,
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

  await Promise.all(
    shippings.map((shipping) => {
      return Shipping.create(shipping);
    })
  );

  await Promise.all(
    orders.map((order) => {
      return Order.create(order);
    })
  );

  await Promise.all(
    orderProducts.map((orderProduct) => {
      return OrderProduct.create(orderProduct);
    })
  );

  const user1 = await User.findByPk(1);
  const user2 = await User.findByPk(2);
  const user3 = await User.findByPk(3);
  const user4 = await User.findByPk(4);
  const user5 = await User.findByPk(5);
  const user6 = await User.findByPk(6);
  const user7 = await User.findByPk(7);
  const user8 = await User.findByPk(8);
  const user9 = await User.findByPk(9);
  const user10 = await User.findByPk(10);
  const user11 = await User.findByPk(11);
  const user12 = await User.findByPk(12);
  const user13 = await User.findByPk(13);

  const shipping1 = await Shipping.findByPk(1);
  const shipping2 = await Shipping.findByPk(2);
  const shipping3 = await Shipping.findByPk(3);
  const shipping4 = await Shipping.findByPk(4);
  const shipping5 = await Shipping.findByPk(5);
  const shipping6 = await Shipping.findByPk(6);

  const order1 = await Order.findByPk(1);
  const order2 = await Order.findByPk(2);
  const order3 = await Order.findByPk(3);
  const order4 = await Order.findByPk(4);
  const order5 = await Order.findByPk(5);

  await user1.setShipping(shipping1);
  await user2.setShipping(shipping2);
  await user3.setShipping(shipping3);
  await user4.setShipping(shipping4);
  await user5.setShipping(shipping5);
  await user6.setShipping(shipping6);
  await user7.setShipping(shipping1);
  await user8.setShipping(shipping2);
  await user9.setShipping(shipping3);
  await user10.setShipping(shipping4);
  await user11.setShipping(shipping5);
  await user12.setShipping(shipping6);
  await user13.setShipping(shipping1);

  await order1.setUser(user1);
  await order2.setUser(user2);
  await order3.setUser(user3);
  await order4.setUser(user4);
  await order5.setUser(user5);

  await console.log(Object.keys(OrderProduct.prototype));
  // console.log("user1 ", user1);

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
