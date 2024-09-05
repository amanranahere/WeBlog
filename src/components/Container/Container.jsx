import React from "react";
import Footer from "../Footer/Footer";

function Container({ children, showFooter = true }) {
  return (
    <div className="min-h-screen w-full">
      {children}
      {showFooter && <Footer />}
    </div>
  );
}

export default Container;
