import React from "react";
import Slider from "../reusables/Slider";

const HeaderSlider: React.FC = () => {
    const images = [
        {
          src: "/bg.jpg",
          alt: "African farmer using modern smart farming tools in a lush green field",
          caption: "Empowering Every Life",
          description: "Discover how Agro-Splash is empowering farmers across Africa by providing cutting-edge technology and innovative solutions to enhance productivity and ensure food security."
        },
        {
          src: "/bg2.jpg",
          alt: "Group of African entrepreneurs trading agro-products at a vibrant marketplace",
          caption: "Inspiring the Future",
          description: "Agro-Splash is bridging the gap between rural farmers and global buyers, creating a sustainable marketplace that celebrates the richness of African agriculture."
        },
        {
          src: "/bg3.jpeg",
          alt: "Close-up of hands holding fresh organic vegetables, showcasing African produce",
          caption: "Building Brighter Days",
          description: "Our mission is to build brighter futures for African farmers by promoting sustainable practices, fostering innovation, and providing access to lucrative markets."
        },
      ];
      
  return (
    <div className="">
      <Slider images={images} />
    </div>
  );
};

export default HeaderSlider;
