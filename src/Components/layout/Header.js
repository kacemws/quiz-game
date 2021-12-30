import React, { useEffect, useState } from "react";
import { PrimaryButton, Title } from "..";
import logo from "../../assets/images/logo.svg";
const StockHeader = ({ ...props }) => {
  const position = "sticky top-0";
  const size = "w-100 h-20 min-h-[5rem] px-4";
  const items = "flex items-center justify-between";
  const bg = "bg-neutral-200";
  const [shadow, setShadow] = useState("");

  const handleScroll = () => {
    const position = window.pageYOffset;
    console.log({ position });
    if (position !== 0)
      setShadow("shadow-md outline outline-1 outline-gray-300");
    else setShadow("");
  };

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 10);

    window.addEventListener("scroll", handleScroll, false);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={`${position} ${size} ${items} ${bg} ${shadow} `}>
      <div className="flex items-center">
        <img src={logo} alt="app's logo" className="h-10 w-10" />
        <div className="mx-1" />
        <Title>DOTQUIZ</Title>
      </div>
      <PrimaryButton title="Créer un quiz" />
    </header>
  );
};

export const Header = React.memo(StockHeader);
