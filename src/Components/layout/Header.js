import React from "react";
import { Title } from "..";
import logo from "../../assets/images/logo.svg";
import person from "../../assets/images/mayuko.jpeg";
const StockHeader = ({ ...props }) => {
  return (
    <header className="w-100 h-20 px-4 flex items-center justify-between">
      <div className="flex items-center">
        <img src={logo} alt="app's logo" className="h-10 w-10" />
        <div className="mx-1" />
        <Title>DOTQUIZ</Title>
      </div>
      <img
        src={person}
        alt="user"
        className="h-14 w-14 rounded-full ring-2 ring-primary-300"
      />
    </header>
  );
};

export const Header = React.memo(StockHeader);
