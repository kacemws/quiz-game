import React from "react";
import { Title, Caption } from "..";
import logo from "../../assets/images/logo.svg";
import fb from "../../assets/images/icons/fb.svg";
import instagram from "../../assets/images/icons/instagram.svg";
import twitter from "../../assets/images/icons/twitter.svg";
import ln from "../../assets/images/icons/ln.svg";
import github from "../../assets/images/icons/github.svg";

const socials = [
  {
    link: "https://facebook.com/belkacember",
    icon: fb,
  },
  {
    link: "https://www.instagram.com/belkacember/",
    icon: instagram,
  },
  {
    link: "https://twitter.com/belkacember",
    icon: twitter,
  },
  {
    link: "https://www.linkedin.com/in/belkacember/",
    icon: ln,
  },
  {
    link: "https://github.com/kacemws",
    icon: github,
  },
];

const StockFooter = ({ ...props }) => {
  return (
    <footer className="h-40 min-h-[10rem] w-100 bg-gray-50 px-4 flex flex-col justify-center border-y-2 border-gray-200">
      <div className="flex flex-col justify-evenly md:flex-row md:justify-between items-center h-24 ">
        <div className="flex items-center">
          <img
            src={logo}
            alt="app's logo"
            className="h-8 w-8 md:h-10 md:w-10"
          />
          <div className="mx-1" />
          <Title>DOTQUIZ</Title>
        </div>
        <div className="flex items-center">
          {socials.map(({ icon, link }, index) => {
            return (
              <a key={index} href={link} target="_blank" rel="noreferrer">
                <img
                  src={icon}
                  alt="social"
                  className={`cursor-pointer h-4 w-4 md:h-6 md:w-6 mx-2 ${
                    index === 0 ? "ml-0" : ""
                  } ${index === socials.length - 1 ? "mr-0" : ""}`}
                />
              </a>
            );
          })}
        </div>
      </div>
      <hr className="my-1 bg-black border-gray-300 h-[1px]" />
      <div className="w-100 h-12 flex items-center justify-center">
        <Caption>© 2021 DOTQUIZ. All rights reserved</Caption>
      </div>
    </footer>
  );
};

export const Footer = React.memo(StockFooter);
