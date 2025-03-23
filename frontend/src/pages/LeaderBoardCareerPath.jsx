import React, { useState, useEffect } from 'react';
import { Award, TrendingUp, Briefcase, Code, Palette, BrainCircuit } from 'lucide-react'; //Imported Icons

// Mock Data (Replace with actual data fetching)
const mockLeaderboardData = {
    coding: [
        { id: '1', name: 'CodeMaster', score: 1250 },
        { id: '2', name: 'SyntaxSavvy', score: 1100 },
        { id: '3', name: 'AlgoAce', score: 1050 },
        { id: '4', name: 'DebugPro', score: 980 },
        { id: '5', name: 'CodeWarrior', score: 920 },
    ],
    design: [
        { id: '1', name: 'DesignGenius', score: 1200 },
        { id: '2', name: 'PixelPerfect', score: 1150 },
        { id: '3', name: 'UXMaestro', score: 1080 },
        { id: '4', name: 'ArtfulCoder', score: 1020 },
        { id: '5', name: 'CreativeMind', score: 950 },
    ],
    problemSolving: [
        { id: '1', name: 'ProblemCrusher', score: 1300 },
        { id: '2', name: 'LogicLeap', score: 1200 },
        { id: '3', name: 'SolutionSage', score: 1120 },
        { id: '4', name: 'CriticalThinker', score: 1050 },
        { id: '5', name: 'BrainyBadger', score: 990 },
    ],
};

const mockMilestoneData = [
    { id: 'milestone-1', title: 'Junior Developer', progress: 30, total: 100 },
    { id: 'milestone-2', title: 'Intermediate Developer', progress: 60, total: 100 },
    { id: 'milestone-3', title: 'Senior Developer', progress: 85, total: 100 },
    { id: 'milestone-4', title: 'Tech Lead', progress: 20, total: 100 }, // Example of a milestone in progress
];

const mockCareerPath = [
    { id: 'step-1', title: 'Complete Junior Developer Milestone', completed: true },
    { id: 'step-2', title: 'Pass Coding Challenge Certification', completed: true },
    { id: 'step-3', title: 'Contribute to Open-Source Project', completed: false },
    { id: 'step-4', title: 'Lead a Small Team Project', completed: false },
    { id: 'step-5', title: 'Achieve Senior Developer Milestone', completed: false },
];

