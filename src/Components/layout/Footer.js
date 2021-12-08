import React from "react";
import { Title, Caption } from "..";
import logo from "../../assets/images/logo-inverted.svg";
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
    <footer className="h-40 w-100 bg-primary-300 px-4 flex flex-col justify-center">
      <div className="flex items-center">
        <img src={logo} alt="app's logo" className="h-10 w-10" />
        <div className="mx-1" />
        <Title inverted>DOTQUIZ</Title>
      </div>
      <hr className="my-2" />
      <div className="w-100 h-14 flex items-center justify-between">
        <Caption inverted>© 2021 DOTQUIZ. All rights reserved</Caption>
        <div className="flex items-center h-full">
          {socials.map(({ icon, link }, index) => {
            return (
              <a key={index} href={link} target="_blank" rel="noreferrer">
                <img
                  src={icon}
                  alt="social"
                  className={`cursor-pointer h-6 w-6 mx-2 ${
                    index === 0 ? "ml-0" : ""
                  } ${index === socials.length - 1 ? "mr-0" : ""}`}
                />
              </a>
            );
          })}
        </div>
      </div>
    </footer>
  );
};

export const Footer = React.memo(StockFooter);
