import { Footer, Header } from "../Components";

export const Layout = ({ children, ...props }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
};
