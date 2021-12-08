import { Footer, Header } from "../Components";

export const Layout = ({ children, ...props }) => {
  return (
    <div className="min-h-screen bg-textInverted-300">
      <Header />
      <main className="w-full min-h-screen">{children}</main>
      <Footer />
    </div>
  );
};
