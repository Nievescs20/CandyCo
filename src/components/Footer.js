import React from "react";

const Footer = () => {
  return (
    <div id="footer">
      <p>Created By</p>
      <div className="socials">
        <a href="https://github.com/nievescs20">
          <img
            style={{ height: "30px", width: "30px" }}
            src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
            alt="github-icon"
          />
        </a>
      </div>
      <div id="footerBottom">
        <p style={{ fontSize: "12px" }}>Copyright ©2022 DBZ-Commerce</p>
      </div>
    </div>
  );
};

export default Footer;
