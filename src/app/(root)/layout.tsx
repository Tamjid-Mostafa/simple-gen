import { Footer } from "@/components/landing-page/footer";
import { Navbar } from "@/components/landing-page/navbar";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <div className="min-h-screen flex flex-col">
    <Navbar />
    {children}
    <Footer />
  </div>
  );
};

export default Layout;
