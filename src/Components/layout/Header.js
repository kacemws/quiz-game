import React, { useEffect, useState } from "react";
import { Modal, PrimaryButton, Title } from "..";
import logo from "../../assets/images/logo.svg";
const StockHeader = ({ ...props }) => {
  const position = "sticky top-0 z-50";
  const size = "w-100 h-20 min-h-[5rem] px-4";
  const items = "flex items-center justify-between";
  const bg = "bg-neutral-200";
  const [glass, setGlass] = useState("");

  const [open, setIsOpen] = useState(false);

  const handleScroll = () => {
    const position = window.pageYOffset;
    console.log({ position });
    if (position !== 0)
      setGlass(
        "bg-clip-border backdrop-blur-xl bg-opacity-60 border-y border-gray-200"
      );
    else setGlass("");
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
    <>
      <header className={`${position} ${size} ${items} ${bg} ${glass} `}>
        <div className="flex items-center">
          <img src={logo} alt="app's logo" className="h-10 w-10" />
          <div className="mx-1" />
          <Title>DOTQUIZ</Title>
        </div>
        <PrimaryButton
          title="Créer un quiz"
          onClick={(_) => {
            setIsOpen(true);
          }}
        />
      </header>
      <Modal
        isOpen={open}
        button="Sauvegarder"
        setIsOpen={(_) => {
          setIsOpen(!open);
        }}
        title="Créer un quiz"
        // onClose={(_) => {
        //   setIsOpen(false);
        // }}
      ></Modal>
    </>
  );
};

export const Header = React.memo(StockHeader);
