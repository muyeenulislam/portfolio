"use client";

import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";

import Navlink from "./NavLink";
import MenuOverlay from "./MenuOverlay";

const navLinks = [
  { title: "About", href: "#about" },
  { title: "Projects", href: "#projects" },
  { title: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [hash, setHash] = useState("");
  const params = useParams();

  useEffect(() => {
    setHash(window.location.hash);
  }, [params]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-10 bg-[#030e0f] bg-opacity-100">
      <div className="flex flex-wrap items-center justify-between mx-auto px-8 py-4">
        <Link href={"/"}>
          <Image
            className="rounded-full"
            src={"/images/navIcon.jpg"}
            alt="navIcon"
            height={50}
            width={50}
          />
        </Link>

        <div className="mobile-menu block md:hidden">
          {!navbarOpen ? (
            <button
              onClick={() => setNavbarOpen(true)}
              className="flex items-center px-3 py-2 hover:text-white"
            >
              <Bars3Icon className="h-5 w-5 text-primary-500 hover:scale-105 transition ease-in-out" />
            </button>
          ) : (
            <button
              onClick={() => setNavbarOpen(false)}
              className="flex items-center px-3 py-2 hover:text-white"
            >
              <XMarkIcon className="h-5 w-5 text-primary-500 hover:scale-105 transition ease-in-out" />
            </button>
          )}
        </div>
        <div className="menu hidden md:block md:w-auto" id="navbar">
          <ul className="flex  p-4 md:p-0 md:flex-row md:space-x-8 mt-0">
            {navLinks.map((navLink) => (
              <li key={navLink.title}>
                <Navlink
                  href={navLink.href}
                  title={navLink.title}
                  active={hash === navLink.href ? true : false}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
      {navbarOpen ? <MenuOverlay links={navLinks} /> : null}
    </nav>
  );
};

export default Navbar;
