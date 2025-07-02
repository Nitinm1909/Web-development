import React, { useRef } from "react";
import "./teams.css";
import { ArrowLeft, ArrowRight, Linkedin } from "lucide-react";

const teamMembers = [
  {
    name: "Nitin Sharma",
    position: "CEO & Visionary",
    image: "/assets/team1.jpg",
    linkedin: "https://linkedin.com/in/nitin",
    description: "Leads H.E.A.R. with passion and commitment to accessible hearing care.",
  },
  {
    name: "Anika Verma",
    position: "Chief Audiologist",
    image: "/assets/team2.jpg",
    linkedin: "https://linkedin.com/in/anika",
    description: "Expert in audiology, ensuring top-quality service for every client.",
  },
  {
    name: "Raj Mehta",
    position: "Head of Engineering",
    image: "/assets/team3.jpg",
    linkedin: "https://linkedin.com/in/raj",
    description: "Drives innovation and product development with technical excellence.",
  },
  {
    name: "Priya Nair",
    position: "Marketing Lead",
    image: "/assets/team4.jpg",
    linkedin: "https://linkedin.com/in/priya",
    description: "Strategic storyteller shaping the H.E.A.R. brand experience.",
  },
  {
    name: "Aarav Desai",
    position: "Operations Manager",
    image: "/assets/team5.jpg",
    linkedin: "https://linkedin.com/in/aarav",
    description: "Streamlines logistics and support for seamless customer journeys.",
  },
];

const TeamSection = () => {
  const carouselRef = useRef(null);

  const scroll = (direction) => {
    const scrollAmount = carouselRef.current.offsetWidth;
    carouselRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section className="team-section">
      <h2 className="team-heading">Meet Our Team</h2>
      <div className="team-carousel-wrapper">
        <button className="arrow-btn left" onClick={() => scroll("left")}>
          <ArrowLeft size={20} />
        </button>

        <div className="team-carousel" ref={carouselRef}>
          {teamMembers.map((member, idx) => (
            <div className="team-card" key={idx}>
              <img src={member.image} alt={member.name} className="team-img" />
              <h3>{member.name}</h3>
              <p className="position">{member.position}</p>
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="linkedin-link"
              >
                <Linkedin size={16} /> LinkedIn
              </a>
              <p className="description">{member.description}</p>
            </div>
          ))}
        </div>

        <button className="arrow-btn right" onClick={() => scroll("right")}>
          <ArrowRight size={20} />
        </button>
      </div>
    </section>
  );
};

export default TeamSection;
