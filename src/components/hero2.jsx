import React, { useState } from "react";
import "./hero2.css";
import prodhead1 from "./assets/products/prodhero1.png";
import prodhead2 from "./assets/products/prodhero2.png";
import { Star, StarHalf, StarOff, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

const products = [
  {
    id: 1,
    name: "ClearTone Mini",
    description: "Compact hearing aid with crystal-clear sound.",
    price: "₹4,299",
    rating: 4.5,
    image: prodhead1,
    colors: ["#000", "#333", "#666", "#999"],
  },
  {
    id: 2,
    name: "EchoPlus Max",
    description: "Noise-cancellation & long battery life.",
    price: "₹6,799",
    rating: 4,
    image: prodhead2,
    colors: ["#222", "#444", "#888", "#aaa"],
  },
  {
    id: 3,
    name: "NanoHear Flex",
    description: "Ultra-light dual mic hearing support.",
    price: "₹5,299",
    rating: 4.2,
    image: prodhead1,
    colors: ["#1a1a1a", "#5c5c5c", "#bfbfbf"],
  },
  {
    id: 4,
    name: "PureTone Elite",
    description: "Stylish & powerful clarity.",
    price: "₹7,999",
    rating: 4.8,
    image: prodhead2,
    colors: ["#000", "#999"],
  },
  {
    id: 5,
    name: "ZenHear Compact",
    description: "Minimalist style, adaptive volume.",
    price: "₹4,899",
    rating: 4.3,
    image: prodhead1,
    colors: ["#2f2f2f", "#707070", "#dcdcdc"],
  },
  {
    id: 6,
    name: "EchoFit Pro",
    description: "Comfortable fit with smart tuning.",
    price: "₹5,699",
    rating: 4.6,
    image: prodhead2,
    colors: ["#555", "#777", "#999"],
  },
  {
    id: 7,
    name: "HearNova Edge",
    description: "Next-gen audio for daily comfort.",
    price: "₹6,499",
    rating: 4.4,
    image: prodhead1,
    colors: ["#111", "#444"],
  },
  {
    id: 8,
    name: "AudioZen Lite",
    description: "Balance of clarity and comfort.",
    price: "₹5,999",
    rating: 4.1,
    image: prodhead2,
    colors: ["#888", "#bbb"],
  },
  {
    id: 9,
    name: "SonicClear Boost",
    description: "Enhanced amplification & compact build.",
    price: "₹4,599",
    rating: 4.2,
    image: prodhead1,
    colors: ["#3a3a3a", "#999999"],
  },
  {
    id: 10,
    name: "SmartHear MiniX",
    description: "AI-powered sound clarity.",
    price: "₹6,199",
    rating: 4.5,
    image: prodhead2,
    colors: ["#222", "#aaa"],
  },
];

const PRODUCTS_PER_PAGE = 5;

const renderStars = (rating) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 !== 0;

  for (let i = 0; i < fullStars; i++) {
    stars.push(<Star key={`full-${i}`} fill="#FFD700" stroke="#FFD700" size={16} />);
  }

  if (hasHalf) {
    stars.push(<StarHalf key="half" fill="#FFD700" stroke="#FFD700" size={16} />);
  }

  const remaining = 5 - stars.length;
  for (let i = 0; i < remaining; i++) {
    stars.push(<StarOff key={`off-${i}`} stroke="#ccc" size={16} />);
  }

  return stars;
};

const Hero2 = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const maxIndex = Math.ceil(products.length / PRODUCTS_PER_PAGE) - 1;

  const visibleProducts = products.slice(
    currentIndex * PRODUCTS_PER_PAGE,
    (currentIndex + 1) * PRODUCTS_PER_PAGE
  );

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentIndex < maxIndex) setCurrentIndex((prev) => prev + 1);
  };

  return (
    <section className="top-picks-section">
      <div className="top-picks-header">
        <h2 className="section-title">Top Picks for You</h2>
        <button className="view-all-btn">
          View All Products <ArrowRight size={18} />
        </button>
      </div>

      {currentIndex > 0 && (
        <div className="arrow-btn left-arrow" onClick={handlePrev}>
          <ChevronLeft size={24} />
        </div>
      )}
      {currentIndex < maxIndex && (
        <div className="arrow-btn right-arrow" onClick={handleNext}>
          <ChevronRight size={24} />
        </div>
      )}

      <div className="product-card-container">
        {visibleProducts.map((product) => (
          <div className="product-card" key={product.id}>
            <div className="product-image-wrapper">
              <img src={product.image} alt={product.name} className="product-card-img" />
            </div>
            <div className="product-card-content">
              <h3 className="product-title">{product.name}</h3>
              <p className="product-desc">{product.description}</p>
              <div className="product-price">{product.price}</div>

              <div className="color-options">
                {product.colors.map((color, idx) => (
                  <span
                    key={idx}
                    className="color-circle"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>

              <div className="product-rating">
                {renderStars(product.rating)}
                <span className="rating-number">{product.rating}</span>
              </div>

              <button className="buy-btn">Buy Now</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Hero2;
