import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AddQuizModal, PrimaryButton, Title } from "..";
import logo from "../../assets/images/logo.svg";
const StockHeader = ({ ...props }) => {
  const position = "sticky top-0 z-50";
  const size = "w-100 h-20 min-h-[5rem] px-4";
  const items = "flex items-center justify-between";
  const bg = "bg-neutral-200";
  const [glass, setGlass] = useState("");

  const [open, setIsOpen] = useState(false);

  const navigate = useNavigate();

  const handleScroll = () => {
    const position = window.pageYOffset;
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
        <div
          className="flex items-center cursor-pointer"
          onClick={(e) => {
            e.preventDefault();
            navigate("/");
          }}
        >
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
      <AddQuizModal open={open} setOpen={setIsOpen} />
    </>
  );
};
export const Header = React.memo(StockHeader);
