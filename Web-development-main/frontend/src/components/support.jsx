
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaQuestionCircle } from 'react-icons/fa';
import './support.css';

const Support = () => {
  const [showChat, setShowChat] = useState(false);
  const [activeFAQ, setActiveFAQ] = useState(null);

  const faqs = [
    { question: 'How to track my order?', answer: 'You can track your order using the tracking ID sent to your email.' },
    { question: 'What is the return policy?', answer: 'We accept returns within 30 days of delivery.' },
    { question: 'Do you offer international shipping?', answer: 'Yes, we provide international shipping with additional charges.' },
  ];

  const toggleFAQ = (index) => {
    setActiveFAQ(activeFAQ === index ? null : index);
  };

  return (
    <div className="support-container">

      <motion.div
        className="chatbot-button"
        onClick={() => setShowChat(!showChat)}
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        whileHover={{ scale: 1.1 }}
      >
        💬 Chat with Us
      </motion.div>

      {showChat && (
        <motion.div
          className="chatbox"
          initial={{ y: 300 }}
          animate={{ y: 0 }}
          exit={{ y: 300 }}
        >
          <p>Hi there! How can we help you today?</p>
          <button onClick={() => setShowChat(false)}>Close</button>
        </motion.div>
      )}

      <section className="faq-section">
        <h2><FaQuestionCircle /> Frequently Asked Questions</h2>
        {faqs.map((faq, index) => (
          <div key={index} className="faq-item">
            <div className="faq-question" onClick={() => toggleFAQ(index)}>
              {faq.question}
            </div>
            <motion.div
              className="faq-answer"
              initial={false}
              animate={{ height: activeFAQ === index ? 'auto' : 0, opacity: activeFAQ === index ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <p>{faq.answer}</p>
            </motion.div>
          </div>
        ))}
      </section>

      <section className="contact-section">
        <h2>Contact Us</h2>
        <div className="contact-details">
          <p><FaPhone /> +123-456-7890</p>
          <p><FaEnvelope /> support@hearingaidshop.com</p>
          <p><FaMapMarkerAlt /> 123 Hearing Street, Audiotown</p>
        </div>

        <form className="contact-form">
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <textarea placeholder="Your Message" required></textarea>
          <button type="submit">Submit</button>
        </form>
      </section>

      <section className="map-section">
        <h2>Find a Store Near You</h2>
        <div className="map-placeholder">Map integration coming soon!</div>
      </section>
    </div>
  );
};

export default Support;