// Internal CSS
const styles = {
    container: {
        minHeight: '100vh',
        background: 'linear-gradient(to bottom, #0f172a, #111827)',
        color: '#f3f4f6',
        padding: '2rem',
        fontFamily: 'Inter, system-ui, sans-serif',
    },
    wrapper: {
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '2.5rem',
    },
    pageTitle: {
        fontSize: '2.5rem',
        fontWeight: '800',
        textAlign: 'center',
        background: 'linear-gradient(to right, #60a5fa, #a78bfa, #f472b6)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        marginBottom: '2rem',
        textShadow: '0 0 40px rgba(192, 132, 252, 0.2)',
    },
    sectionTitle: {
        fontSize: '1.5rem',
        fontWeight: '700',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        marginBottom: '1.5rem',
        position: 'relative',
        paddingBottom: '0.75rem',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    },
    leaderboardGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '1.5rem',
    },
    card: {
        background: 'rgba(255, 255, 255, 0.04)',
        backdropFilter: 'blur(12px)',
        borderRadius: '1rem',
        padding: '1.5rem',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        transition: 'transform 0.2s, box-shadow 0.2s',
        position: 'relative',
        overflow: 'hidden',
    },
    cardHover: {
        transform: 'translateY(-5px)',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    },
    skillTitle: {
        fontSize: '1.125rem',
        fontWeight: '600',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        marginBottom: '1rem',
        textTransform: 'capitalize',
    },
    leaderItem: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0.5rem 0',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
    },
    leaderName: {
        fontWeight: '500',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
    },
    leaderScore: {
        color: '#a1a1aa',
        fontFamily: 'monospace',
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        padding: '0.25rem 0.5rem',
        borderRadius: '0.25rem',
        fontSize: '0.875rem',
    },
    progressContainer: {
        width: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
        borderRadius: '9999px',
        height: '0.5rem',
        marginTop: '0.75rem',
        marginBottom: '0.5rem',
        overflow: 'hidden',
    },
    progressBar: {
        height: '100%',
        borderRadius: '9999px',
        transition: 'width 1s ease-in-out',
    },
    progressText: {
        fontSize: '0.875rem',
        color: '#a1a1aa',
        display: 'flex',
        justifyContent: 'space-between',
    },
    careerList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
    },
    careerItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        padding: '1rem',
        borderRadius: '0.5rem',
        transition: 'background-color 0.2s',
    },
    careerItemCompleted: {
        backgroundColor: 'rgba(74, 222, 128, 0.05)',
        border: '1px solid rgba(74, 222, 128, 0.2)',
    },
    careerItemPending: {
        backgroundColor: 'rgba(255, 255, 255, 0.03)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
    },
    badge: {
        display: 'inline-flex',
        alignItems: 'center',
        padding: '0.25rem 0.75rem',
        borderRadius: '9999px',
        fontSize: '0.75rem',
        fontWeight: '600',
        marginLeft: 'auto',
    },
    pulseAnimation: {
        position: 'absolute',
        top: '0',
        right: '0',
        width: '100%',
        height: '100%',
        borderRadius: 'inherit',
        opacity: '0',
        background: 'radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 70%)',
        animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        pointerEvents: 'none',
    },
    '@keyframes pulse': {
        '0%, 100%': {
            opacity: '0',
        },
        '50%': {
            opacity: '1',
        }
    },
    rankNumber: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '1.5rem',
        height: '1.5rem',
        borderRadius: '50%',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        marginRight: '0.5rem',
        fontSize: '0.75rem',
    },
    topRank: {
        backgroundColor: 'rgba(250, 204, 21, 0.2)',
        color: '#fbbf24',
    },
    loadingOverlay: {
        position: 'absolute',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: '50',
    },
    spinner: {
        border: '4px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '50%',
        borderTop: '4px solid #60a5fa',
        width: '40px',
        height: '40px',
        animation: 'spin 1s linear infinite',
    },
    '@keyframes spin': {
        '0%': { transform: 'rotate(0deg)' },
        '100%': { transform: 'rotate(360deg)' },
    },
};

// Helper function to get skill icon
const getSkillIcon = (skill) => {
    switch (skill) {
        case 'coding':
            return <Code className="w-5 h-5 text-blue-400" />;
        case 'design':
            return <Palette className="w-5 h-5 text-purple-400" />;
        case 'problemSolving':
            return <BrainCircuit className="w-5 h-5 text-green-400" />;
        default:
            return null;
    }
};

// Helper to get progress bar gradient based on completion percentage
const getProgressGradient = (progress) => {
    if (progress < 30) return 'linear-gradient(to right, #ef4444, #f97316)';
    if (progress < 70) return 'linear-gradient(to right, #f97316, #facc15)';
    return 'linear-gradient(to right, #22c55e, #10b981)';
};

