"use client";

import React from "react";
import { useState, useTransition } from "react";
import Image from "next/image";
import Link from "next/link";

import { BsFacebook, BsGithub, BsLinkedin, BsInstagram } from "react-icons/bs";

import TabButton from "./TabButton";

import TAB_DATA from "@/data/AboutTabData";

const AboutSection = () => {
  const [tab, setTab] = useState("skills");
  const [isPending, startTransition] = useTransition();

  const handleTabChange = (id) => {
    startTransition(() => {
      setTab(id);
    });
  };
  return (
    <section className="text-white" id="about">
      <h2 className="text-center text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-600 mt-8">
        About Me
      </h2>
      <div className="md:grid md:grid-cols-2 gap-8 py-8 px-4 xl:gap-16 sm:py-16 xl:px-16">
        <Image
          className="rounded-[100px]"
          src={"/images/aboutPhoto.jpeg"}
          alt="about"
          height={500}
          width={500}
          priority
        />

        <div className="mt-4 md:mt-0 text-left flex flex-col h-full">
          <p className="text-base lg:text-lg text-justify">
            {`As a Software Engineer and Full Stack Developer, I've consistently pursued excellence while embracing new learning opportunities. I consider myself as a team player and I find working collaboratively with teammates more enjoyable than working independently. I possess a strong enthusiasm for implementing innovative solutions in my applications to optimize performance.`}
          </p>
          <div className="socials flex flex-row gap-2 my-4">
            <Link href="https://www.facebook.com/sakif.kun" target="_blank">
              <BsFacebook className="text-2xl hover:text-primary-600 mr-2 hover:scale-105 transition ease-in-out" />
            </Link>
            <Link href="https://github.com/muyeenulislam" target="_blank">
              <BsGithub className="text-2xl hover:text-primary-600 mx-2 hover:scale-105 transition ease-in-out" />
            </Link>
            <Link
              href="https://www.linkedin.com/in/md-muyeen-ul-islam/"
              target="_blank"
            >
              <BsLinkedin className="text-2xl hover:text-primary-600 mx-2 hover:scale-105 transition ease-in-out" />
            </Link>
            <Link href="https://www.instagram.com/sakif.kun/" target="_blank">
              <BsInstagram className="text-2xl hover:text-primary-600 mx-2 hover:scale-105 transition ease-in-out" />
            </Link>
          </div>
          <div className="flex flex-row justify-start mt-5">
            <TabButton
              selectTab={() => handleTabChange("skills")}
              active={tab === "skills"}
            >
              Skills
            </TabButton>
            <TabButton
              selectTab={() => handleTabChange("education")}
              active={tab === "education"}
            >
              Education
            </TabButton>
            <TabButton
              selectTab={() => handleTabChange("experience")}
              active={tab === "experience"}
            >
              Experience
            </TabButton>
          </div>
          <div className="mt-8">
            {TAB_DATA.find((t) => t.id === tab)?.content}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
