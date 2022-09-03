import React from "react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Routes from "./components/Routes";

const App = () => {
  return (
    <div className="relative min-h-screen">
      <Navbar />
      <Routes />
      <Footer />
    </div>
  );
};

export default App;
