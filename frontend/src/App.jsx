import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import JobRecommendations from "./components/JobRecommendations";
import MockInterview from "./components/MockInterview";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <div className="flex-grow">
          <Routes>
            <Route path="/job-recommendations" element={<JobRecommendations />} />
            <Route path="/mock-interview" element={<MockInterview />} />
            <Route path="/" element={<JobRecommendations />} />
          </Routes>
        </div>

        {/* Inline Footer (instead of separate Footer.jsx) */}
        <div className="bg-gray-800 text-white py-3 text-center">
          <p>© {new Date().getFullYear()} Skill Hiring Platform</p>
        </div>
      </div>
    </Router>
  );
}

export default App;