const LeaderboardAndCareerPage = () => {
    const [leaderboardData, setLeaderboardData] = useState(mockLeaderboardData);
    const [milestoneData, setMilestoneData] = useState(mockMilestoneData);
    const [careerPath, setCareerPath] = useState(mockCareerPath);
    const [loading, setLoading] = useState(true);
    const [hoveredCard, setHoveredCard] = useState(null);

    useEffect(() => {
        // Simulate data loading
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div style={styles.container}>
            {loading && (
                <div style={styles.loadingOverlay}>
                    <div style={styles.spinner}></div>
                </div>
            )}
            
            <div style={styles.wrapper}>
                <h1 style={styles.pageTitle}>Performance & Career Dashboard</h1>

                {/* Leaderboards Section */}
                <section>
                    <h2 style={styles.sectionTitle}>
                        <TrendingUp className="w-6 h-6 text-blue-400" />
                        Skill Leaderboards
                    </h2>
                    <div style={styles.leaderboardGrid}>
                        {Object.entries(leaderboardData).map(([skill, leaders]) => (
                            <div
                                key={skill}
                                style={{
                                    ...styles.card,
                                    ...(hoveredCard === skill ? styles.cardHover : {})
                                }}
                                onMouseEnter={() => setHoveredCard(skill)}
                                onMouseLeave={() => setHoveredCard(null)}
                            >
                                <div style={styles.pulseAnimation}></div>
                                <h3 style={styles.skillTitle}>
                                    {getSkillIcon(skill)}
                                    {skill.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                                </h3>
                                <ol style={{ listStyleType: 'none', padding: 0 }}>
                                    {leaders.map((leader, index) => (
                                        <li key={leader.id} style={styles.leaderItem}>
                                            <span style={styles.leaderName}>
                                                <span 
                                                    style={{
                                                        ...styles.rankNumber,
                                                        ...(index === 0 ? styles.topRank : {})
                                                    }}
                                                >
                                                    {index + 1}
                                                </span>
                                                {leader.name}
                                            </span>
                                            <span style={styles.leaderScore}>{leader.score}</span>
                                        </li>
                                    ))}
                                </ol>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Milestone Progress Section */}
                <section>
                    <h2 style={styles.sectionTitle}>
                        <Award className="w-6 h-6 text-yellow-400" />
                        Career Milestones
                    </h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {milestoneData.map((milestone) => (
                            <div
                                key={milestone.id}
                                style={styles.card}
                                onMouseEnter={() => setHoveredCard(milestone.id)}
                                onMouseLeave={() => setHoveredCard(null)}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <h3 style={{ fontWeight: '600', fontSize: '1.125rem' }}>{milestone.title}</h3>
                                    <span style={{ 
                                        ...styles.badge, 
                                        backgroundColor: milestone.progress >= 85 ? 'rgba(34, 197, 94, 0.2)' : 
                                                        milestone.progress >= 50 ? 'rgba(250, 204, 21, 0.2)' : 
                                                        'rgba(239, 68, 68, 0.2)',
                                        color: milestone.progress >= 85 ? '#4ade80' : 
                                               milestone.progress >= 50 ? '#fbbf24' : 
                                               '#f87171'
                                    }}>
                                        {milestone.progress}%
                                    </span>
                                </div>
                                <div style={styles.progressContainer}>
                                    <div 
                                        style={{
                                            ...styles.progressBar,
                                            width: `${milestone.progress}%`,
                                            background: getProgressGradient(milestone.progress)
                                        }}
                                    ></div>
                                </div>
                                <div style={styles.progressText}>
                                    <span>Progress</span>
                                    <span>{milestone.progress} / {milestone.total} points</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Personalized Career Path Section */}
                <section>
                    <h2 style={styles.sectionTitle}>
                        <Briefcase className="w-6 h-6 text-green-400" />
                        Your Career Path
                    </h2>
                    <div style={styles.careerList}>
                        {careerPath.map((step, index) => (
                            <div
                                key={step.id}
                                style={{
                                    ...styles.careerItem,
                                    ...(step.completed ? styles.careerItemCompleted : styles.careerItemPending)
                                }}
                            >
                                {step.completed ? (
                                    <svg
                                        className="w-6 h-6"
                                        style={{ color: '#4ade80' }}
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                    </svg>
                                ) : (
                                    <div style={{ 
                                        display: 'flex', 
                                        alignItems: 'center', 
                                        justifyContent: 'center',
                                        width: '24px',
                                        height: '24px',
                                        borderRadius: '50%',
                                        border: '2px solid #6b7280',
                                        color: '#6b7280'
                                    }}>
                                        {index + 1}
                                    </div>
                                )}
                                <div style={{ flex: 1 }}>
                                    <span style={{ 
                                        fontWeight: '500',
                                        color: step.completed ? '#4ade80' : '#d1d5db'
                                    }}>
                                        {step.title}
                                    </span>
                                </div>
                                <span style={{ 
                                    ...styles.badge, 
                                    backgroundColor: step.completed ? 'rgba(34, 197, 94, 0.2)' : 'rgba(107, 114, 128, 0.2)',
                                    color: step.completed ? '#4ade80' : '#9ca3af'
                                }}>
                                    {step.completed ? 'Completed' : 'Pending'}
                                </span>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default LeaderboardAndCareerPage;