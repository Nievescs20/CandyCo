import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Fade from "react-reveal/Fade";
import LightSpeed from "react-reveal/LightSpeed";

const Home = () => {
  const { username } = useSelector((state) => {
    return state.auth;
  });

  const isLoggedIn = useSelector((state) => {
    return !!state.auth.id;
  });

  const graveyardBg =
    "https://cdn.shopify.com/s/files/1/0150/8992/6198/files/Halloweem-HERO-BANNER-DESKTOP-Recovered_8fc1ba7d-0649-4b64-b4b4-f3788ab2fe05_1024x.gif?v=1661864214";

  const spookyHouseBg = "/halloween-castle-background.jpg";

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
    <div className="flex flex-col chris">
      <div
        style={{
          backgroundImage: `url(${spookyHouseBg})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          height: "90vh",
          display: "flex",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            flex: "1",
            paddingTop: "100px",
          }}
        >
          <div style={{ marginBottom: "50px" }}>
            <div style={{ display: "flex" }}>
              <Fade left>
                <b
                  style={{
                    color: "orange",
                    fontSize: "42px",
                    fontFamily: "Special Elite, cursive",
                    marginRight: "10px",
                  }}
                >
                  Trick Or TREAT!
                </b>
              </Fade>
              <Fade right>
                <b
                  style={{
                    color: "orange",
                    fontSize: "42px",
                    fontFamily: "Special Elite, cursive",
                    marginLeft: "10px",
                  }}
                >
                  Smell My FEET!
                </b>
              </Fade>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Fade bottom>
                <b
                  style={{
                    color: "orange",
                    fontSize: "42px",
                    fontFamily: "Special Elite, cursive",
                  }}
                >
                  Give Me Something Sweet To EAT!
                </b>
                <Link to="/products">
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
                </Link>
              </Fade>
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          backgroundImage: `url(${graveyardBg})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          height: "500px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingTop: "100px",
          }}
        >
          <div style={{ color: "white", fontSize: "32px" }}>
            This Is Halloween
          </div>
          <button
            style={{
              backgroundColor: "none",
              color: "orange",
              fontSize: "26px",
            }}
          >
            {"Shop Now >"}
          </button>
        </div>
      </div>
      <LightSpeed left>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: "5vh",
          }}
        >
          <b
            style={{ marginTop: "5vh", marginBottom: "3vh", fontSize: "42px" }}
          >
            Sweets To Die For
          </b>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "0px 50px",
            }}
          >
            {sweets.map((candy) => (
              <div key={candy.name}>
                <img src={candy.imageUrl} alt={candy.imageUrl} />
                <div>{candy.name}</div>
                <div>${candy.price.toFixed(2)}</div>
              </div>
            ))}
          </div>
        </div>
      </LightSpeed>
    </div>
  );
};

export default Home;
