import React from "react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
// import Routes from "./components/Routes";
import CartDrawer from "./components/CartDrawer/CartDrawer";

const App = () => {
  return (
    <div className="relative min-h-screen">
      <Navbar />
      {/* <Routes /> */}
      <CartDrawer />
      <Footer />
    </div>
  );
};

export default App;
