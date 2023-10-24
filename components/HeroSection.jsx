"use client";

import React from "react";
import Image from "next/image";

import { TypeAnimation } from "react-type-animation";
import Link from "next/link";

const HeroSection = () => {
  return (
    <section>
      <div className="grid grid-cols-1 sm:grid-cols-12 items-center">
        <div className="col-span-7 text-left sm:text-left">
          <h1 className="text-white h-[130px] mb-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-600">
              Hello, I am{" "}
            </span>
            <br></br>
            <TypeAnimation
              sequence={[
                "Md. Muyeen - Ul - Islam",
                1000,
                "Software Engineer",
                1000,
                "Web Developer",
                1000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </h1>

          <div>
            <button className="px-6 py-3 w-full sm:w-fit rounded-full mr-4 bg-gradient-to-r from-primary-800 to-secondary-500 hover:bg-slate-200 text-white hover:scale-105 transition ease-in-out">
              <Link
                href={
                  "https://drive.google.com/file/d/1Jvmz_kUKxaw28_75rO-fCmPOW4rdO-g_/view?usp=sharing"
                }
                target="_blank"
              >
                Download CV
              </Link>
            </button>
          </div>
        </div>
        <div className="col-span-5 place-self-center mt-4 lg:mt-0">
          <div className="place-self-center">
            <Image
              className="rounded-full"
              src={"/images/heroImg.jpg"}
              alt="hero img"
              height={300}
              width={300}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
