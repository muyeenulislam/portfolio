import React from "react";
import Image from "next/image";

const Footer = () => {
  return (
    <div className="footer z-10 border-t-[#33353F] border-l-transparent border-r-transparent border-b-transparent text-white flex justify-center">
      <div className="container p-6 sm:p-12 flex justify-between">
        <div className="flex items-center ">
          <Image
            className="rounded-full"
            src={"/images/navIcon.jpg"}
            alt="navIcon"
            height={50}
            width={50}
          />
        </div>
        <div className="text-slate-600 flex items-center p-3 text-sm sm:text-base">
          Copyright © Md. Muyeen - Ul - Islam {new Date().getFullYear()}.
        </div>
        <p className="text-slate-600 flex items-center text-sm sm:text-base">
          All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
