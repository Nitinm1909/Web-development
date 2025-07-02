import React from "react";
import "./timeline.css";
import { AlertCircle, Cpu, MapPin, Award, Footprints, Flag } from "lucide-react";
import { motion } from "framer-motion";

const timelineData = [
  {
    icon: <Footprints size={30} />,
    title: "Humble Beginnings",
    location: "Chennai",
    description: "Where it all started with just an idea and passion to help the hearing impaired.",
  },
  {
    icon: <AlertCircle size={30} />,
    title: "Founding Vision",
    location: "Bengaluru",
    description: "A team of innovators came together to bring H.E.A.R. to life.",
  },
  {
    icon: <Cpu size={30} />,
    title: "First Prototype",
    location: "Bengaluru",
    description: "A functional prototype was created and tested with real users.",
  },
  {
    icon: <MapPin size={30} />,
    title: "National Expansion",
    location: "Mumbai",
    description: "Launched across major metro cities with online and retail platforms.",
  },
  {
    icon: <Award size={30} />,
    title: "Media & Awards",
    location: "Delhi",
    description: "Gained national recognition, awards, and user trust.",
  },
  {
    icon: <Flag size={30} />,
    title: "Future Goals",
    location: "Pan India",
    description: "Expanding globally with smart AI-powered features and support.",
  },
];

const JourneyTimeline = () => {
  return (
    <section className="journey-section">
      <div className="journey-header">
        <h2>Our Journey</h2>
        <p>Every step taken with purpose, innovation, and care.</p>
      </div>
      <div className="journey-wrapper">
        {timelineData.map((step, index) => (
          <motion.div
            key={index}
            className={`journey-step ${index % 2 === 0 ? "left" : "right"}`}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
          >
            <div className="step-icon">{step.icon}</div>
            <div className="step-content">
              <h4>{step.title}</h4>
              <span className="step-location">{step.location}</span>
              <p>{step.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default JourneyTimeline;
