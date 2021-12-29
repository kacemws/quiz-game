import { Footer, Header } from "../Components";

export const Layout = ({ children, ...props }) => {
  return (
    <div className="min-h-screen bg-textInverted-300">
      <Header />
      <main className="w-full px-4">{children}</main>
      <Footer />
    </div>
  );
};
