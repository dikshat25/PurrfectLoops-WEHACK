import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";

const SharedFooter = () => {
  return (
    <footer className="footer">
      <div className="footer-sections">
        <div className="footer-section">
          <h3>Navigate</h3>
          <Link to="/" className="footer-link">Home</Link>
          <Link to="/job-recommendations" className="footer-link">Job Listings</Link>
          <Link to="/mock-interview" className="footer-link">Mock Interviews</Link>
          <Link to="/profile" className="footer-link">Profile</Link>
        </div>
        <div className="footer-section">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <FaFacebook className="icon" />
            <FaTwitter className="icon" />
            <FaLinkedin className="icon" />
          </div>
        </div>
        <div className="footer-section">
          <h3>Account</h3>
          <Link to="/login" className="footer-link">Login</Link>
          <Link to="/signup" className="footer-link">Sign Up</Link>
          <Link to="/registration" className="footer-link">Register</Link>
        </div>
      </div>
      <div className="copyright">
        <p>© 2025 SkillHiring. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default SharedFooter;