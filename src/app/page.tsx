import React from "react";
import Header from "./components/pages/home/Header";
import HeroSection from "./components/pages/home/HeroSection";
import FeatureSection from "./components/pages/home/FeaturesSection";
import CategorySection from "./components/pages/home/Categories";

const Home = () => {
  return (
    <section>
      <Header />
      <main className="container mx-auto px-4">
        <HeroSection />
        <FeatureSection />
        <CategorySection />
      </main>
    </section>
  );
};

export default Home;
