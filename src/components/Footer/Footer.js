import React from "react";
import {
  AiFillFacebook,
  AiOutlineInstagram,
  AiOutlineTwitter,
} from "react-icons/ai";
import { IconContext } from "react-icons";
import { FaPinterest } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer__promotion__container">
        <div className="footer__promotion__text">
          Free Standard Shipping On All Orders Of $75 Or More!
        </div>
      </div>
      <div className="footer__container">
        <div className="footer__container__container">
          <div className="footer__container__link__container">
            <Link to="/underconstruction">
              <div className="footer__container__container-1">
                <button>Contact Us</button>
                <button>Find a Store</button>
                <button>Shipping Information</button>
              </div>
            </Link>
            <Link to="/underconstruction">
              <div className="footer__container__container-2">
                <button>Our Brand</button>
                <button>Our Blog</button>
                <button>Careers</button>
              </div>
            </Link>
          </div>
          <div className="footer__container__contact__container">
            <div className="top-row">
              <div className="icon-container">
                <button
                  onClick={() =>
                    window.alert(
                      "Sorry, No real social media associated with this site"
                    )
                  }
                >
                  <IconContext.Provider value={{ color: "white", size: "2em" }}>
                    <AiFillFacebook />
                  </IconContext.Provider>
                </button>
                <button
                  onClick={() =>
                    window.alert(
                      "Sorry, No real social media associated with this site"
                    )
                  }
                >
                  <IconContext.Provider value={{ color: "white", size: "2em" }}>
                    <AiOutlineInstagram />
                  </IconContext.Provider>
                </button>
                <button
                  onClick={() =>
                    window.alert(
                      "Sorry, No real social media associated with this site"
                    )
                  }
                >
                  <IconContext.Provider value={{ color: "white", size: "2em" }}>
                    <AiOutlineTwitter />
                  </IconContext.Provider>
                </button>
                <button
                  onClick={() =>
                    window.alert(
                      "Sorry, No real social media associated with this site"
                    )
                  }
                >
                  <IconContext.Provider value={{ color: "white", size: "2em" }}>
                    <FaPinterest />
                  </IconContext.Provider>
                </button>
              </div>
            </div>
            <div className="middle-row">
              <div className="footer__container__contact__middle-row">
                {"SIGN UP For Sweet News & Deals"}
              </div>
              <div className="footer__container__contact__input__container">
                <input className="footer__container__contact__input"></input>
                <button
                  className="footer__container__contact__input__button"
                  onClick={() =>
                    window.alert("Sorry, No real email list to join")
                  }
                >
                  Submit
                </button>
              </div>
            </div>
            <div className="bottom-row">
              <div className="footer__container__contact__bottom-row-1">
                Need Help? Email Us @
              </div>
              <div className="footer__container__contact__bottom-row-2">
                CandyCo.admin@notgmail.com
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
