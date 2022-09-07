import React, { useState } from "react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
// import Routes from "./components/Routes";
import CartDrawer from "./components/CartDrawer/CartDrawer";

const App = () => {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <div className="relative min-h-screen">
      <CartDrawer setCartOpen={setCartOpen} cartOpen={cartOpen} />
    </div>
  );
};

export default App;
