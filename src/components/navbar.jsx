import React, { useState, useEffect } from "react";
import "./navbar.css";
import { ReactComponent as SearchIcon } from "./assets/search.svg";
import { ReactComponent as CartIcon } from "./assets/cart.svg";
import { ReactComponent as CustIcon } from "./assets/cust.svg";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const showDropdown = () => setDropdownVisible(true);
  const hideDropdown = () => setTimeout(() => setDropdownVisible(false), 200);

  const toggleSearch = (event) => {
    event.stopPropagation();
    setSearchActive(true);
  };

  const handleClickOutside = (event) => {
    if (!event.target.closest(".search-container")) {
      setSearchActive(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleSearchSubmit = (e) => {
    if (e.key === "Enter") {
      navigate(`/search?query=${searchQuery}`);
    }
  };

  const handleProfileClick = () => {
    navigate("/profile");
  };

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <h1 className="logo">H.e.a.r</h1>

      <ul className="nav-links">
      <li>
  <Link to="/#hero" smooth="true">Home</Link>  {/* 'smooth' is for smooth scrolling */}
</li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/products">Products</Link></li>
        <li><Link to="/blogs">Blogs</Link></li>
        <li><Link to="/support">Support</Link></li>

        {/* New Audio Waveform Icon */}
        <li>
  <div className="flex items-center gap-1 cursor-pointer" onClick={() => navigate("/hearingtest")}>
    {/* Inline SVG Code */}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-audio-waveform-icon lucide-audio-waveform"
    >
      <path d="M6 8.5a6.5 6.5 0 1 1 13 0c0 6-6 6-6 10a3.5 3.5 0 1 1-7 0"/>
      <path d="M15 8.5a2.5 2.5 0 0 0-5 0v1a2 2 0 1 1 0 4"/>
    </svg>
    <span className="hearing-test-caption">
  Start Your Hearing Test Now
</span>

  </div>
</li>

      </ul>

      <div className="nav-icons">
        <div className={`search-container ${searchActive ? "active" : ""}`}>
          <SearchIcon className="icon search-icon" onClick={toggleSearch} />
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearchSubmit}
            autoFocus={searchActive}
            style={{ display: searchActive ? "block" : "none" }}
          />
        </div>

        <CartIcon className="icon" />

        <div className="cust-icon-container" onMouseEnter={showDropdown} onMouseLeave={hideDropdown}>
          <CustIcon className="icon" onClick={handleProfileClick} />
          {dropdownVisible && (
            <div className="dropdown-menu">
              <p className="dropdown-header">Welcome</p>
              <p className="dropdown-subtext">Access account and manage orders</p>
              <Link to="/login" className="dropdown-button" onClick={() => setDropdownVisible(false)}>Login / Signup</Link>
              <hr className="dropdown-divider" />
              <Link to="/profile" className="dropdown-item">My Profile</Link>
              <Link to="/orders" className="dropdown-item">Orders</Link>
              <Link to="/wishlist" className="dropdown-item">Wishlist</Link>
              <Link to="/contact" className="dropdown-item">Contact Us</Link>
              <hr className="dropdown-divider" />
              <Link to="/coupons" className="dropdown-item">Coupons</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
