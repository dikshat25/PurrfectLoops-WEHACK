import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBriefcase, FaMicrophone, FaVideo, FaHome, FaUserCircle, FaSignInAlt } from "react-icons/fa";

const SharedNavbar = ({ activePage }) => {
  const navigate = useNavigate();

  return (
    <header className="header">
      <div className="logo">
        <h1>Skill<span>Hiring</span></h1>
      </div>
      <div className="nav-links">
        <Link to="/" className={`nav-link ${activePage === 'home' ? 'active' : ''}`}>
          <FaHome /> Home
        </Link>
        <Link to="/job-recommendations" className={`nav-link ${activePage === 'jobs' ? 'active' : ''}`}>
          <FaBriefcase /> Job Recommendations
        </Link>
        <Link to="/mock-interview" className={`nav-link ${activePage === 'interview' ? 'active' : ''}`}>
          <FaMicrophone /> Mock Interview
        </Link>
        <Link to="/deepfake-detection" className={`nav-link ${activePage === 'deepfake' ? 'active' : ''}`}>
          <FaVideo /> Deepfake Detection
        </Link>
        <Link to="/profile" className={`nav-link ${activePage === 'profile' ? 'active' : ''}`}>
          <FaUserCircle /> Profile
        </Link>
      </div>
      <div className="auth-links">
        <Link to="/login" className="auth-link">
          <FaSignInAlt /> Login
        </Link>
        <Link to="/signup" className="auth-link">Sign Up</Link>
      </div>
    </header>
  );
};

export default SharedNavbar;