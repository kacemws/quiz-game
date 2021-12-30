import { Footer, Header } from "../Components";

export const Layout = ({ children, ...props }) => {
  return (
    <div className="h-screen bg-neutral-200 flex flex-col">
      <Header />
      <main className="flex-1 w-full p-4">{children}</main>
      <Footer />
    </div>
  );
};
