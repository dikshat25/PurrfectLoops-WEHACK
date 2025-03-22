import React, { useState, useEffect } from "react";
import "./Dashboard.css";

export default function App() {
  // State to store real-time data
  const [leaderboardData, setLeaderboardData] = useState(null);
  const [testData, setTestData] = useState([]);
  const [userData, setUserData] = useState(null);

  // Fetch real-time data every 5 seconds
  useEffect(() => {
    const fetchData = async () => {
      try {
        const leaderboardResponse = await fetch(
          "https://api.example.com/leaderboard"
        );
        const testResultsResponse = await fetch(
          "https://api.example.com/test-results"
        );
        const userResponse = await fetch("https://api.example.com/user");

        const leaderboardData = await leaderboardResponse.json();
        const testData = await testResultsResponse.json();
        const userData = await userResponse.json();

        setLeaderboardData(leaderboardData);
        setTestData(testData);
        setUserData(userData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Initial fetch

    const interval = setInterval(fetchData, 5000); // Fetch new data every 5 sec

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div className="dashboard-container">
      <header>
        <h1>Real-Time Dashboard</h1>
      </header>
      <main className="dashboard-layout">
        {/* User Info Section */}
        <section className="user-section">
          {userData ? (
            <div className="user-info-card">
              <div className="user-avatar">
                <img
                  src={userData.avatar || "/api/placeholder/100/100"}
                  alt="User profile"
                />
                <div className="level-badge">Level {userData.level}</div>
              </div>
              <div className="user-details">
                <h2>{userData.name}</h2>
                <p className="user-title">{userData.title}</p>
                <p className="user-email">{userData.email}</p>
              </div>
            </div>
          ) : (
            <p>Loading user data...</p>
          )}
        </section>

        {/* Leaderboard Section */}
        <section className="leaderboard-section">
          <h2>Leaderboard</h2>
          {leaderboardData ? (
            <table className="leaderboard-table">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>User</th>
                  <th>Level</th>
                  <th>Points</th>
                </tr>
              </thead>
              <tbody>
                {leaderboardData.map((user, index) => (
                  <tr
                    key={index}
                    className={user.isCurrentUser ? "current-user" : ""}
                  >
                    <td>{index + 1}</td>
                    <td className="user-cell">
                      <img
                        src={user.avatar || "/api/placeholder/40/40"}
                        alt={user.name}
                      />
                      {user.name}
                    </td>
                    <td>{user.level}</td>
                    <td>{user.points}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>Loading leaderboard data...</p>
          )}
        </section>

        {/* Test Results Section */}
        <section className="test-results-section">
          <h2>Recent Test Results</h2>
          {testData.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Test Name</th>
                  <th>Score</th>
                  <th>Completed Date</th>
                  <th>Skill Level</th>
                </tr>
              </thead>
              <tbody>
                {testData.map((test, index) => (
                  <tr key={index}>
                    <td>{test.testName}</td>
                    <td>{test.score}%</td>
                    <td>{new Date(test.completedDate).toLocaleDateString()}</td>
                    <td>{test.skillLevel}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No test results available.</p>
          )}
        </section>
      </main>
    </div>
  );
}
