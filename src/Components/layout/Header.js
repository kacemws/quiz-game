import React from "react";
import { PrimaryButton, Title } from "..";
import logo from "../../assets/images/logo.svg";
const StockHeader = ({ ...props }) => {
  return (
    <header className="w-100 h-20 px-4 flex items-center justify-between">
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
