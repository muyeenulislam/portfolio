import React from "react";
import Navlink from "./NavLink";

const MenuOverlay = ({ links }) => {
  return (
    <ul className="flex flex-col py-4 items-center open ">
      {links.map((navLink) => (
        <li key={navLink.title}>
          <Navlink href={navLink.href} title={navLink.title} />
        </li>
      ))}
    </ul>
  );
};

export default MenuOverlay;
