import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SharedNavbar from "../pages/navbar";
import SharedFooter from "../pages/footer";

const JobRecommendation = () => {
  const [skills, setSkills] = useState(""); // Input for user skills
  const [experience, setExperience] = useState(""); // Input for experience
  const [jobRecommendations, setJobRecommendations] = useState([]); // Store API results
  const [loading, setLoading] = useState(false); // Loader state
  const [error, setError] = useState(null); // Error state
  const navigate = useNavigate();

  const fetchRecommendations = async () => {
    try {
        const response = await fetch("http://127.0.0.1:5000/recommend", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Origin": "http://localhost:5173"  // Explicitly sending Origin
            },
            body: JSON.stringify({
                skills: skills,
                experience: parseInt(experience) || 0
            }),
        });

        console.log("Response Status:", response.status);
        const data = await response.json();
        console.log("Response Data:", data);

        if (response.ok) {
            setJobRecommendations(data.recommendations || []);
        } else {
            setError(data.error || "Failed to fetch recommendations.");
        }
    } catch (error) {
        console.error("Fetch Error:", error);
        setError("Error connecting to the server. Check API URL.");
    }
};

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
      <SharedNavbar activePage="jobs" />

      <div style={{ background: "#f8f9fa", padding: "30px", borderRadius: "8px" }}>
        <h1 style={{ textAlign: "center", color: "#2c3e50" }}>Job Recommendations</h1>

        <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
          <input
            type="text"
            placeholder="Enter your skills (e.g., Python, ML)"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            style={{
              flex: "1",
              padding: "10px",
              border: "2px solid #ddd",
              borderRadius: "6px",
              fontSize: "16px",
            }}
          />
          <input
            type="number"
            placeholder="Years of experience"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            style={{
              width: "150px",
              padding: "10px",
              border: "2px solid #ddd",
              borderRadius: "6px",
              fontSize: "16px",
            }}
          />
          <button
            onClick={fetchRecommendations}
            style={{
              backgroundColor: "#3498db",
              color: "white",
              padding: "10px 20px",
              borderRadius: "6px",
              fontSize: "16px",
              cursor: "pointer",
              border: "none",
            }}
          >
            Get Recommendations
          </button>
        </div>

        {loading && <p style={{ textAlign: "center", color: "#555" }}>Fetching recommendations...</p>}
        {error && <p style={{ textAlign: "center", color: "red" }}>{error}</p>}

        {jobRecommendations.length > 0 ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px" }}>
            {jobRecommendations.map((job, index) => (
              <div key={index} style={{ backgroundColor: "white", padding: "20px", borderRadius: "8px" }}>
                <h2 style={{ color: "#2c3e50" }}>{job.job_title}</h2>
                <h3 style={{ color: "#3498db" }}>{job.company}</h3>
                <button
                  style={{
                    backgroundColor: "#3498db",
                    color: "white",
                    padding: "10px",
                    borderRadius: "6px",
                    border: "none",
                    cursor: "pointer",
                  }}
                  onClick={() => navigate("/mock-interview")}
                >
                  Practice Interview
                </button>
              </div>
            ))}
          </div>
        ) : (
          !loading && <p style={{ textAlign: "center", color: "#555" }}>No recommendations available.</p>
        )}
      </div>

      <SharedFooter />
    </div>
  );
};

export default JobRecommendation;
