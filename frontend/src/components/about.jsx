import React from 'react';
import { FaCheckCircle, FaStar, FaAward } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Slider from 'react-slick';
import CountUp from 'react-countup';

// Dummy Data
const teamMembers = [
  { name: 'John Doe', role: 'Audiologist', image: 'https://via.placeholder.com/150?text=Team+Member+1' },
  { name: 'Jane Smith', role: 'Technician', image: 'https://via.placeholder.com/150?text=Team+Member+2' },
];

const testimonials = [
  { name: 'Alice Johnson', feedback: 'Amazing service and hearing aid quality!', rating: 5 },
  { name: 'Michael Brown', feedback: 'Truly changed my life.', rating: 4 },
];

const awards = [
  "Best Innovation 2023", "Top Rated Service", "Media Feature - HealthToday", "Excellence Award"
];

const coreValues = [
  'Compassionate Care', 
  'Innovation & Excellence', 
  'Client-Centered Approach', 
  'Integrity & Transparency', 
  'Lifelong Support'
];

const AboutUs = () => {
  const testimonialSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    appendDots: dots => (
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        {dots.map((dot, index) => (
          <div key={index} style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#0077b6', margin: '0 6px', cursor: 'pointer' }}></div>
        ))}
      </div>
    ),
  };

  const awardsSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
  };

  return (
    <div style={{ fontFamily: 'Poppins, sans-serif', backgroundColor: '#f8f9fa' }}>

      {/* Hero Section */}
      <section style={{ textAlign: 'center', padding: '6rem 2rem', backgroundColor: '#0077b6', color: 'white', backgroundImage: 'url("https://via.placeholder.com/1200x800?text=Hero+Image")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: 'bold' }}>Helping You Hear Life’s Most Important Moments</h1>
        <p style={{ fontSize: '1.5rem', marginTop: '1rem' }}>We are dedicated to reconnecting people to the world through better hearing.</p>
      </section>

      {/* Our Mission */}
      <section style={{ padding: '4rem 2rem', textAlign: 'center', backgroundColor: '#e9ecef', borderBottom: '2px solid #0077b6' }}>
        <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>Our Mission</h2>
        <p style={{ fontSize: '1.2rem', marginTop: '1rem' }}>
          Empowering individuals with hearing loss by providing advanced technology and compassionate care.
        </p>
      </section>

      {/* Our Achievements */}
      <section style={{ padding: '4rem 2rem', textAlign: 'center', backgroundColor: '#f8f9fa', borderBottom: '2px solid #0077b6' }}>
        <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>Our Achievements</h2>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '3rem' }}>
          <div style={{ textAlign: 'center' }}>
            <h1><CountUp end={1000} duration={2} />+</h1>
            <p>Trusted Customers</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <h1><CountUp end={500} duration={2} />+</h1>
            <p>Successful Consultations</p>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section style={{ padding: '4rem 2rem', textAlign: 'center', backgroundColor: '#e9ecef' }}>
        <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>Our Core Values</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginTop: '2rem' }}>
          {coreValues.map((value, i) => (
            <motion.div 
              whileHover={{ scale: 1.1 }} 
              style={{
                backgroundColor: 'white', 
                padding: '2rem', 
                borderRadius: '10px', 
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)', 
                textAlign: 'center', 
                transition: 'all 0.3s ease'
              }} 
              key={i}
            >
              <FaCheckCircle color="#0077b6" size={40} />
              <p style={{ fontSize: '1.2rem', marginTop: '1rem' }}>{value}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ padding: '4rem 2rem', textAlign: 'center', backgroundColor: '#e9ecef', borderBottom: '2px solid #0077b6' }}>
        <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>What Our Clients Say</h2>
        <Slider {...testimonialSettings}>
          {testimonials.map((t, index) => (
            <motion.div 
              key={index} 
              whileHover={{ scale: 1.05 }} 
              style={{
                padding: '2rem', 
                backgroundColor: 'white', 
                borderRadius: '10px', 
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)', 
                textAlign: 'center', 
                margin: '1rem'
              }}
            >
              <p style={{ fontSize: '1.3rem', marginBottom: '1rem', fontStyle: 'italic' }}><em>“{t.feedback}”</em></p>
              <p style={{ fontSize: '1.1rem', fontWeight: 'bold' }}><strong>- {t.name}</strong></p>
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
                {[...Array(t.rating)].map((_, i) => (
                  <FaStar key={i} style={{ color: 'gold' }} />
                ))}
              </div>
            </motion.div>
          ))}
        </Slider>
      </section>

      {/* Meet Our Team */}
      <section style={{ padding: '4rem 2rem', textAlign: 'center', backgroundColor: '#f8f9fa' }}>
        <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>Meet Our Team</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginTop: '2rem' }}>
          {teamMembers.map((member, index) => (
            <motion.div 
              whileHover={{ scale: 1.05 }} 
              style={{
                textAlign: 'center', 
                transition: 'all 0.3s ease'
              }} 
              key={index}
            >
              <img 
                src={member.image} 
                alt={member.name} 
                style={{
                  width: '150px', 
                  height: '150px', 
                  borderRadius: '50%', 
                  objectFit: 'cover', 
                  marginBottom: '1rem', 
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }} 
              />
              <h3 style={{ fontSize: '1.4rem', fontWeight: 'bold' }}>{member.name}</h3>
              <p style={{ fontSize: '1.2rem', fontStyle: 'italic' }}>{member.role}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Awards */}
      <section style={{ padding: '4rem 2rem', textAlign: 'center', backgroundColor: '#e9ecef' }}>
        <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>Awards & Media Mentions</h2>
        <Slider {...awardsSettings}>
          {awards.map((award, index) => (
            <motion.div 
              whileHover={{ scale: 1.1 }} 
              style={{
                padding: '2rem', 
                backgroundColor: 'white', 
                borderRadius: '10px', 
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)', 
                textAlign: 'center', 
                margin: '1rem'
              }} 
              key={index}
            >
              <FaAward size={40} color="#0077b6" />
              <p style={{ fontSize: '1.2rem', marginTop: '1rem' }}>{award}</p>
            </motion.div>
          ))}
        </Slider>
      </section>
    </div>
  );
};

export default AboutUs;