import React from "react";
import { Link } from "react-router-dom";
import Logo from "../Logo";

function Footer() {
  return (
    <section className="relative overflow-hidden py-4 bg-[#333]">
      <div className="relative z-10 mx-auto max-w-7xl px-4 flex flex-col justify-center items-center">
        <div className="w-24 h-24 mb-4">
          <Logo />
        </div>
        <div className="mb-3 text-white text-center">
          Not sticking around for more? Well, thanks for dropping by! We hope
          you enjoyed your visit. Come back soon for more great blogs!
        </div>
        <div className="mb-3 text-white/70 flex gap-4 ">
          <p>&copy;Copyright 2024</p>
          <p>|</p>
          <p>All Rights Reserved</p>
          <p>|</p>
          <p>
            Made by{" "}
            <Link to="/" className="text-blue-200 hover:text-white">
              amanrana
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export default Footer;
