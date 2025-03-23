import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SharedNavbar from "../pages/navbar";
import SharedFooter from "../pages/footer";

const JobRecommendation = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 3;
  const navigate = useNavigate();

  const containerStyle = {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "20px",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  };

  const contentStyle = {
    background: "#f8f9fa",
    borderRadius: "8px",
    padding: "30px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  };

  const headingStyle = {
    fontSize: "32px",
    color: "#2c3e50",
    marginBottom: "24px",
    textAlign: "center",
    fontWeight: "600",
  };

  const controlsStyle = {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "25px",
    flexWrap: "wrap",
    gap: "15px",
  };

  const searchBarStyle = {
    flex: "1",
    padding: "12px 16px",
    fontSize: "16px",
    border: "2px solid #e0e0e0",
    borderRadius: "6px",
    outline: "none",
    transition: "border 0.3s ease",
    minWidth: "200px",
  };

  const filterStyle = {
    padding: "12px 16px",
    fontSize: "16px",
    border: "2px solid #e0e0e0",
    borderRadius: "6px",
    backgroundColor: "white",
    cursor: "pointer",
    outline: "none",
    minWidth: "150px",
  };

  const jobListStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "20px",
    marginBottom: "30px",
  };

  const jobCardStyle = {
    backgroundColor: "white",
    borderRadius: "8px",
    padding: "20px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
    border: "1px solid #eaeaea",
    height: "100%",
    display: "flex",
    flexDirection: "column",
  };

  const jobTitleStyle = {
    fontSize: "22px",
    color: "#2c3e50",
    marginBottom: "6px",
    fontWeight: "600",
  };

  const companyStyle = {
    fontSize: "18px",
    color: "#3498db",
    marginBottom: "15px",
    fontWeight: "500",
  };

  const detailStyle = {
    marginBottom: "10px",
    fontSize: "14px",
    color: "#555",
  };

  const descriptionStyle = {
    marginBottom: "20px",
    lineHeight: "1.5",
    color: "#555",
    flex: "1",
  };

  const jobActionsStyle = {
    display: "flex",
    gap: "10px",
    marginTop: "auto",
  };

  const buttonStyle = {
    padding: "10px 15px",
    fontSize: "14px",
    fontWeight: "500",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    transition: "background-color 0.2s ease",
    flex: "1",
    textAlign: "center",
  };

  const primaryButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#3498db",
    color: "white",
  };

  const secondaryButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#f1f1f1",
    color: "#333",
    border: "1px solid #ddd",
  };

  const paginationStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "20px",
    gap: "15px",
  };

  const pageButtonStyle = {
    padding: "8px 15px",
    backgroundColor: "#f1f1f1",
    border: "1px solid #ddd",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px",
    color: "#333",
    transition: "background-color 0.2s ease",
  };

  const disabledButtonStyle = {
    ...pageButtonStyle,
    backgroundColor: "#f9f9f9",
    color: "#aaa",
    cursor: "not-allowed",
  };

  const noJobsStyle = {
    textAlign: "center",
    padding: "30px",
    color: "#555",
    fontSize: "18px",
  };

  const chipStyle = {
    display: "inline-block",
    padding: "4px 10px",
    fontSize: "12px",
    fontWeight: "500",
    borderRadius: "20px",
    marginRight: "8px",
  };

  const getTypeChipStyle = (type) => {
    const baseStyle = { ...chipStyle };
    
    switch(type) {
      case "Frontend":
        return { ...baseStyle, backgroundColor: "#e3f2fd", color: "#1565c0" };
      case "Backend":
        return { ...baseStyle, backgroundColor: "#e8f5e9", color: "#2e7d32" };
      case "AI":
        return { ...baseStyle, backgroundColor: "#f3e5f5", color: "#7b1fa2" };
      case "Security":
        return { ...baseStyle, backgroundColor: "#ffebee", color: "#c62828" };
      default:
        return { ...baseStyle, backgroundColor: "#f5f5f5", color: "#616161" };
    }
  };

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
    <div style={containerStyle}>
      <SharedNavbar activePage="jobs" />

      <div style={contentStyle}>
        <h1 style={headingStyle}>Job Recommendations</h1>

        <div style={controlsStyle}>
          <input
            type="text"
            placeholder="Search jobs or companies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={searchBarStyle}
          />
          <select 
            value={filter} 
            onChange={(e) => setFilter(e.target.value)} 
            style={filterStyle}
          >
            <option value="All">All Job Types</option>
            <option value="Frontend">Frontend</option>
            <option value="Backend">Backend</option>
            <option value="AI">AI</option>
            <option value="Security">Security</option>
          </select>
        </div>

        {currentJobs.length > 0 ? (
          <div style={jobListStyle}>
            {currentJobs.map(job => (
              <div key={job.id} style={jobCardStyle}>
                <h2 style={jobTitleStyle}>{job.title}</h2>
                <h3 style={companyStyle}>{job.company}</h3>
                <div style={detailStyle}>
                  <span style={getTypeChipStyle(job.type)}>{job.type}</span>
                  <span style={{ color: "#7f8c8d", fontSize: "13px" }}>📍 {job.location}</span>
                </div>
                <p style={descriptionStyle}>{job.description}</p>
                <div style={jobActionsStyle}>
                  <button style={primaryButtonStyle}>View Details</button>
                  <button 
                    style={secondaryButtonStyle} 
                    onClick={() => navigate("/mock-interview")}
                  >
                    Practice Interview
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p style={noJobsStyle}>No jobs found matching your criteria. Try adjusting your search.</p>
        )}

        {totalPages > 1 && (
          <div style={paginationStyle}>
            <button 
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} 
              disabled={currentPage === 1} 
              style={currentPage === 1 ? disabledButtonStyle : pageButtonStyle}
            >
              ⬅ Previous
            </button>
            <span style={{ fontSize: "14px", color: "#555" }}> 
              Page {currentPage} of {totalPages} 
            </span>
            <button 
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} 
              disabled={currentPage === totalPages} 
              style={currentPage === totalPages ? disabledButtonStyle : pageButtonStyle}
            >
              Next ➡
            </button>
          </div>
        )}
      </div>

      <SharedFooter />
    </div>
  );
};

export default JobRecommendation;