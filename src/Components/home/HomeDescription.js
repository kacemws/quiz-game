import { Body, OutlinedButton, PageTitle } from "..";

export const HomeDescription = ({ title, description, buttonContent }) => {
  return (
    <div className="z-20 w-1/2 h-full">
      <PageTitle>{title}</PageTitle>
      <div className="my-6" />
      <Body>{description}</Body>
      <div className="my-6" />
      <OutlinedButton title={buttonContent} />
    </div>
  );
};
