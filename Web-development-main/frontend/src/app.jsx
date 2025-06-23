import React from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/navbar";
import Hero from "./components/hero";
import Blogs from "./components/blogs";
import Support from "./components/support";
import Profile from "./components/profile";
import Login from "./components/login";
import AboutUs from "./components/about";
import HearingTest from "./components/hearingtest";

import "./App.css";

const AppContent = () => {
  const location = useLocation();

  // Hide Navbar on login and signup pages
  const hideNavbar = location.pathname === "/login" || location.pathname === "/signup";

  return (
    <div className="app-container">
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/support" element={<Support />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/hearingtest" element={<HearingTest />} />
      </Routes>
    </div>
  );
};

const App = () => (
  <Router>
    <AppContent />
  </Router>
);

export default App;
