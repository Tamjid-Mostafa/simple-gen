import { Footer } from "@/components/landing-page/footer";
import { Navbar } from "@/components/landing-page/navbar";
import React from "react";
import ReactLenis from "lenis/react";
type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <ReactLenis root>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        {children}
        <Footer />
      </div>
    </ReactLenis>
  );
};

export default Layout;
