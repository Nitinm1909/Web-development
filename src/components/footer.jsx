import React from 'react';
import './footer.css';
import { MessageCircle, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-overlay" />

      <div className="footer-content">
        <div className="footer-brand">
          <h1 className="brand-title">H . E . A . R</h1>
          <p>Your trusted partner in hearing wellness. Based in Chennai, we offer high-quality hearing aids and expert consultation services to help you live better.</p>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><Facebook size={20} /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><Instagram size={20} /></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><Twitter size={20} /></a>
          </div>
        </div>

        <div className="footer-links">
          <h3>Explore</h3>
          <ul>
            <li><a href="/products">Hearing Aids</a></li>
            <li><a href="/consultation">Book Consultation</a></li>
            <li><a href="/support">Support</a></li>
            <li><a href="/about">About Us</a></li>
          </ul>
        </div>

        <div className="footer-contact">
          <h3>Contact Us</h3>
          <p>Email: support@hearwell.in</p>
          <p>Phone: +91 98765 43210</p>
          <p>Location: Chennai, India</p>
          <p>GSTIN: 33AAAAA0000A1Z5</p>
        </div>

        <div className="footer-newsletter">
          <h3>Subscribe</h3>
          <p>Stay updated on our latest products and offers.</p>
          <form>
            <input type="email" placeholder="Your email" />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} H.E.A.R. All rights reserved.</p>
      </div>

      <div className="floating-consultation">
        <a href="/consultation">
          <MessageCircle size={20} />
          <span>Take Consultation</span>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
