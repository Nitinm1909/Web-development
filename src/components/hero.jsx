import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./hero.css";

import bg1 from "./assets/products/bg1.png";
import bg2 from "./assets/products/bg2.png";
import bg3 from "./assets/products/bg3.png";

import hero1 from "./assets/products/hero1.png";
import hero2 from "./assets/products/hero2.png";
import hero3 from "./assets/products/hero3.png";

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const settings = {
    dots: true,
    infinite: true,
    speed: 800, // Faster transition
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500, // Faster auto-slide
    arrows: false,
    pauseOnHover: false,
    beforeChange: (oldIndex, newIndex) => setCurrentSlide(newIndex),
  };
  useEffect(() => {
    const body = document.body;
    const bodyBackgrounds = [
      "linear-gradient(to bottom, #bbb4e4, #f2daf6, #d9f3fa, #ffffff)", // Slide 1
      "linear-gradient(to bottom, #000000, rgb(78, 78, 78), rgb(159, 159, 159), #ffffff)", // Slide 2
      "linear-gradient(to bottom, rgb(90, 122, 61), rgb(121, 171, 60),rgb(199, 237, 153), #ffffff)", // Slide 3
    ];
  
    body.style.transition = "background 0.8s ease-in-out";
    body.style.background = bodyBackgrounds[currentSlide];
  }, [currentSlide]);
  

  return (
    <section className="hero-container">
      <Slider {...settings}>
        {/* First Slide */}
        <div className="slide slide1">
          <img src={hero1} alt="Hearing Aid" className="product-image product-image-1" />
          <div className="caption caption-center">
            <h2>Advanced Hearing Aid</h2>
            <p>Crystal Clear Sound for Every Moment</p>
            <button className="buy-btn">Buy Now</button>
          </div>
        </div>

        {/* Second Slide */}
        <div className="slide slide2">
          <div className="caption caption-left">
            <h2>Unmatched Quality</h2>
            <p>Designed for Pure Sound Experience</p>
            <button className="buy-btn">Buy Now</button>
          </div>
          <img src={hero2} alt="Product 2" className="product-image product-image-2" />
        </div>

        {/* Third Slide */}
        <div className="slide slide3">
          <div className="caption caption-left">
            <h2>Next-Gen Audio</h2>
            <p>For Every Lifestyle, Every Need</p>
            <button className="buy-btn">Buy Now</button>
          </div>
          <img src={hero3} alt="Product 3" className="product-image product-image-3" />
        </div>
      </Slider>
    </section>
  );
};

export default Hero;