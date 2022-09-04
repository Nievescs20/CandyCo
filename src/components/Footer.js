import React from "react";

const Footer = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center bg-orange-400 absolute bottom-0">
      <p>Created By</p>
      <div className="socials">
        <a href="https://github.com/nievescs20">
          <img
            src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
            alt="github-icon"
            className="h-8 w-8"
          />
        </a>
      </div>
      <br />
      <div className="flex justify-center bg-orange-500 w-full items-end ">
        <p className="text-xs">Copyright ©2022 DBZ-Commerce</p>
      </div>
    </div>
  );
};

export default Footer;
