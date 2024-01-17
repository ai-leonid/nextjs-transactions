import { FC, ReactNode } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface ILayoutProp {
  children: ReactNode;
}
const Layout: FC<ILayoutProp> = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
