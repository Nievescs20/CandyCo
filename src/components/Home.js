import React from "react";
import { useSelector } from "react-redux";
import Zoom from "react-reveal/Zoom";
import Slide from "react-reveal/Slide";

const Home = () => {
  const { username } = useSelector((state) => {
    return state.auth;
  });

  const isLoggedIn = useSelector((state) => {
    return !!state.auth.id;
  });

  const sweets = [
    {
      name: "Halloween Surprise Smash Pumpkin",
      price: 70.0,
      imageUrl:
        "https://cdn.shopify.com/s/files/1/0150/8992/6198/products/20220614-By-Asha-Fuller-DCB0040_836x.jpg?v=1660147193",
    },
    {
      name: "Monster Mash Crispy Pop",
      price: 12.0,
      imageUrl:
        "https://cdn.shopify.com/s/files/1/0150/8992/6198/products/20220613-By-Asha-Fuller-DCB-0055_836x.jpg?v=1660076741",
    },
    {
      name: "Creepy Candy Coffin",
      price: 10.0,
      imageUrl:
        "https://cdn.shopify.com/s/files/1/0150/8992/6198/products/20220613-By-Asha-Fuller-DCB-0034_836x.jpg?v=1661192633",
    },
    {
      name: "Graveyard Grub Mix",
      price: 14.0,
      imageUrl:
        "https://cdn.shopify.com/s/files/1/0150/8992/6198/products/20220803-By-Asha-Fuller-DCB-0095_836x.jpg?v=1661183435",
    },
  ];

  return (
    <div className="flex flex-col">
      <img
        src="/halloween-background.jpg"
        alt="Spooky House With Bats"
        style={{ width: "100vw", height: "90vh" }}
      ></img>
      {/* <div>
        <div style={{ color: "orange" }}>Trick Or TREAT!</div>
        <div style={{ color: "orange" }}>Smell My FEET!</div>
        <div style={{ color: "orange" }}>Give Me Something Sweet To EAT!</div>
        <button
          style={{
            backgroundColor: "purple",
            color: "white",
            borderRadius: "8px",
            padding: "6px",
            width: "100px",
          }}
        >
          Shop Now
        </button>
      </div> */}
      <div>
        <img
          src="https://cdn.shopify.com/s/files/1/0150/8992/6198/files/Halloweem-HERO-BANNER-DESKTOP-Recovered_8fc1ba7d-0649-4b64-b4b4-f3788ab2fe05_1024x.gif?v=1661864214"
          alt="Candy Graveyard"
          style={{ width: "100%" }}
        />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginBottom: "5vh",
        }}
      >
        <b style={{ marginTop: "5vh", marginBottom: "3vh", fontSize: "42px" }}>
          Sweets To Die For
        </b>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {sweets.map((candy) => (
            <div key={candy.name}>
              <img src={candy.imageUrl} alt={candy.imageUrl} />
              <div>{candy.name}</div>
              <div>${candy.price.toFixed(2)}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
