import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import JobRecommendation from "./components/pages/JobRecommendations";
import MockInterview from "./components/pages/MockInterview";
import VideoAnalysis from "./pages/VideoAnalysis.jsx";
import DeepfakeDetection from "./pages/DeepFakeDetection.jsx";
import { UserCircle, Video, Shield, ChevronDown, Menu, X } from "lucide-react";
import "./App.css";

const App = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <div className="flex-shrink-0 flex items-center">
                  <Link to="/" className="text-blue-600 font-bold text-xl">
                    Skill Hiring Platform
                  </Link>
                </div>
                <nav className="hidden md:ml-6 md:flex md:space-x-4 items-center">
                  <Link to="/video-analysis" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100">
                    Video Analysis
                  </Link>
                  <Link to="/deepfake-detection" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100">
                    Deepfake Detection
                  </Link>
                  <div className="relative ml-3 group">
                    <button className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100">
                      More Features
                      <ChevronDown size={16} className="ml-1" />
                    </button>
                    <div className="hidden group-hover:block absolute z-10 left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-1">
                      <Link to="/mock-interview" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        AI Mock Interviews
                      </Link>
                      <Link to="/job-recommendation" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Job Recommendations
                      </Link>
                    </div>
                  </div>
                </nav>
              </div>
              <div className="hidden md:flex items-center">
                <button className="flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                  Upload Resume
                </button>
                <div className="ml-4 relative">
                  <button className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500">
                    <UserCircle size={32} />
                  </button>
                </div>
              </div>
              <div className="flex items-center md:hidden">
                <button 
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
                >
                  {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>
            </div>
          </div>
          {mobileMenuOpen && (
            <div className="md:hidden">
              <div className="pt-2 pb-3 space-y-1">
                <Link to="/video-analysis" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100" onClick={() => setMobileMenuOpen(false)}>
                  Video Analysis
                </Link>
                <Link to="/deepfake-detection" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100" onClick={() => setMobileMenuOpen(false)}>
                  Deepfake Detection
                </Link>
              </div>
            </div>
          )}
        </header>
        <main className="py-6">
          <Routes>
            <Route path="/" element={<JobRecommendation />} />
            <Route path="/video-analysis" element={<VideoAnalysis />} />
            <Route path="/deepfake-detection" element={<DeepfakeDetection />} />
            <Route path="/job-recommendation" element={<JobRecommendation />} />
            <Route path="/mock-interview" element={<MockInterview />} />
          </Routes>
        </main>
        <footer className="bg-gray-800 text-white py-3 text-center">
          <p>© {new Date().getFullYear()} Skill Hiring Platform</p>
        </footer>
      </div>
    </Router>
  );
};

export default App;
