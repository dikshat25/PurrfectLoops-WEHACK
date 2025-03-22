import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBriefcase, FaMicrophone, FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";

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

  // Filter and paginate jobs
  const filteredJobs = jobs.filter(job =>
    (filter === "All" || job.type === filter) &&
    (job.title.toLowerCase().includes(searchTerm.toLowerCase()) || job.company.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <Link to="/job-recommendation" style={styles.navLink}>
          <FaBriefcase /> Job Recommendations
        </Link>
        <Link to="/mock-interview" style={styles.navLink}>
          <FaMicrophone /> Mock Interview
        </Link>
      </header>

      {/* Main Content */}
      <div style={styles.content}>
        <h1 style={styles.heading}>Job Recommendations</h1>

        <div style={styles.controls}>
          <input
            type="text"
            placeholder="Search jobs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={styles.searchBar}
          />
          <select value={filter} onChange={(e) => setFilter(e.target.value)} style={styles.filter}>
            <option value="All">All</option>
            <option value="Frontend">Frontend</option>
            <option value="Backend">Backend</option>
            <option value="AI">AI</option>
            <option value="Security">Security</option>
          </select>
        </div>

        {/* Job List */}
        <div style={styles.jobList}>
          {currentJobs.length > 0 ? (
            currentJobs.map(job => (
              <div key={job.id} style={styles.jobCard}>
                <h2>{job.title}</h2>
                <h3>{job.company}</h3>
                <p><strong>Location:</strong> {job.location}</p>
                <p><strong>Type:</strong> {job.type}</p>
                <p>{job.description}</p>
                <button style={styles.button}>View Details</button>
              </div>
            ))
          ) : (
            <p>No jobs found.</p>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div style={styles.pagination}>
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              style={styles.pageButton}
            >
              ⬅ Previous
            </button>
            <span> Page {currentPage} of {totalPages} </span>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              style={styles.pageButton}
            >
              Next ➡
            </button>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer style={styles.footer}>
        <p>Follow Us:</p>
        <FaFacebook style={styles.icon} />
        <FaTwitter style={styles.icon} />
        <FaLinkedin style={styles.icon} />
      </footer>
    </div>
  );
};

// Styles
const styles = {
  container: { padding: "20px", textAlign: "center" },
  header: { display: "flex", justifyContent: "center", gap: "20px", padding: "15px", background: "#007bff", color: "white" },
  navLink: { color: "white", textDecoration: "none", fontSize: "18px", display: "flex", alignItems: "center", gap: "5px" },
  content: { maxWidth: "800px", margin: "auto", textAlign: "center" },
  heading: { fontSize: "28px", marginBottom: "20px" },
  controls: { display: "flex", justifyContent: "center", gap: "10px", marginBottom: "20px" },
  searchBar: { padding: "10px", width: "250px", fontSize: "16px", borderRadius: "5px", border: "1px solid #ddd" },
  filter: { padding: "10px", fontSize: "16px", borderRadius: "5px", border: "1px solid #ddd" },
  jobList: { display: "flex", flexDirection: "column", alignItems: "center", gap: "20px", maxHeight: "400px", overflowY: "auto" },
  jobCard: { border: "1px solid #ddd", padding: "15px", borderRadius: "10px", boxShadow: "2px 2px 10px rgba(0,0,0,0.1)", width: "80%", textAlign: "left" },
  button: { background: "#007bff", color: "white", padding: "10px", border: "none", borderRadius: "5px", cursor: "pointer", marginTop: "10px" },
  pagination: { display: "flex", justifyContent: "center", gap: "10px", marginTop: "20px" },
  pageButton: { padding: "10px 20px", fontSize: "16px", cursor: "pointer", background: "#007bff", color: "white", border: "none", borderRadius: "5px" },
  footer: { display: "flex", justifyContent: "center", alignItems: "center", padding: "10px", background: "#007bff", color: "white", marginTop: "20px" },
  icon: { marginLeft: "10px", cursor: "pointer" }
};

export default JobRecommendation;
