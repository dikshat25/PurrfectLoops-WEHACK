import React, { useState, useEffect } from 'react';
import SharedNavbar from "../pages/navbar";
import SharedFooter from "../pages/footer";
const Profile = () => {
  // Styles moved inline using JavaScript objects
  const styles = {
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '2rem',
      fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
      color: '#333',
      backgroundColor: '#f9fafb',
      borderRadius: '12px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      gap: '2rem',
      marginBottom: '2rem',
      padding: '1.5rem',
      backgroundColor: 'white',
      borderRadius: '10px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.03)'
    },
    photoContainer: {
      position: 'relative',
    },
    photo: {
      width: '120px',
      height: '120px',
      borderRadius: '50%',
      objectFit: 'cover',
      border: '4px solid #fff',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
    },
    photoPlaceholder: {
      width: '120px',
      height: '120px',
      borderRadius: '50%',
      backgroundColor: '#3b82f6',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '2rem',
      fontWeight: 'bold',
      border: '4px solid #fff',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
    },
    photoUpload: {
      position: 'absolute',
      bottom: '0',
      right: '0',
      backgroundColor: '#3b82f6',
      color: 'white',
      borderRadius: '50%',
      width: '36px',
      height: '36px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
      border: '2px solid white'
    },
    intro: {
      flex: '1'
    },
    name: {
      fontSize: '2rem',
      fontWeight: '700',
      margin: '0 0 0.25rem 0',
      color: '#111827'
    },
    role: {
      fontSize: '1.1rem',
      color: '#6b7280',
      margin: '0 0 1rem 0'
    },
    actions: {
      display: 'flex',
      gap: '1rem'
    },
    button: {
      padding: '0.75rem 1.25rem',
      borderRadius: '6px',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'all 0.2s',
      border: 'none',
      fontSize: '0.9rem'
    },
    editBtn: {
      backgroundColor: '#3b82f6',
      color: 'white',
      border: 'none',
      padding: '0.75rem 1.25rem',
      borderRadius: '6px',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'all 0.2s',
      fontSize: '0.9rem',
      boxShadow: '0 2px 4px rgba(59, 130, 246, 0.3)'
    },
    saveBtn: {
      backgroundColor: '#10b981',
      color: 'white',
      border: 'none',
      padding: '0.75rem 1.25rem',
      borderRadius: '6px',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'all 0.2s',
      fontSize: '0.9rem',
      boxShadow: '0 2px 4px rgba(16, 185, 129, 0.3)'
    },
    resumeBtn: {
      backgroundColor: 'white',
      color: '#4b5563',
      border: '1px solid #e5e7eb',
      padding: '0.75rem 1.25rem',
      borderRadius: '6px',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'all 0.2s',
      fontSize: '0.9rem'
    },
    nav: {
      display: 'flex',
      gap: '0.5rem',
      marginBottom: '2rem',
      borderBottom: '1px solid #e5e7eb',
      flexWrap: 'wrap'
    },
    navButton: {
      padding: '0.75rem 1.25rem',
      borderRadius: '6px 6px 0 0',
      fontWeight: '500',
      border: 'none',
      backgroundColor: 'transparent',
      color: '#6b7280',
      cursor: 'pointer',
      transition: 'all 0.2s',
      fontSize: '0.95rem',
      marginBottom: '-1px'
    },
    activeNavButton: {
      color: '#3b82f6',
      borderBottom: '2px solid #3b82f6',
      fontWeight: '600'
    },
    content: {
      backgroundColor: 'white',
      borderRadius: '10px',
      padding: '2rem',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.03)'
    },
    section: {
      marginBottom: '2rem'
    },
    sectionTitle: {
      fontSize: '1.25rem',
      fontWeight: '600',
      marginBottom: '1rem',
      color: '#111827',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    infoGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
      gap: '1.5rem'
    },
    infoItem: {
      marginBottom: '1rem'
    },
    label: {
      display: 'block',
      fontWeight: '500',
      marginBottom: '0.5rem',
      color: '#6b7280',
      fontSize: '0.9rem'
    },
    value: {
      margin: '0',
      color: '#111827',
      fontWeight: '500'
    },
    input: {
      width: '100%',
      padding: '0.75rem',
      borderRadius: '6px',
      border: '1px solid #e5e7eb',
      fontSize: '0.95rem',
      transition: 'border-color 0.2s',
      outline: 'none'
    },
    select: {
      width: '100%',
      padding: '0.75rem',
      borderRadius: '6px',
      border: '1px solid #e5e7eb',
      fontSize: '0.95rem',
      transition: 'border-color 0.2s',
      outline: 'none',
      backgroundColor: 'white'
    },
    addSkill: {
      display: 'flex',
      gap: '0.5rem',
      marginBottom: '1rem',
      alignItems: 'center'
    },
    addSkillBtn: {
      padding: '0.75rem 1rem',
      backgroundColor: '#3b82f6',
      color: 'white',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      fontWeight: '500',
      transition: 'all 0.2s'
    },
    skillsContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '0.75rem'
    },
    skillBadge: {
      padding: '0.5rem 0.75rem',
      borderRadius: '100px',
      fontSize: '0.9rem',
      fontWeight: '500',
      backgroundColor: '#f3f4f6',
      color: '#374151',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      position: 'relative'
    },
    skillLevel: {
      fontSize: '0.8rem',
      padding: '0.25rem 0.5rem',
      borderRadius: '100px',
      backgroundColor: '#e5e7eb',
      color: '#4b5563'
    },
    beginner: {
      backgroundColor: '#dbeafe',
      color: '#1e40af'
    },
    intermediate: {
      backgroundColor: '#e0f2fe',
      color: '#0369a1'
    },
    advanced: {
      backgroundColor: '#dbeafe',
      color: '#1e40af'
    },
    expert: {
      backgroundColor: '#fef3c7',
      color: '#92400e'
    },
    removeSkill: {
      marginLeft: '0.25rem',
      backgroundColor: 'transparent',
      border: 'none',
      color: '#9ca3af',
      cursor: 'pointer',
      fontSize: '1rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '0',
      width: '20px',
      height: '20px',
      borderRadius: '50%'
    },
    educationItem: {
      padding: '1rem',
      borderLeft: '3px solid #3b82f6',
      backgroundColor: '#f9fafb',
      borderRadius: '0 6px 6px 0',
      marginBottom: '1rem'
    },
    eduTitle: {
      fontSize: '1.1rem',
      fontWeight: '600',
      margin: '0 0 0.5rem 0',
      color: '#111827'
    },
    eduDegree: {
      margin: '0 0 0.25rem 0',
      color: '#4b5563'
    },
    eduYear: {
      margin: '0',
      color: '#6b7280',
      fontSize: '0.9rem'
    },
    assessmentsList: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
      gap: '1.5rem'
    },
    assessmentCard: {
      backgroundColor: '#f9fafb',
      borderRadius: '8px',
      padding: '1.5rem',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.03)',
      transition: 'transform 0.2s',
      border: '1px solid #e5e7eb'
    },
    assessmentTitle: {
      fontSize: '1.1rem',
      fontWeight: '600',
      margin: '0 0 1rem 0',
      color: '#111827'
    },
    assessmentStats: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '1rem'
    },
    stat: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    },
    statValue: {
      fontSize: '1.4rem',
      fontWeight: '700',
      color: '#111827'
    },
    statLabel: {
      fontSize: '0.8rem',
      color: '#6b7280',
      marginTop: '0.25rem'
    },
    progressBar: {
      height: '8px',
      backgroundColor: '#e5e7eb',
      borderRadius: '4px',
      overflow: 'hidden'
    },
    progress: {
      height: '100%',
      backgroundColor: '#3b82f6',
      borderRadius: '4px'
    },
    suggestedAssessments: {
      marginTop: '2rem'
    },
    assessmentButtons: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '0.75rem',
      marginTop: '1rem'
    },
    assessmentBtn: {
      padding: '0.75rem 1.25rem',
      backgroundColor: 'white',
      color: '#4b5563',
      border: '1px solid #e5e7eb',
      borderRadius: '6px',
      cursor: 'pointer',
      fontWeight: '500',
      transition: 'all 0.2s',
      fontSize: '0.9rem'
    },
    interviewsList: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
      gap: '1.5rem'
    },
    interviewCard: {
      backgroundColor: '#f9fafb',
      borderRadius: '8px',
      padding: '1.5rem',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.03)',
      transition: 'transform 0.2s',
      border: '1px solid #e5e7eb'
    },
    interviewHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '1rem'
    },
    interviewTitle: {
      fontSize: '1.1rem',
      fontWeight: '600',
      margin: '0',
      color: '#111827'
    },
    interviewDate: {
      fontSize: '0.9rem',
      color: '#6b7280'
    },
    interviewScore: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      marginBottom: '1rem'
    },
    scoreCircle: {
      width: '60px',
      height: '60px',
      borderRadius: '50%',
      backgroundColor: '#dbeafe',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '1.4rem',
      fontWeight: '700',
      color: '#1e40af'
    },
    interviewFeedback: {
      marginBottom: '1rem'
    },
    feedbackTitle: {
      fontSize: '0.9rem',
      fontWeight: '600',
      margin: '0 0 0.5rem 0',
      color: '#4b5563'
    },
    viewRecordingBtn: {
      backgroundColor: 'white',
      color: '#4b5563',
      border: '1px solid #e5e7eb',
      padding: '0.75rem 1.25rem',
      borderRadius: '6px',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'all 0.2s',
      fontSize: '0.9rem',
      width: '100%',
      textAlign: 'center'
    },
    scheduleInterview: {
      marginTop: '2rem',
      backgroundColor: '#f0f9ff',
      borderRadius: '8px',
      padding: '1.5rem',
      textAlign: 'center',
      border: '1px solid #bae6fd'
    },
    scheduleTitle: {
      fontSize: '1.1rem',
      fontWeight: '600',
      margin: '0 0 0.5rem 0',
      color: '#0369a1'
    },
    scheduleText: {
      margin: '0 0 1rem 0',
      color: '#0c4a6e'
    },
    scheduleBtn: {
      backgroundColor: '#0284c7',
      color: 'white',
      border: 'none',
      padding: '0.75rem 1.5rem',
      borderRadius: '6px',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'all 0.2s',
      fontSize: '0.9rem'
    },
    jobsIntro: {
      marginBottom: '1.5rem',
      color: '#4b5563'
    },
    jobListings: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
      gap: '1.5rem'
    },
    jobCard: {
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: 'white',
      borderRadius: '8px',
      padding: '1.5rem',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.03)',
      transition: 'transform 0.2s',
      border: '1px solid #e5e7eb',
      height: '100%'
    },
    jobHeader: {
      display: 'flex',
      gap: '1rem',
      marginBottom: '1rem',
      alignItems: 'flex-start'
    },
    logoPlaceholder: {
      width: '50px',
      height: '50px',
      borderRadius: '8px',
      backgroundColor: '#dbeafe',
      color: '#1e40af',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '1.2rem',
      fontWeight: '700',
      flexShrink: 0
    },
    jobDetails: {
      flex: '1'
    },
    jobTitle: {
      fontSize: '1.1rem',
      fontWeight: '600',
      margin: '0 0 0.25rem 0',
      color: '#111827'
    },
    jobCompany: {
      fontSize: '0.95rem',
      margin: '0 0 0.75rem 0',
      color: '#4b5563',
      fontWeight: '500'
    },
    jobMatch: {
      marginBottom: '1rem'
    },
    matchPercentage: {
      display: 'inline-block',
      padding: '0.25rem 0.5rem',
      backgroundColor: '#ecfdf5',
      color: '#047857',
      borderRadius: '100px',
      fontSize: '0.8rem',
      fontWeight: '600',
      marginBottom: '0.5rem'
    },
    matchSkills: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '0.5rem'
    },
    matchSkill: {
      fontSize: '0.8rem',
      padding: '0.2rem 0.5rem',
      backgroundColor: '#f3f4f6',
      color: '#4b5563',
      borderRadius: '4px'
    },
    applyBtn: {
      backgroundColor: '#3b82f6',
      color: 'white',
      border: 'none',
      padding: '0.75rem 1.25rem',
      borderRadius: '6px',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'all 0.2s',
      fontSize: '0.9rem',
      marginTop: 'auto'
    },
    hidden: {
      display: 'none'
    },
    fileInputLabel: {
      cursor: 'pointer',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  };

  // In a real application, this would be fetched from your API
  const [userData, setUserData] = useState({
    id: '12345',
    firstName: 'Alex',
    lastName: 'Johnson',
    email: 'alex.johnson@example.com',
    phoneNumber: '(555) 123-4567',
    currentRole: 'Frontend Developer',
    experience: '3-5',
    skills: [
      { name: 'JavaScript', level: 'Expert' },
      { name: 'React', level: 'Advanced' },
      { name: 'CSS', level: 'Advanced' },
      { name: 'Node.js', level: 'Intermediate' },
      { name: 'UI/UX Design', level: 'Intermediate' }
    ],
    education: [
      {
        institution: 'University of Technology',
        degree: 'Bachelor of Science in Computer Science',
        year: '2018'
      }
    ],
    resume: 'alex_johnson_resume.pdf',
    assessments: [
      { name: 'Frontend Development Challenge', score: 92, rank: 15, participants: 230 },
      { name: 'Problem Solving Assessment', score: 85, rank: 42, participants: 350 },
      { name: 'JavaScript Proficiency', score: 95, rank: 8, participants: 180 }
    ],
    interviews: [
      { company: 'Mock Interview', date: '2025-03-15', score: 88, feedback: 'Strong technical skills, could improve communication' }
    ],
    profileImage: null
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editableData, setEditableData] = useState({});
  const [activeTab, setActiveTab] = useState('overview');
  const [newSkill, setNewSkill] = useState('');
  const [skillLevel, setSkillLevel] = useState('Beginner');

  useEffect(() => {
    setEditableData(userData);
  }, [userData]);

  const handleEditToggle = () => {
    if (isEditing) {
      // Save changes
      setUserData(editableData);
    }
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    
    if (type === 'file') {
      setEditableData({
        ...editableData,
        [name]: files[0]
      });
    } else {
      setEditableData({
        ...editableData,
        [name]: value
      });
    }
  };

  const addSkill = () => {
    if (newSkill.trim() !== '') {
      setEditableData({
        ...editableData,
        skills: [...editableData.skills, { name: newSkill, level: skillLevel }]
      });
      setNewSkill('');
      setSkillLevel('Beginner');
    }
  };

  const removeSkill = (index) => {
    const updatedSkills = [...editableData.skills];
    updatedSkills.splice(index, 1);
    setEditableData({
      ...editableData,
      skills: updatedSkills
    });
  };

  // Helper function to get skill badge style based on level
  const getSkillBadgeStyle = (level) => {
    const baseStyle = { ...styles.skillBadge };
    
    switch(level.toLowerCase()) {
      case 'beginner':
        return { ...baseStyle, backgroundColor: '#dbeafe', color: '#1e40af' };
      case 'intermediate':
        return { ...baseStyle, backgroundColor: '#e0f2fe', color: '#0369a1' };
      case 'advanced':
        return { ...baseStyle, backgroundColor: '#dbeafe', color: '#1e40af' };
      case 'expert':
        return { ...baseStyle, backgroundColor: '#fef3c7', color: '#92400e' };
      default:
        return baseStyle;
    }
  };

  return (
    <>
    <SharedNavbar />
    
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.photoContainer}>
          {userData.profileImage ? (
            <img src={URL.createObjectURL(userData.profileImage)} alt="Profile" style={styles.photo} />
          ) : (
            <div style={styles.photoPlaceholder}>
              {userData.firstName.charAt(0)}{userData.lastName.charAt(0)}
            </div>
          )}
          {isEditing && (
            <>
              <input
                type="file"
                id="profileImage"
                name="profileImage"
                accept="image/*"
                onChange={handleChange}
                style={{ display: 'none' }}
              />
              <label htmlFor="profileImage" style={styles.photoUpload}>
                <span style={styles.fileInputLabel}>+</span>
              </label>
            </>
          )}
        </div>
        
        <div style={styles.intro}>
          <h1 style={styles.name}>{userData.firstName} {userData.lastName}</h1>
          <p style={styles.role}>{userData.currentRole}</p>
          <div style={styles.actions}>
            <button 
              onClick={handleEditToggle} 
              style={isEditing ? styles.saveBtn : styles.editBtn}
            >
              {isEditing ? "Save Profile" : "Edit Profile"}
            </button>
            <button style={styles.resumeBtn}>Download Resume</button>
          </div>
        </div>
      </div>
      
      <div style={styles.nav}>
        <button 
          style={{
            ...styles.navButton,
            ...(activeTab === 'overview' ? styles.activeNavButton : {})
          }}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button 
          style={{
            ...styles.navButton,
            ...(activeTab === 'assessments' ? styles.activeNavButton : {})
          }}
          onClick={() => setActiveTab('assessments')}
        >
          Skill Assessments
        </button>
        <button 
          style={{
            ...styles.navButton,
            ...(activeTab === 'interviews' ? styles.activeNavButton : {})
          }} 
          onClick={() => setActiveTab('interviews')}
        >
          Mock Interviews
        </button>
        <button 
          style={{
            ...styles.navButton,
            ...(activeTab === 'jobs' ? styles.activeNavButton : {})
          }}
          onClick={() => setActiveTab('jobs')}
        >
          Job Recommendations
        </button>
      </div>
      
      <div style={styles.content}>
        {activeTab === 'overview' && (
          <div>
            <div style={styles.section}>
              <h2 style={styles.sectionTitle}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                Personal Information
              </h2>
              <div style={styles.infoGrid}>
                <div style={styles.infoItem}>
                  <label style={styles.label}>Email:</label>
                  {isEditing ? (
                    <input
                      type="email"
                      name="email"
                      value={editableData.email}
                      onChange={handleChange}
                      style={styles.input}
                    />
                  ) : (
                    <p style={styles.value}>{userData.email}</p>
                  )}
                </div>
                
                <div style={styles.infoItem}>
                  <label style={styles.label}>Phone:</label>
                  {isEditing ? (
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={editableData.phoneNumber}
                      onChange={handleChange}
                      style={styles.input}
                    />
                  ) : (
                    <p style={styles.value}>{userData.phoneNumber}</p>
                  )}
                </div>
                
                <div style={styles.infoItem}>
                  <label style={styles.label}>Current Role:</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="currentRole"
                      value={editableData.currentRole}
                      onChange={handleChange}
                      style={styles.input}
                    />
                  ) : (
                    <p style={styles.value}>{userData.currentRole}</p>
                  )}
                </div>
                
                <div style={styles.infoItem}>
                  <label style={styles.label}>Experience:</label>
                  {isEditing ? (
                    <select
                      name="experience"
                      value={editableData.experience}
                      onChange={handleChange}
                      style={styles.select}
                    >
                      <option value="0-1">Less than 1 year</option>
                      <option value="1-3">1-3 years</option>
                      <option value="3-5">3-5 years</option>
                      <option value="5-10">5-10 years</option>
                      <option value="10+">10+ years</option>
                    </select>
                  ) : (
                    <p style={styles.value}>{userData.experience} years</p>
                  )}
                </div>
              </div>
            </div>
          
         
            <div style={styles.section}>
              <h2 style={styles.sectionTitle}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                  <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
                </svg>
                Education
              </h2>
              {userData.education.map((edu, index) => (
                <div key={index} style={styles.educationItem}>
                  <h3 style={styles.eduTitle}>{edu.institution}</h3>
                  <p style={styles.eduDegree}>{edu.degree}</p>
                  <p style={styles.eduYear}>Graduated: {edu.year}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {activeTab === 'assessments' && (
          <div>
            <h2 style={styles.sectionTitle}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
              Skill Assessments
            </h2>
            <div style={styles.assessmentsList}>
              {userData.assessments.map((assessment, index) => (
                <div key={index} style={styles.assessmentCard}>
                  <h3 style={styles.assessmentTitle}>{assessment.name}</h3>
                  <div style={styles.assessmentStats}>
                    <div style={styles.stat}>
                      <span style={styles.statValue}>{assessment.score}%</span>
                      <span style={styles.statLabel}>Score</span>
                    </div>
                    <div style={styles.stat}>
                      <span style={styles.statValue}>#{assessment.rank}</span>
                      <span style={styles.statLabel}>Rank</span>
                    </div>
                    <div style={styles.stat}>
                      <span style={styles.statValue}>{assessment.participants}</span>
                      <span style={styles.statLabel}>Participants</span>
                    </div>
                  </div>
                  <div style={styles.progressBar}>
                    <div 
                      style={{
                        ...styles.progress,
                        width: `${assessment.score}%` 
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
            
            <div style={styles.suggestedAssessments}>
              <h3 style={styles.sectionTitle}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="16"></line>
                  <line x1="8" y1="12" x2="16" y2="12"></line>
                </svg>
                Suggested Assessments
              </h3>
              <div style={styles.assessmentButtons}>
                <button style={styles.assessmentBtn}>Problem Solving (Advanced)</button>
                <button style={styles.assessmentBtn}>System Design Challenge</button>
                <button style={styles.assessmentBtn}>Leadership Assessment</button>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'interviews' && (
          <div>
            <h2 style={styles.sectionTitle}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15.6 11.6L22 7v10l-6.4-4.5v-1zM4 5h9a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7c0-1.1.9-2 2-2z"></path>
              </svg>
              Mock Interviews
            </h2>
            <div style={styles.interviewsList}>
              {userData.interviews.map((interview, index) => (
                <div key={index} style={styles.interviewCard}>
                  <div style={styles.interviewHeader}>
                    <h3 style={styles.interviewTitle}>{interview.company}</h3>
                    <span style={styles.interviewDate}>{interview.date}</span>
                  </div>
                  <div style={styles.interviewScore}>
                    <div style={styles.scoreCircle}>
                      <span>{interview.score}</span>
                    </div>
                    <p>Overall Score</p>
                  </div>
                  <div style={styles.interviewFeedback}>
                    <h4 style={styles.feedbackTitle}>Feedback:</h4>
                    <p>{interview.feedback}</p>
                  </div>
                  <button style={styles.viewRecordingBtn}>View Recording</button>
                </div>
              ))}
            </div>
            
            <div style={styles.scheduleInterview}>
              <h3 style={styles.scheduleTitle}>Practice Makes Perfect</h3>
              <p style={styles.scheduleText}>Schedule another mock interview to improve your skills</p>
              <button style={styles.scheduleBtn}>Schedule New Interview</button>
            </div>
          </div>
        )}
        
        {activeTab === 'jobs' && (
          <div>
            <h2 style={styles.sectionTitle}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
              </svg>
              Job Recommendations
            </h2>
            <p style={styles.jobsIntro}>Based on your skills and assessments, we recommend these positions:</p>
            
            <div style={styles.jobListings}>
              <div style={styles.jobCard}>
                <div style={styles.jobHeader}>
                  <div style={styles.logoPlaceholder}>TC</div>
                  <div style={styles.jobDetails}>
                    <h3 style={styles.jobTitle}>Senior Frontend Developer</h3>
                    <h4 style={styles.jobCompany}>TechCorp Inc.</h4>
                  </div>
                </div>
                <div style={styles.jobMatch}>
                  <span style={styles.matchPercentage}>92% Match</span>
                  <div style={styles.matchSkills}>
                    <span style={styles.matchSkill}>JavaScript</span>
                    <span style={styles.matchSkill}>React</span>
                    <span style={styles.matchSkill}>UI/UX</span>
                  </div>
                </div>
                <button style={styles.applyBtn}>Apply Now</button>
              </div>
              
              <div style={styles.jobCard}>
                <div style={styles.jobHeader}>
                  <div style={styles.logoPlaceholder}>ID</div>
                  <div style={styles.jobDetails}>
                    <h3 style={styles.jobTitle}>Full Stack Developer</h3>
                    <h4 style={styles.jobCompany}>InnovateDesign LLC</h4>
                  </div>
                </div>
                <div style={styles.jobMatch}>
                  <span style={styles.matchPercentage}>85% Match</span>
                  <div style={styles.matchSkills}>
                    <span style={styles.matchSkill}>JavaScript</span>
                    <span style={styles.matchSkill}>React</span>
                    <span style={styles.matchSkill}>Node.js</span>
                  </div>
                </div>
                <button style={styles.applyBtn}>Apply Now</button>
              </div>
              
              <div style={styles.jobCard}>
                <div style={styles.jobHeader}>
                  <div style={styles.logoPlaceholder}>WS</div>
                  <div style={styles.jobDetails}>
                    <h3 style={styles.jobTitle}>UI Developer</h3>
                    <h4 style={styles.jobCompany}>WebSolutions Co.</h4>
                  </div>
                </div>
                <div style={styles.jobMatch}>
                  <span style={styles.matchPercentage}>78% Match</span>
                  <div style={styles.matchSkills}>
                    <span style={styles.matchSkill}>JavaScript</span>
                    <span style={styles.matchSkill}>CSS</span>
                    <span style={styles.matchSkill}>UI/UX</span>
                  </div>
                </div>
                <button style={styles.applyBtn}>Apply Now</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
    
      

    <SharedFooter />
  </>
    
  );
};

export default Profile;