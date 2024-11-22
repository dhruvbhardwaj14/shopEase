import React from "react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div className="relative bg-blue-500 text-white rounded-lg overflow-hidden shadow-lg">
      <img
        src="https://via.placeholder.com/1200x400?text=Shop+The+Latest+Trends"
        alt="Hero Banner"
        className="w-full h-64 sm:h-96 object-cover opacity-70"
      />
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6">
        <h1 className="text-4xl sm:text-6xl font-bold mb-4">
          Discover Your Style
        </h1>
        <p className="text-lg sm:text-xl mb-6">
          Explore the latest trends and unbeatable prices. Shop now!
        </p>
        <Link
          to="/products"
          className="bg-white text-blue-500 py-3 px-6 rounded-full font-semibold text-lg hover:bg-blue-100 transition"
        >
          Shop Now
        </Link>
      </div>
    </div>
  );
};

export default HeroSection;
