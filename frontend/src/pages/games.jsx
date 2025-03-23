import React from 'react';

const Dashboard = () => {
  // Internal styles
  const styles = {
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '2rem',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f7f9fc',
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
    },
    header: {
      textAlign: 'center',
      marginBottom: '2rem'
    },
    title: {
      fontSize: '2.5rem',
      color: '#333',
      marginBottom: '0.5rem'
    },
    subtitle: {
      fontSize: '1.2rem',
      color: '#666',
      fontWeight: 'normal'
    },
    cardsContainer: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
      gap: '1.5rem',
      marginTop: '2rem'
    },
    card: {
      backgroundColor: '#fff',
      borderRadius: '8px',
      padding: '1.5rem',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      cursor: 'pointer'
    },
    cardHover: {
      transform: 'translateY(-5px)',
      boxShadow: '0 8px 16px rgba(0, 0, 0, 0.15)'
    },
    cardIcon: {
      fontSize: '2rem',
      marginBottom: '1rem',
      color: '#4a6cf7'
    },
    cardTitle: {
      fontSize: '1.25rem',
      color: '#333',
      marginBottom: '0.5rem'
    },
    cardDescription: {
      color: '#666',
      marginBottom: '1rem'
    },
    cardLink: {
      display: 'block',
      padding: '0.75rem',
      backgroundColor: '#4a6cf7',
      color: 'white',
      textAlign: 'center',
      borderRadius: '6px',
      textDecoration: 'none',
      fontWeight: 'bold',
      transition: 'background-color 0.3s ease'
    },
    cardLinkHover: {
      backgroundColor: '#3a56d2'
    },
    analyticsBar: {
      backgroundColor: '#fff',
      borderRadius: '8px',
      padding: '1.5rem',
      marginTop: '2rem',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
      display: 'flex',
      justifyContent: 'space-around',
      flexWrap: 'wrap',
      gap: '1rem'
    },
    statItem: {
      textAlign: 'center',
      flex: '1 1 120px'
    },
    statValue: {
      fontSize: '1.8rem',
      fontWeight: 'bold',
      color: '#4a6cf7'
    },
    statLabel: {
      color: '#666'
    }
  };

  // Mock data for cards
  const cardData = [
    {
      title: 'Achievements',
      icon: '🏆',
      description: 'View your earned badges and track your progress',
      link: '/achievements',
      color: '#FF9800'
    },
    {
      title: 'Collaborative Challenges',
      icon: '👥',
      description: 'Team up with others to solve complex problems',
      link: '/collaborative-challenges',
      color: '#4CAF50'
    },
    {
      title: 'Leaderboard',
      icon: '📊',
      description: 'See how you rank against other participants',
      link: '/leaderboard',
      color: '#2196F3'
    },
    {
      title: 'Career Path',
      icon: '🚀',
      description: 'Explore skills aligned with your career goals',
      link: '/leaderboard',
      color: '#9C27B0'
    },
    {
      title: 'Skills Duel',
      icon: '⚔️',
      description: 'Challenge others to skill-based competitions',
      link: '/skillduels',
      color: '#F44336'
    },
    {
      title: 'Typing Test',
      icon: '⌨️',
      description: 'Assess and improve your typing speed and accuracy',
      link: '/typingtest',
      color: '#00BCD4'
    }
  ];

  // Card component with hover state
  const Card = ({ title, icon, description, link, color }) => {
    const [isHovered, setIsHovered] = React.useState(false);
    
    return (
      <div 
        style={{
          ...styles.card,
          ...(isHovered ? styles.cardHover : {}),
          borderTop: `4px solid ${color}`
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div style={{ ...styles.cardIcon, color: color }}>{icon}</div>
        <h3 style={styles.cardTitle}>{title}</h3>
        <p style={styles.cardDescription}>{description}</p>
        <a 
          href={link} 
          style={{
            ...styles.cardLink,
            backgroundColor: isHovered ? color : '#4a6cf7'
          }}
        >
          Explore
        </a>
      </div>
    );
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>Skills Dashboard</h1>
        <h2 style={styles.subtitle}>Your hub for learning, assessment, and improvement</h2>
      </header>
      
      {/* Quick Stats */}
      <div style={styles.analyticsBar}>
        <div style={styles.statItem}>
          <div style={styles.statValue}>42</div>
          <div style={styles.statLabel}>Skills Assessed</div>
        </div>
        <div style={styles.statItem}>
          <div style={styles.statValue}>12</div>
          <div style={styles.statLabel}>Achievements</div>
        </div>
        <div style={styles.statItem}>
          <div style={styles.statValue}>83%</div>
          <div style={styles.statLabel}>Average Score</div>
        </div>
        <div style={styles.statItem}>
          <div style={styles.statValue}>7</div>
          <div style={styles.statLabel}>Active Challenges</div>
        </div>
      </div>
      
      {/* Cards Section */}
      <div style={styles.cardsContainer}>
        {cardData.map((card, index) => (
          <Card
            key={index}
            title={card.title}
            icon={card.icon}
            description={card.description}
            link={card.link}
            color={card.color}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;