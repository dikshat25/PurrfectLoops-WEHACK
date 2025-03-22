import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import JobRecommendation from "./components/pages/JobRecommendations"; // Updated import
import MockInterview from "./components/pages/MockInterview";
import "./App.css"; // ✅ Link global styles here

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <div className="flex-grow">
          <Routes>
            <Route path="/job-recommendation" element={<JobRecommendation />} />
            <Route path="/mock-interview" element={<MockInterview />} />
            <Route path="/" element={<JobRecommendation />} />
          </Routes>
        </div>

        {/* Inline Footer */}
        <div className="bg-gray-800 text-white py-3 text-center">
          <p>© {new Date().getFullYear()} Skill Hiring Platform</p>
        </div>
      </div>
    </Router>
  );
}

export default App;
