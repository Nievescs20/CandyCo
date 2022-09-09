import React from "react";
import {
  AiFillFacebook,
  AiOutlineInstagram,
  AiOutlineTwitter,
} from "react-icons/ai";
import { IconContext } from "react-icons";
import { FaPinterest } from "react-icons/fa";

const Footer = () => {
  return (
    <div
      style={{
        backgroundColor: "black",
        marginTop: "auto",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "purple",
        }}
      >
        <div style={{ color: "white" }}>
          Free Standard Shipping On All Orders Of $75 Or More!
        </div>
      </div>
      <div
        style={{ display: "flex", justifyContent: "center", padding: "2em" }}
      >
        <div
          style={{
            // position: "absolute",
            // bottom: "0",
            backgroundColor: "black",
            width: "60%",
            height: "vh",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div
            className="link-container"
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "20vw",
            }}
          >
            <div
              className="container-1"
              style={{
                color: "orange",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <button>Contact Us</button>
              <button>Find a Store</button>
              <button>Shipping Information</button>
            </div>
            <div
              className="container-2"
              style={{
                color: "purple",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <button>Our Brand</button>
              <button>Our Blog</button>
              <button>Careers</button>
            </div>
          </div>
          <div
            className="contact-container"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div className="top-row">
              <div className="icon-container">
                <button>
                  <IconContext.Provider value={{ color: "white", size: "2em" }}>
                    <AiFillFacebook />
                  </IconContext.Provider>
                </button>
                <button>
                  <IconContext.Provider value={{ color: "white", size: "2em" }}>
                    <AiOutlineInstagram />
                  </IconContext.Provider>
                </button>
                <button>
                  <IconContext.Provider value={{ color: "white", size: "2em" }}>
                    <AiOutlineTwitter />
                  </IconContext.Provider>
                </button>
                <button>
                  <IconContext.Provider value={{ color: "white", size: "2em" }}>
                    <FaPinterest />
                  </IconContext.Provider>
                </button>
              </div>
            </div>
            <div className="middle-row">
              <div style={{ color: "yellow" }}>
                {"SIGN UP For Sweet News & Deals"}
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <input style={{ height: "40px" }}></input>
                <button
                  style={{
                    color: "white",
                    backgroundColor: "purple",
                    padding: "6px",
                    borderRadius: "4px",
                    width: "100px",
                    height: "40px",
                  }}
                >
                  Submit
                </button>
              </div>
            </div>
            <div className="bottom-row">
              <div style={{ color: "seagreen" }}>Need Help? Email Us @</div>
              <div style={{ color: "white" }}>CandyCo.admin@notgmail.com</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
