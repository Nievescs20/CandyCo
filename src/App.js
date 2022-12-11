import React, { useState } from "react";
import Application from "./components/Application/Application";

const App = () => {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <div className="relative min-h-screen">
      <Application setCartOpen={setCartOpen} cartOpen={cartOpen} />
    </div>
  );
};

export default App;
