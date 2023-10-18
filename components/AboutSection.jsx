import React from "react";
import Image from "next/image";

const AboutSection = () => {
  return (
    <section className="text-white">
      <div className="md:grid md:grid-cols-2 gap-8 items-center py-8 px-4 xl:gap-16 sm:py-16 xl:px-16">
        <Image
          src={"/images/aboutPhoto.jpeg"}
          alt="about"
          height={500}
          width={500}
        />

        <div>
          <h2>About Me</h2>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eaque
            laborum sequi alias ullam modi voluptas sint eum minus, quo libero
            sapiente ipsam odit provident, quis numquam. Odio nobis ut harum
            quasi, tempora veritatis magnam quod eum ea officiis minus, magni
            quae in modi eveniet, veniam numquam id perferendis dolore maiores?
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
