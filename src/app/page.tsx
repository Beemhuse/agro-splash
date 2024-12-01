import React from "react";
import KeyFeatures from "../components/pages/home/KeyFeatures";
import WhyChoose from "../components/pages/home/WhyChoose";
import TestimonialSlider from "../components/pages/home/TestimonialSlider";
import AboutSection from "../components/pages/home/AboutSection";
import HeroSection from "@/components/pages/home/HeroSection";
import NewsletterComponent from "@/components/pages/NewsletterComponent";

const Home = () => {
  return (
    <section>
        <HeroSection />
        <main className="container mx-auto mt-10 px-4">
        <AboutSection  />
        <KeyFeatures />
        <WhyChoose />
        <TestimonialSlider />
        <NewsletterComponent />
        {/* <CategorySection /> */}
      </main>
    </section>
  );
};

export default Home;
