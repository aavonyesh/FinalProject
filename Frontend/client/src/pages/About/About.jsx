import React from "react";

const About = () => {
  return (
    <div className="py-28 px-6 md:px-20 text-gray-800">
      <h2 className="text-3xl md:text-4xl font-bold mb-6">About ReservAi</h2>
      <p className="max-w-3xl leading-7 text-lg">
        ReservAi is your smart travel companion for booking hotel rooms with ease. 
        Our mission is to make hotel booking seamless and personalized by combining 
        elegant design with smart technology. Whether you're planning a quick getaway 
        or a long vacation, ReservAi helps you find the perfect stay at the best price.
      </p>
      <p className="mt-4 max-w-3xl leading-7 text-base text-gray-600">
        We believe that every trip should begin with peace of mind. That’s why we 
        prioritize verified listings, secure payments, and a smooth user experience.
      </p>
    </div>
  );
};

export default About;
