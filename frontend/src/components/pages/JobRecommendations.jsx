import React, { useState } from "react";
import { Link } from "react-router-dom"; // Ensure correct import for Link
import { FaBriefcase, FaMicrophone, FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";
import "/src/App.css"; // ✅ Linking App.css for styles

const JobRecommendation = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 3;

  const jobs = [
    { id: 1, title: "Software Engineer", company: "Google", location: "Remote", type: "Backend", description: "Develop scalable applications." },
    { id: 2, title: "Data Scientist", company: "Amazon", location: "USA", type: "AI", description: "Analyze big data for insights." },
    { id: 3, title: "Frontend Developer", company: "Facebook", location: "India", type: "Frontend", description: "Build UI components and optimize UX." },
    { id: 4, title: "Backend Developer", company: "Microsoft", location: "Germany", type: "Backend", description: "Design and maintain backend services." },
    { id: 5, title: "AI Researcher", company: "OpenAI", location: "USA", type: "AI", description: "Work on cutting-edge AI models." },
    { id: 6, title: "Cybersecurity Analyst", company: "Cisco", location: "UK", type: "Security", description: "Protect networks from cyber threats." },
    { id: 7, title: "DevOps Engineer", company: "Netflix", location: "Remote", type: "Backend", description: "Automate deployment pipelines." }
  ];

  const filteredJobs = jobs.filter(job =>
    (filter === "All" || job.type === filter) &&
    (job.title.toLowerCase().includes(searchTerm.toLowerCase()) || job.company.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

  return (
    <div className="container">
      <header className="header">
        <Link to="/job-recommendation" className="nav-link">
          <FaBriefcase /> Job Recommendations
        </Link>
        <Link to="/mock-interview" className="nav-link">
          <FaMicrophone /> Mock Interview
        </Link>
      </header>

      <div className="content">
        <h1 className="heading">Job Recommendations</h1>

        <div className="controls">
          <input
            type="text"
            placeholder="Search jobs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-bar"
          />
          <select value={filter} onChange={(e) => setFilter(e.target.value)} className="filter">
            <option value="All">All</option>
            <option value="Frontend">Frontend</option>
            <option value="Backend">Backend</option>
            <option value="AI">AI</option>
            <option value="Security">Security</option>
          </select>
        </div>

        <div className="job-list">
          {currentJobs.length > 0 ? (
            currentJobs.map(job => (
              <div key={job.id} className="job-card">
                <h2>{job.title}</h2>
                <h3>{job.company}</h3>
                <p><strong>Location:</strong> {job.location}</p>
                <p><strong>Type:</strong> {job.type}</p>
                <p>{job.description}</p>
                <button className="button">View Details</button>
              </div>
            ))
          ) : (
            <p>No jobs found.</p>
          )}
        </div>

        {totalPages > 1 && (
          <div className="pagination">
            <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1} className="page-button">
              ⬅ Previous
            </button>
            <span> Page {currentPage} of {totalPages} </span>
            <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} className="page-button">
              Next ➡
            </button>
          </div>
        )}
      </div>

      <footer className="footer">
        <p>Follow Us:</p>
        <FaFacebook className="icon" />
        <FaTwitter className="icon" />
        <FaLinkedin className="icon" />
        <Link to="/mock-interview" className="footer-link">Go to Mock Interview</Link> {/* Footer Link */}
      </footer>
    </div>
  );
};

export default JobRecommendation;
