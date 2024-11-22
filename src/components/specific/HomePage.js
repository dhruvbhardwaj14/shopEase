import React from "react";
import HeroSection from "../specific/HeroSection";
import FeaturedProducts from "../specific/FeaturedProducts";

const HomePage = () => {
  return (
    <div className="container mx-auto px-6 py-10">
      <HeroSection />
      <div className="mt-10">
        <FeaturedProducts />
      </div>
    </div>
  );
};

export default HomePage;
