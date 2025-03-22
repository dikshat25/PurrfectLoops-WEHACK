import React, { useState } from "react";
import "./Dashboard.css";

const Dashboard = ({ leaderboardData, testData, userData }) => {
  const [selectedSkill, setSelectedSkill] = useState("overall");

  if (!leaderboardData || !testData || !userData) {
    return <div className="loading-state">Loading data...</div>;
  }

  // Filter leaderboard data
  const filteredLeaderboard =
    selectedSkill === "overall"
      ? leaderboardData.overall || []
      : leaderboardData.skillRankings?.[selectedSkill] || [];

  return (
    <div className="dashboard-container">
      {/* User Info Section */}
      <div className="user-info">
        <div className="user-avatar">
          <img src={userData.avatar || "/api/placeholder/100/100"} alt="User" />
          <div className="level-badge">Level {userData.level}</div>
        </div>
        <div className="user-details">
          <h2>{userData.name}</h2>
          <p className="user-title">{userData.title}</p>
          <p className="user-email">{userData.email}</p>

          {/* User Badges */}
          <table className="badges-table">
            <thead>
              <tr>
                <th>Badge</th>
                <th>Name</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {userData.badges.map((badge, index) => (
                <tr key={index}>
                  <td>{badge.icon}</td>
                  <td>{badge.name}</td>
                  <td>{badge.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Leaderboard Section */}
      <div className="leaderboard">
        <div className="leaderboard-header">
          <h2>Leaderboard</h2>
          <select
            value={selectedSkill}
            onChange={(e) => setSelectedSkill(e.target.value)}
          >
            <option value="overall">Overall Ranking</option>
            {Object.keys(leaderboardData.skillRankings || {}).map((skill) => (
              <option key={skill} value={skill}>
                {skill}
              </option>
            ))}
          </select>
        </div>

        <table className="leaderboard-table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>User</th>
              <th>Level</th>
              <th>Points</th>
              <th>Badge</th>
            </tr>
          </thead>
          <tbody>
            {filteredLeaderboard.map((user, index) => (
              <tr
                key={index}
                className={user.isCurrentUser ? "current-user" : ""}
              >
                <td>{index + 1}</td>
                <td>
                  <img
                    src={user.avatar || "/api/placeholder/40/40"}
                    alt={user.name}
                  />
                  {user.name}
                </td>
                <td>{user.level}</td>
                <td>{user.points}</td>
                <td>{user.badge ? <span>{user.badge.icon}</span> : "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Test Results Section */}
      <div className="test-results">
        <h3>Test Results</h3>
        {testData.length === 0 ? (
          <p className="no-data">No test results available.</p>
        ) : (
          <table className="test-results-table">
            <thead>
              <tr>
                <th>Test Name</th>
                <th>Score (%)</th>
                <th>Completed On</th>
                <th>Skill Level</th>
                <th>Progress</th>
              </tr>
            </thead>
            <tbody>
              {testData.map((test, index) => (
                <tr key={index}>
                  <td>{test.testName}</td>
                  <td
                    className={
                      test.score >= 70 ? "good-score" : "improve-score"
                    }
                  >
                    {test.score}%
                  </td>
                  <td>{new Date(test.completedDate).toLocaleDateString()}</td>
                  <td>{test.skillLevel}</td>
                  <td>
                    <div className="progress-bar">
                      <div
                        className="progress"
                        style={{ width: `${test.skillProgress}%` }}
                      ></div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
