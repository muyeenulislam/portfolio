import React from "react";
import Image from "next/image";

const Footer = () => {
  return (
    <div className="footer z-10 border-t-[#33353F] border-l-transparent border-r-transparent border-b-transparent text-white flex justify-center">
      <div className="container p-12 flex justify-between">
        <Image
          className="rounded-full"
          src={"/images/navIcon.jpg"}
          alt="navIcon"
          height={50}
          width={50}
        />
        <div className="text-slate-600 flex items-center">
          Copyright © Md. Muyeen - Ul - Islam {new Date().getFullYear()}. All
          Rights Reserved
        </div>
        <p className="text-slate-600 flex items-center">All rights reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
