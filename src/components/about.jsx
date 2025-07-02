import React, { useRef, useState, useEffect } from "react";
import Timeline from "./timeline";
import TeamSection from "./teams";
import "./about.css";
import ceoVideo from "./assets/ceo-vision.mp4";

const AboutUs = () => {
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);
  const [showButtons, setShowButtons] = useState(false);

  const toggleMute = () => {
    const video = videoRef.current;
    if (video) {
      video.muted = !video.muted;
      setIsMuted(video.muted);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.querySelector(".about-hero-video-section");
      if (!heroSection) return;

      const rect = heroSection.getBoundingClientRect();
      const isVisible = rect.bottom <= 0;
      setShowButtons(isVisible);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`about-us-page hero-page ${showButtons ? "show-buttons" : ""}`}>
      {/* Hero Section */}
      <section className="about-hero-video-section">
        <div className="hero-video-content">
          {/* Background Video */}
          <video
            ref={videoRef}
            className="hero-background-video"
            src={ceoVideo}
            autoPlay
            loop
            muted={isMuted}
            playsInline
          />
          <div className="hero-overlay" />

          {/* Left Gradient Content */}
          <div className="hero-left-gradient">
            <h1>Our Vision</h1>
            <h3>Nitin, CEO of H.E.A.R</h3>
            <p>
              Our mission is to bring accessible and affordable hearing care to
              every individual. At H.E.A.R, we believe better hearing is the
              first step toward a better life.
            </p>
          </div>

          {/* Optional Right Space */}
          <div className="hero-right"></div>

          {/* Mute Toggle */}
          <button className="mute-toggle-icon" onClick={toggleMute} aria-label="Toggle mute">
            {isMuted ? "🔇" : "🔊"}
          </button>
        </div>
      </section>

      {/* Timeline and Team */}
      <Timeline />
      <TeamSection />
    </div>
  );
};

export default AboutUs;
