import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/style.css";
import {
  FaSearch,
  FaLaptopCode,
  FaRobot,
  FaGamepad,
  FaVideo,
  FaBriefcase,
  FaUserCircle
} from "react-icons/fa";
import { IoFilter } from "react-icons/io5";
import SharedNavbar from "../pages/navbar";
import SharedFooter from "../pages/footer";

const HomePage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // For demo purposes
  const navigate = useNavigate(); // Initialize useNavigate hook

  // Function to navigate to different feature pages
  const navigateToFeature = (path) => {
    navigate(path);
  };

  const featuredJobs = [
    {
      title: "Senior React Developer",
      company: "TechCorp",
      location: "Remote",
      salary: "$120k-$150k",
    },
    {
      title: "Data Scientist",
      company: "AI Solutions",
      location: "New York",
      salary: "$130k-$160k",
    },
    {
      title: "UX Designer",
      company: "DesignHub",
      location: "San Francisco",
      salary: "$110k-$140k",
    },
    {
      title: "Product Manager",
      company: "InnovateCo",
      location: "Boston",
      salary: "$125k-$155k",
    },
  ];

  const topCompanies = [
    "Google",
    "Microsoft",
    "Amazon",
    "Apple",
    "Meta",
    "Netflix",
    "Adobe",
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Frontend Developer",
      quote:
        "The AI-powered mock interviews gave me the confidence to ace my dream job interview!",
    },
    {
      name: "Michael Chen",
      role: "Data Analyst",
      quote:
        "Thanks to Skill Hiring, I found the perfect job that matched my unique skill set.",
    },
    {
      name: "Priya Patel",
      role: "Product Manager",
      quote:
        "The gamified skill assessments made the job hunting process actually enjoyable!",
    },
  ];

  const blogPosts = [
    { title: "10 Most In-Demand Tech Skills for 2025", date: "March 15, 2025" },
    { title: "How to Prepare for AI-Based Interviews", date: "March 10, 2025" },
    {
      title: "The Future of Remote Work: Trends to Watch",
      date: "March 5, 2025",
    },
  ];

  return (
    <div className="homepage">
      {/* Navigation */}
      <SharedNavbar activePage="home" />

      {/* 1. Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Find the Right Job with the Right Skills!</h1>
          <p>
            Our AI-driven platform matches your unique skills with the perfect
            job opportunities, streamlining the hiring process for both
            candidates and employers.
          </p>
          <div className="hero-cta">
            <button className="cta-primary" onClick={() => navigateToFeature("/registration")}>Register Now</button>
            <button className="cta-secondary">Post a Job</button>
          </div>
        </div>
      </section>

      
      {/* 3. Key Features Section */}
      <section className="features-section">
        <h2>Our AI-Powered Features</h2>
        <div className="features-grid">
          <div 
            className="feature-card"
            onClick={() => navigateToFeature("/video-analysis")}
            style={{ cursor: "pointer" }}
          >
            <div className="feature-icon">
              <FaVideo />
            </div>
            <h3>AI-Powered Video Analysis</h3>
            <p>
              Real-time feedback on confidence, voice modulation, and technical
              depth.
            </p>
            <button className="feature-btn">Try Now</button>
          </div>
          <div 
            className="feature-card"
            onClick={() => navigateToFeature("/deepfake-detection")}
            style={{ cursor: "pointer" }}
          >
            <div className="feature-icon">
              <FaUserCircle />
            </div>
            <h3>Deepfake Detection</h3>
            <p>
              Ensuring authenticity in video interviews with advanced AI
              verification.
            </p>
            <button className="feature-btn">Try Now</button>
          </div>
          <div 
            className="feature-card"
            onClick={() => navigateToFeature("/games")}
            style={{ cursor: "pointer" }}
          >
            <div className="feature-icon">
              <FaGamepad />
            </div>
            <h3>Gamified Skill Assessments</h3>
            <p>
              Interactive challenges with leaderboards to showcase your
              abilities.
            </p>
            <button className="feature-btn">Try Now</button>
          </div>
          <div 
            className="feature-card"
            onClick={() => navigateToFeature("/mock-interview")}
            style={{ cursor: "pointer" }}
          >
            <div className="feature-icon">
              <FaRobot />
            </div>
            <h3>AI-Based Mock Interviews</h3>
            <p>
              Simulated interviews with instant feedback to improve your
              performance.
            </p>
            <button className="feature-btn">Try Now</button>
          </div>
          <div 
            className="feature-card"
            onClick={() => navigateToFeature("/job-recommendations")}
            style={{ cursor: "pointer" }}
          >
            <div className="feature-icon">
              <FaLaptopCode />
            </div>
            <h3>Smart Job Recommendations</h3>
            <p>
              AI-driven job matches based on your skills and past experience.
            </p>
            <button className="feature-btn">Try Now</button>
          </div>
        </div>
      </section>

      {/* 4. User Dashboard Preview (conditionally rendered) */}
      {isLoggedIn && (
        <section className="dashboard-preview">
          <h2>Your Dashboard</h2>
          <div className="dashboard-container">
            <div className="profile-summary">
              <div className="profile-image">{/* Profile image removed */}</div>
              <div className="profile-details">
                <h3>Welcome back, John Doe!</h3>
                <div className="profile-progress">
                  <div className="progress-bar">
                    <div className="progress" style={{ width: "75%" }}></div>
                  </div>
                  <span>Profile 75% Complete</span>
                </div>
                <div className="skills-tags">
                  <span>React</span>
                  <span>Node.js</span>
                  <span>UI/UX</span>
                  <span>+5 more</span>
                </div>
              </div>
            </div>
            <div className="dashboard-stats">
              <div className="stat-card">
                <h4>Applications</h4>
                <p className="stat-number">12</p>
                <p className="stat-label">3 in review</p>
              </div>
              <div className="stat-card">
                <h4>Interviews</h4>
                <p className="stat-number">4</p>
                <p className="stat-label">2 upcoming</p>
              </div>
              <div className="stat-card">
                <h4>Leaderboard</h4>
                <p className="stat-number">#42</p>
                <p className="stat-label">Top 10%</p>
              </div>
            </div>
            <button 
              className="view-profile-btn" 
              onClick={() => navigateToFeature("/profile")}
            >
              View Full Profile
            </button>
          </div>
        </section>
      )}

      {/* 5. Featured Jobs & Companies */}
      <section className="jobs-companies-section">
        <div className="section-header">
          <h2>Discover Opportunities</h2>
        </div>
        <div className="jobs-companies-container">
          <div className="featured-jobs">
            <h3>Trending Jobs</h3>
            <div className="jobs-grid">
              {featuredJobs.map((job, index) => (
                <div className="job-card" key={index}>
                  <div className="job-card-header">
                    {/* Company logo removed */}
                    <div className="job-details">
                      <h4>{job.title}</h4>
                      <p>{job.company}</p>
                    </div>
                  </div>
                  <div className="job-card-body">
                    <div className="job-location">
                      <p>{job.location}</p>
                    </div>
                    <div className="job-salary">
                      <p>{job.salary}</p>
                    </div>
                  </div>
                  <div className="job-card-footer">
                    <button className="apply-btn">Apply Now</button>
                  </div>
                </div>
              ))}
            </div>
            <button 
              className="view-all-btn"
              onClick={() => navigateToFeature("/job-recommendations")}
            >
              View All Jobs
            </button>
          </div>
          <div className="top-companies">
            <h3>Top Hiring Companies</h3>
            <div className="companies-grid">
              {topCompanies.map((company, index) => (
                <div className="company-card" key={index}>
                  {/* Company logo removed */}
                  <p>{company}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 7. Blog & Career Resources */}
      <section className="resources-section">
        <h2>Career Resources</h2>
        <div className="resources-container">
          <div className="blog-posts">
            <h3>Latest from Our Blog</h3>
            <div className="blog-grid">
              {blogPosts.map((post, index) => (
                <div className="blog-card" key={index}>
                  <div className="blog-image">{/* Blog image removed */}</div>
                  <div className="blog-content">
                    <span className="blog-date">{post.date}</span>
                    <h4>{post.title}</h4>
                    <a href="#" className="read-more">
                      Read More →
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="events-webinars">
            <h3>Upcoming Events</h3>
            <div className="event-card">
              <div className="event-date">
                <span className="day">28</span>
                <span className="month">Mar</span>
              </div>
              <div className="event-details">
                <h4>Mastering Technical Interviews</h4>
                <p>Virtual Webinar • 7:00 PM EST</p>
                <button className="register-btn">Register</button>
              </div>
            </div>
            <div className="event-card">
              <div className="event-date">
                <span className="day">05</span>
                <span className="month">Apr</span>
              </div>
              <div className="event-details">
                <h4>Career Fair: Tech Industry</h4>
                <p>Online • 10:00 AM - 4:00 PM EST</p>
                <button className="register-btn">Register</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Footer */}
      <SharedFooter />
    </div>
  );
};

export default HomePage;