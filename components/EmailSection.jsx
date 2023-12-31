"use client";
import React, { useState } from "react";
import Link from "next/link";
import Lottie from "react-lottie-player";

import hiAnimation from "../public/hiAnimation.json";

import { BsFacebook, BsGithub, BsLinkedin, BsInstagram } from "react-icons/bs";

const EmailSection = () => {
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [submitText, setSubmitText] = useState("Send Message");
  const [isDisabled, setDisabled] = useState(false);

  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const resetValues = () => {
    setEmail("");
    setSubject("");
    setMessage("");
    setSubmitText("Send Message");
    setDisabled(false);
  };

  const handleSubmit = async (e) => {
    setSubmitText("Sending ...");
    setDisabled(true);

    e.preventDefault();

    const data = {
      email: email,
      subject: subject,
      message: `From: ${email},\nMessage: ${message}`,
    };

    const JSONdata = JSON.stringify(data);

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSONdata,
    };

    const response = await fetch("/api/send", options);

    if (response.status === 200) {
      setEmailSubmitted(true);
      setTimeout(() => {
        setEmailSubmitted(false);
      }, 3000);
    }
    resetValues();
  };

  return (
    <section className="my-8 md:my-8" id="contact">
      <h2 className="text-center text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-600 mt-8">
        Contact
      </h2>
      <div className="grid md:grid-cols-2 gap-4 relative py-8 sm:py-16">
        <div>
          <h5 className="text-xl font-bold text-white my-2">
            Let&apos;s Connect
          </h5>
          <p className="text-[#ADB7BE] mb-4 max-w-xl text-justify">
            My inbox is always open. Whether you have a question or just want to
            say hi, I will try my best to get back to you!
          </p>
          <div className="socials flex flex-row gap-2">
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
          <div className="flex items-center justify-center">
            <Lottie
              loop
              animationData={hiAnimation}
              play
              style={{ width: 250, height: 250 }}
            />
          </div>
        </div>
        <div>
          <form className="flex flex-col" onSubmit={handleSubmit}>
            <div className="mb-6">
              <label
                htmlFor="email"
                className="text-white block mb-2 text-sm font-medium"
              >
                Your email
              </label>
              <input
                name="email"
                type="email"
                id="email"
                required
                className="bg-secondary-950 border border-[#33353F] placeholder-white text-gray-100 text-sm rounded-lg block w-full p-2.5"
                placeholder="example@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="subject"
                className="text-white block text-sm mb-2 font-medium"
              >
                Subject
              </label>
              <input
                name="subject"
                type="text"
                id="subject"
                required
                className="bg-secondary-950 border border-[#33353F] placeholder-white text-gray-100 text-sm rounded-lg block w-full p-2.5"
                placeholder="Just saying hi"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="message"
                className="text-white block text-sm mb-2 font-medium"
              >
                Message
              </label>
              <textarea
                name="message"
                id="message"
                className="bg-secondary-950 border border-[#33353F] placeholder-white text-gray-100 text-sm rounded-lg block w-full p-2.5"
                placeholder="Let's talk about..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
            {emailSubmitted && (
              <p className="text-green-500 text-sm mb-4">
                Email sent successfully!
              </p>
            )}
            <button
              type="submit"
              className="bg-primary-700 hover:bg-primary-900 text-white font-medium py-2.5 px-5 rounded-lg w-full btn-submit"
              disabled={isDisabled}
            >
              {submitText}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default EmailSection;
