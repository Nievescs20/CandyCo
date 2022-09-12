import React from "react";

function UnderConstruction(props) {
  const bg = "/under-construction.jpg";
  return (
    <div
      style={{
        backgroundImage: `url(${bg})`,
        minHeight: "65vh",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <div
        style={{
          fontFamily: "Special Elite, cursive",
          color: "white",
          fontSize: "38px",
        }}
      >
        This Page Is Currently Under Construction
      </div>
    </div>
  );
}

export default UnderConstruction;
