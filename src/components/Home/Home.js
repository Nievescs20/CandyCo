import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Fade from "react-reveal/Fade";
import LightSpeed from "react-reveal/LightSpeed";
import { addCartThunk } from "../../store/cart";
import { sweets } from "../../data";
import "./Home.css";

const spookyHouseBg = "/halloween-castle-background.jpg";
const graveyardBg =
  "https://cdn.shopify.com/s/files/1/0150/8992/6198/files/Halloweem-HERO-BANNER-DESKTOP-Recovered_8fc1ba7d-0649-4b64-b4b4-f3788ab2fe05_1024x.gif?v=1661864214";

const Home = () => {
  const dispatch = useDispatch();

  const notify = (product, quantity) =>
    toast(`${quantity} ${product.name} Added To Cart!`, {
      duration: 2000,
      position: "bottom-right",
      style: { backgroundColor: "dodgerblue" },
    });

  const handleAdd = (product, quantity) => {
    notify(product, quantity);
    dispatch(addCartThunk(product, quantity));
  };

  return (
    <div>
      <Toaster />
      <div
        className="home"
        style={{ backgroundImage: `url(${spookyHouseBg})` }}
      >
        <div className="home__castle-bg__text__container">
          <div className="home__castle-bg__text">
            <div className="home__castle-bg__text__box">
              <Fade left>
                <b className="home__castle-bg__text__lettering">
                  Trick Or TREAT!
                </b>
              </Fade>
              <Fade right>
                <b className="home__castle-bg__text__lettering">
                  Smell My FEET!
                </b>
              </Fade>
            </div>
            <div className="home__castle-bg__text__box--bottom ">
              <Fade bottom>
                <b className="home__castle-bg__text__lettering">
                  Give Me Something Sweet To EAT!
                </b>
                <Link to="/products">
                  <button className="home__castle-bg__text__container__button">
                    Shop Now
                  </button>
                </Link>
              </Fade>
            </div>
          </div>
        </div>
      </div>

      <div
        style={{ backgroundImage: `url(${graveyardBg})` }}
        className="home__grave-bg__container"
      >
        <div className="home__grave-bg__text__container">
          <div className="home__grave-bg__text">This Is Halloween</div>
          <Link to="/products">
            <button className="home__grave-bg__text__container__button">
              {"Shop Now >"}
            </button>
          </Link>
        </div>
      </div>
      <LightSpeed left>
        <div className="home__candy__container">
          <b className="home__candy__container__text">Sweets To Die For</b>
          <div className="home__candy__slide">
            {sweets.map((candy) => (
              <div key={candy.name}>
                <Link to={`/products/${candy.id}`}>
                  <img src={candy.imageUrl} alt={candy.imageUrl} />
                  <div>{candy.name}</div>
                  <div>${candy.price.toFixed(2)}</div>
                </Link>
                <button
                  className="home__candy__slide__button"
                  onClick={() => handleAdd(candy, 1)}
                >
                  Add To Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      </LightSpeed>
    </div>
  );
};

export default Home;
