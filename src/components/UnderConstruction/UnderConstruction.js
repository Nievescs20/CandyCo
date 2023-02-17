import React from "react";
import "./UnderConstruction.css";

function UnderConstruction() {
  const bg = "/under-construction.jpg";
  return (
    <div
      style={{ backgroundImage: `url(${bg})` }}
      className="under-construction"
    >
      <div className="under-construction__text">
        This Page Is Currently Under Construction
      </div>
    </div>
  );
}

export default UnderConstruction;
