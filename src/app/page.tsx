import React from "react";
import Header from "./components/pages/home/Header";
// import HeroSection from "./components/pages/home/HeroSection";
// import FeatureSection from "./components/pages/home/FeaturesSection";
import CategorySection from "./components/pages/home/Categories";
import HeaderSlider from "./components/pages/home/HeaderSlider";
import KeyFeatures from "./components/pages/home/KeyFeatures";
import WhyChoose from "./components/pages/home/WhyChoose";
import TestimonialSlider from "./components/pages/home/TestimonialSlider";
import AboutSection from "./components/pages/home/AboutSection";

const Home = () => {
  return (
    <section>
      <Header />
      <HeaderSlider />
      <main className="container mx-auto mt-10 px-4">
        {/* <HeroSection /> */}
        <AboutSection  />
        <KeyFeatures />
        <WhyChoose />
        <TestimonialSlider />
        {/* <FeatureSection /> */}
        <CategorySection />
      </main>
    </section>
  );
};

export default Home;
