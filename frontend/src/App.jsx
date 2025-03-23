import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import VideoAnalysis from "./pages/VideoAnalysis";
import DeepfakeDetection from "./pages/DeepFakeDetection";
import JobRecommendations from "./pages/JobRecommendations";
import LoginPage from "./pages/LoginPage";
import MockInterview from "./pages/MockInterview";
import ProfilePage from "./pages/ProfilePage";
import Registration from "./pages/Registration";
import SignupPage from "./pages/SignupPage";
import AchievementsPage from "./pages/AchievementsPage";
import CollaborativeChallenges from "./pages/CollaborativeChallenges";
import LeaderBoardCareerPath from "./pages/LeaderBoardCareerPath";
import SkillDuelsPage from "./pages/SkillDuelsPage";
import Games from "./pages/games";
import TypingTest from "./pages/TypingTest";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/video-analysis" element={<VideoAnalysis />} />
        <Route path="/deepfake-detection" element={<DeepfakeDetection />} />
        <Route path="/job-recommendations" element={<JobRecommendations />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/mock-interview" element={<MockInterview />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/achievements" element={<AchievementsPage />} />
        <Route path="/collaborative-challenges" element={<CollaborativeChallenges />} />
        <Route path="/leaderboard" element={<LeaderBoardCareerPath />} />
        <Route path="/skillduels" element={<SkillDuelsPage />} />
        <Route path="/games" element={<Games />} />
        <Route path="/typingtest" element={<TypingTest />} />
      </Routes>
    </Router>
  );
};

export default App;