const { yellow } = require("chalk");
const { db } = require("./db");
const PORT = process.env.PORT || 9000;
const app = require("./app");
const seed = require("../script/seed");

const init = async () => {
  try {
    if (process.env.SEED === "true") {
      await seed();
    } else {
      await db.sync();
    }
    app.listen(PORT, () =>
      console.log(yellow(`Going Super Saiyan on port ${PORT}`))
    );
  } catch (ex) {
    console.log(ex);
  }
};

init();
