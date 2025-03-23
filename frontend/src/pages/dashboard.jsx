import React, { useState, useEffect } from "react";

export default function EnhancedDashboard() {
  // Sample data - in a production app, this would come from your API
  const sampleLeaderboardData = [
    { name: "Alex Johnson", level: 8, points: 2450, avatar: null, isCurrentUser: true },
    { name: "Maria Garcia", level: 9, points: 2200, avatar: null, isCurrentUser: false },
    { name: "James Wilson", level: 7, points: 1950, avatar: null, isCurrentUser: false },
    { name: "Sarah Kim", level: 8, points: 1800, avatar: null, isCurrentUser: false },
    { name: "David Chen", level: 6, points: 1650, avatar: null, isCurrentUser: false },
  ];

  const sampleTestData = [
    { testName: "JavaScript Fundamentals", score: 92, completedDate: "2025-03-15", skillLevel: "Advanced" },
    { testName: "React Components", score: 88, completedDate: "2025-03-10", skillLevel: "Intermediate" },
    { testName: "CSS Grid & Flexbox", score: 95, completedDate: "2025-03-05", skillLevel: "Advanced" },
    { testName: "API Integration", score: 78, completedDate: "2025-02-28", skillLevel: "Intermediate" },
  ];

  const sampleUserData = {
    name: "Alex Johnson",
    title: "Frontend Developer",
    email: "alex.johnson@example.com",
    level: 8,
    avatar: null,
    completedTests: 12,
    totalPoints: 2450,
    badges: ["HTML Master", "CSS Guru", "JS Ninja"]
  };

  // State to store real-time data
  const [leaderboardData, setLeaderboardData] = useState(null);
  const [testData, setTestData] = useState([]);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [themeMode, setThemeMode] = useState("light");
  
  // Toggle theme function
  const toggleTheme = () => {
    setThemeMode(themeMode === "light" ? "dark" : "light");
  };

  // Fetch real-time data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // In a real app, these would be actual API calls
        // For demo purposes, we're simulating a network delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setLeaderboardData(sampleLeaderboardData);
        setTestData(sampleTestData);
        setUserData(sampleUserData);
      } catch (error) {
        console.warn("API call failed, using sample data:", error);
        setLeaderboardData(sampleLeaderboardData);
        setTestData(sampleTestData);
        setUserData(sampleUserData);
      } finally {
        setLoading(false);
      }
    };

    fetchData(); // Initial fetch

    const interval = setInterval(fetchData, 30000); // Refresh every 30 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  // Calculate progress for progress bars
  const calculateProgress = (score) => {
    return score + "%";
  };

  if (loading) {
    return (
      <div className="loading-container" style={styles.loadingContainer}>
        <div className="spinner" style={styles.spinner}></div>
        <p>Loading your dashboard...</p>
      </div>
    );
  }

  return (
    <div className={`dashboard-container ${themeMode}`} style={{
      ...styles.dashboardContainer,
      backgroundColor: themeMode === "dark" ? "#1a1a2e" : "#f5f7fa",
      color: themeMode === "dark" ? "#f0f0f0" : "#333"
    }}>
      <header style={styles.header}>
        <div style={styles.logoArea}>
          <h1 style={styles.logo}>DevDashboard</h1>
        </div>
        <nav style={styles.nav}>
          <ul style={styles.navList}>
            <li 
              style={{ 
                ...styles.navItem, 
                backgroundColor: activeTab === "dashboard" ? (themeMode === "dark" ? "#303056" : "#e0e6ed") : "transparent" 
              }}
              onClick={() => setActiveTab("dashboard")}
            >
              Dashboard
            </li>
            <li 
              style={{ 
                ...styles.navItem, 
                backgroundColor: activeTab === "reports" ? (themeMode === "dark" ? "#303056" : "#e0e6ed") : "transparent" 
              }}
              onClick={() => setActiveTab("reports")}
            >
              Reports
            </li>
            <li 
              style={{ 
                ...styles.navItem, 
                backgroundColor: activeTab === "settings" ? (themeMode === "dark" ? "#303056" : "#e0e6ed") : "transparent" 
              }}
              onClick={() => setActiveTab("settings")}
            >
              Settings
            </li>
          </ul>
        </nav>
        <div style={styles.themeToggle} onClick={toggleTheme}>
          {themeMode === "light" ? "🌙" : "☀️"}
        </div>
      </header>
      
      <main style={styles.dashboardLayout}>
        {/* User Info Section with Enhanced Stats */}
        <section style={styles.userSection}>
          <div style={styles.userInfoCard}>
            <div style={styles.userAvatar}>
              <img
                src={userData.avatar || "/api/placeholder/100/100"}
                alt="User profile"
                style={styles.avatarImg}
              />
              <div style={styles.levelBadge}>Level {userData.level}</div>
            </div>
            <div style={styles.userDetails}>
              <h2 style={styles.userName}>{userData.name}</h2>
              <p style={styles.userTitle}>{userData.title}</p>
              <p style={styles.userEmail}>{userData.email}</p>
              
              <div style={styles.userStats}>
                <div style={styles.statItem}>
                  <div style={styles.statValue}>{userData.completedTests}</div>
                  <div style={styles.statLabel}>Tests</div>
                </div>
                <div style={styles.statItem}>
                  <div style={styles.statValue}>{userData.totalPoints}</div>
                  <div style={styles.statLabel}>Points</div>
                </div>
                <div style={styles.statItem}>
                  <div style={styles.statValue}>{userData.badges.length}</div>
                  <div style={styles.statLabel}>Badges</div>
                </div>
              </div>
              
              <div style={styles.badgeContainer}>
                {userData.badges.map((badge, index) => (
                  <span key={index} style={styles.badge}>{badge}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Leaderboard Section */}
        <section style={styles.leaderboardSection}>
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>Leaderboard</h2>
            <span style={styles.refreshIndicator}>Auto refreshes every 30s</span>
          </div>
          
          {leaderboardData ? (
            <div style={styles.tableContainer}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>Rank</th>
                    <th style={styles.th}>User</th>
                    <th style={styles.th}>Level</th>
                    <th style={styles.th}>Points</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboardData.map((user, index) => (
                    <tr
                      key={index}
                      style={{
                        ...styles.tr,
                        backgroundColor: user.isCurrentUser 
                          ? (themeMode === "dark" ? "#2c3e66" : "#e6f7ff") 
                          : "transparent"
                      }}
                    >
                      <td style={styles.td}>
                        <div style={styles.rankBadge}>{index + 1}</div>
                      </td>
                      <td style={styles.userCell}>
                        <img
                          src={user.avatar || "/api/placeholder/40/40"}
                          alt={user.name}
                          style={styles.userTableAvatar}
                        />
                        <span>{user.name}</span>
                      </td>
                      <td style={styles.td}>{user.level}</td>
                      <td style={styles.td}>
                        <strong>{user.points}</strong>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>Loading leaderboard data...</p>
          )}
        </section>

        {/* Test Results Section with Progress Bars */}
        <section style={styles.testResultsSection}>
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>Recent Test Results</h2>
            <button style={styles.viewAllButton}>View All</button>
          </div>
          
          {testData.length > 0 ? (
            <div style={styles.testResultsGrid}>
              {testData.map((test, index) => (
                <div key={index} style={styles.testCard}>
                  <div style={styles.testHeader}>
                    <h3 style={styles.testName}>{test.testName}</h3>
                    <span style={{
                      ...styles.skillLevel,
                      backgroundColor: test.skillLevel === "Advanced" 
                        ? "#4caf50" 
                        : test.skillLevel === "Intermediate" 
                        ? "#2196f3" 
                        : "#ff9800"
                    }}>
                      {test.skillLevel}
                    </span>
                  </div>
                  
                  <div style={styles.scoreContainer}>
                    <div style={styles.scoreValue}>{test.score}%</div>
                    <div style={styles.progressBarContainer}>
                      <div 
                        style={{
                          ...styles.progressBar,
                          width: calculateProgress(test.score),
                          backgroundColor: test.score > 90 
                            ? "#4caf50" 
                            : test.score > 80 
                            ? "#8bc34a" 
                            : test.score > 70 
                            ? "#ffc107" 
                            : "#ff5722"
                        }}
                      ></div>
                    </div>
                  </div>
                  
                  <div style={styles.testFooter}>
                    <span style={styles.testDate}>
                      Completed: {new Date(test.completedDate).toLocaleDateString()}
                    </span>
                    <button style={styles.detailsButton}>Details</button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No test results available.</p>
          )}
        </section>
      </main>
      
      <footer style={styles.footer}>
        <p>© 2025 DevDashboard • <a href="#" style={styles.footerLink}>Privacy Policy</a> • <a href="#" style={styles.footerLink}>Terms of Service</a></p>
      </footer>
    </div>
  );
}

// All styles defined as JavaScript objects
const styles = {
  // Main container styles
  dashboardContainer: {
    fontFamily: "'Inter', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    transition: "background-color 0.3s, color 0.3s",
  },
  
  // Loading animation
  loadingContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#f5f7fa",
  },
  spinner: {
    width: "40px",
    height: "40px",
    border: "4px solid rgba(0, 0, 0, 0.1)",
    borderLeftColor: "#3f51b5",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
  
  // Header styles
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "1rem 2rem",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    position: "sticky",
    top: 0,
    zIndex: 100,
    backgroundColor: "inherit",
  },
  logoArea: {
    display: "flex",
    alignItems: "center",
  },
  logo: {
    margin: 0,
    fontSize: "1.5rem",
    fontWeight: 700,
    backgroundImage: "linear-gradient(45deg, #3f51b5, #2196f3)",
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    color: "transparent",
  },
  nav: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
  },
  navList: {
    display: "flex",
    listStyle: "none",
    margin: 0,
    padding: 0,
  },
  navItem: {
    padding: "0.5rem 1rem",
    margin: "0 0.5rem",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "background-color 0.2s",
  },
  themeToggle: {
    cursor: "pointer",
    fontSize: "1.2rem",
    padding: "0.5rem",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "background-color 0.2s",
  },
  
  // Dashboard layout
  dashboardLayout: {
    display: "grid",
    gridTemplateColumns: "1fr 2fr",
    gridTemplateRows: "auto 1fr",
    gap: "1.5rem",
    padding: "1.5rem",
    flex: 1,
  },
  
  // User section styles
  userSection: {
    gridColumn: "1 / 2",
    gridRow: "1 / 2",
  },
  userInfoCard: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "1.5rem",
    borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    backdropFilter: "blur(10px)",
  },
  userAvatar: {
    position: "relative",
    marginBottom: "1rem",
  },
  avatarImg: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    objectFit: "cover",
    border: "4px solid #fff",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
  },
  levelBadge: {
    position: "absolute",
    bottom: "0",
    right: "0",
    backgroundColor: "#3f51b5",
    color: "white",
    fontSize: "0.75rem",
    padding: "0.25rem 0.5rem",
    borderRadius: "12px",
    fontWeight: "bold",
  },
  userDetails: {
    textAlign: "center",
    width: "100%",
  },
  userName: {
    margin: "0 0 0.25rem 0",
    fontSize: "1.5rem",
    fontWeight: 600,
  },
  userTitle: {
    margin: "0 0 0.25rem 0",
    color: "#666",
    fontSize: "1rem",
  },
  userEmail: {
    margin: "0 0 1rem 0",
    color: "#999",
    fontSize: "0.875rem",
  },
  userStats: {
    display: "flex",
    justifyContent: "space-around",
    marginBottom: "1rem",
    width: "100%",
    borderTop: "1px solid #eee",
    borderBottom: "1px solid #eee",
    padding: "1rem 0",
  },
  statItem: {
    textAlign: "center",
  },
  statValue: {
    fontSize: "1.25rem",
    fontWeight: "bold",
    color: "#3f51b5",
  },
  statLabel: {
    fontSize: "0.75rem",
    color: "#666",
    textTransform: "uppercase",
  },
  badgeContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "0.5rem",
    justifyContent: "center",
  },
  badge: {
    backgroundColor: "#e0e0e0",
    color: "#333",
    padding: "0.25rem 0.5rem",
    borderRadius: "12px",
    fontSize: "0.75rem",
    fontWeight: 500,
  },
  
  // Leaderboard section styles
  leaderboardSection: {
    gridColumn: "1 / 2",
    gridRow: "2 / 3",
    padding: "1.5rem",
    borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    backdropFilter: "blur(10px)",
    display: "flex",
    flexDirection: "column",
  },
  sectionHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "1rem",
  },
  sectionTitle: {
    margin: 0,
    fontSize: "1.25rem",
    fontWeight: 600,
  },
  refreshIndicator: {
    fontSize: "0.75rem",
    color: "#666",
  },
  tableContainer: {
    overflowX: "auto",
    flex: 1,
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: "0.875rem",
  },
  th: {
    padding: "0.75rem",
    textAlign: "left",
    borderBottom: "2px solid #eee",
    fontWeight: 600,
  },
  tr: {
    transition: "background-color 0.2s",
  },
  td: {
    padding: "0.75rem",
    borderBottom: "1px solid #eee",
  },
  userCell: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    padding: "0.75rem",
    borderBottom: "1px solid #eee",
  },
  userTableAvatar: {
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    objectFit: "cover",
  },
  rankBadge: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "24px",
    height: "24px",
    borderRadius: "50%",
    backgroundColor: "#eee",
    fontWeight: "bold",
  },
  
  // Test results section styles
  testResultsSection: {
    gridColumn: "2 / 3",
    gridRow: "1 / 3",
    padding: "1.5rem",
    borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    backdropFilter: "blur(10px)",
  },
  viewAllButton: {
    backgroundColor: "transparent",
    border: "none",
    color: "#3f51b5",
    cursor: "pointer",
    fontWeight: 500,
    fontSize: "0.875rem",
  },
  testResultsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "1rem",
  },
  testCard: {
    padding: "1rem",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
    backgroundColor: "white",
    display: "flex",
    flexDirection: "column",
  },
  testHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "0.75rem",
  },
  testName: {
    margin: 0,
    fontSize: "1rem",
    fontWeight: 600,
  },
  skillLevel: {
    padding: "0.25rem 0.5rem",
    borderRadius: "4px",
    fontSize: "0.75rem",
    color: "white",
    fontWeight: 500,
  },
  scoreContainer: {
    marginBottom: "0.75rem",
  },
  scoreValue: {
    fontSize: "1.5rem",
    fontWeight: 700,
    marginBottom: "0.25rem",
  },
  progressBarContainer: {
    height: "8px",
    backgroundColor: "#eee",
    borderRadius: "4px",
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    transition: "width 0.5s ease-out",
  },
  testFooter: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "auto",
    paddingTop: "0.75rem",
    borderTop: "1px solid #eee",
  },
  testDate: {
    fontSize: "0.75rem",
    color: "#666",
  },
  detailsButton: {
    backgroundColor: "transparent",
    border: "1px solid #3f51b5",
    color: "#3f51b5",
    padding: "0.25rem 0.5rem",
    borderRadius: "4px",
    fontSize: "0.75rem",
    cursor: "pointer",
    transition: "background-color 0.2s, color 0.2s",
  },
  
  // Footer styles
  footer: {
    padding: "1.5rem",
    textAlign: "center",
    fontSize: "0.875rem",
    color: "#666",
    borderTop: "1px solid #eee",
  },
  footerLink: {
    color: "inherit",
    textDecoration: "none",
  },
  
  // Add animation keyframes - to be added at the beginning of the file in a real scenario
  // Since we can't define CSS @keyframes directly in JS objects
  // In a real component, you'd include a styled-components or CSS file with:
  // @keyframes spin {
  //   0% { transform: rotate(0deg); }
  //   100% { transform: rotate(360deg); }
  // }
};