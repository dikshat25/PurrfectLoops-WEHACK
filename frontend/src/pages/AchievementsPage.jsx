import React, { useState, useEffect } from 'react';
import { Trophy, Award, BadgeCheck, ChevronRight, Loader2, Star } from 'lucide-react';

// Mock Data
const mockBadges = [
    { id: 'coding-1', name: 'Code Novice', description: 'Completed 5 coding challenges', progress: 100, maxProgress: 100 },
    { id: 'coding-2', name: 'Code Apprentice', description: 'Completed 10 coding challenges', progress: 50, maxProgress: 100 },
    { id: 'design-1', name: 'Design Enthusiast', description: 'Completed 3 design challenges', progress: 75, maxProgress: 100 },
    { id: 'problem-1', name: 'Problem Solver', description: 'Solved 2 complex problems', progress: 100, maxProgress: 100 },
    { id: 'teamwork-1', name: 'Team Player', description: 'Participated in 3 team challenges', progress: 25, maxProgress: 100 },
    { id: 'speed-1', name: 'Speed Demon', description: 'Completed a challenge in record time', progress: 100, maxProgress: 100 },
    { id: 'consistency-1', name: 'Consistent Contributor', description: 'Completed challenges for 7 days straight', progress: 100, maxProgress: 100 },
    { id: 'master-coder', name: 'Master Coder', description: 'Completed 25 coding challenges', progress: 0, maxProgress: 100 },
];

const mockTrophies = [
    { id: 'trophy-1', name: 'Challenge Champion', description: 'Won 10 duels', date: '2024-01-15' },
    { id: 'trophy-2', name: 'Team Titan', description: 'Won 5 team challenges', date: '2024-02-20' },
    { id: 'trophy-3', name: 'Skill Master', description: 'Mastered a skill', date: '2024-03-10' },
];

const mockProgress = {
    coding: 60,
    design: 30,
    'problem-solving': 80,
    teamwork: 10,
};

const AchievementsPage = () => {
    const [badges, setBadges] = useState([]);
    const [trophies, setTrophies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('badges');

    useEffect(() => {
        // Simulate data loading
        const timer = setTimeout(() => {
            setBadges(mockBadges);
            setTrophies(mockTrophies);
            setLoading(false);
        }, 1500);

        return () => clearTimeout(timer);
    }, []);

    // Function to get badge progress
    const getBadgeProgress = (badge) => {
        if (badge.progress === undefined || badge.maxProgress === undefined) {
            return 0;
        }
        return Math.min(100, (badge.progress / badge.maxProgress) * 100);
    };

    // CSS Styles
    const styles = {
        container: `
            min-height: 100vh;
            background: linear-gradient(135deg, #0f172a 0%, #2e1065 50%, #000000 100%);
            padding: 1rem;
            font-family: 'Inter', system-ui, sans-serif;
        `,
        content: `
            max-width: 1200px;
            margin: 0 auto;
            padding: 2rem;
        `,
        header: `
            text-align: center;
            margin-bottom: 3rem;
        `,
        title: `
            font-size: 3.5rem;
            font-weight: 800;
            background: linear-gradient(to right, #60a5fa, #c084fc, #f472b6);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            margin-bottom: 1rem;
            letter-spacing: -1px;
        `,
        subtitle: `
            color: rgba(255, 255, 255, 0.7);
            font-size: 1.1rem;
            max-width: 600px;
            margin: 0 auto;
        `,
        navigation: `
            display: flex;
            justify-content: center;
            margin-bottom: 2rem;
            gap: 1rem;
            padding: 0.5rem;
            background: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(10px);
            border-radius: 1rem;
            border: 1px solid rgba(255, 255, 255, 0.1);
            max-width: 500px;
            margin: 0 auto 2rem auto;
        `,
        navButton: `
            padding: 0.75rem 1.5rem;
            border-radius: 0.75rem;
            font-weight: 500;
            font-size: 0.9rem;
            color: rgba(255, 255, 255, 0.7);
            transition: all 0.3s ease;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        `,
        navButtonActive: `
            background: rgba(255, 255, 255, 0.1);
            color: white;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        `,
        sectionTitle: `
            font-size: 1.75rem;
            font-weight: 600;
            color: rgba(255, 255, 255, 0.9);
            margin-bottom: 1.5rem;
            display: flex;
            align-items: center;
            gap: 0.75rem;
            padding-bottom: 0.5rem;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        `,
        badgesGrid: `
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 1.5rem;
        `,
        badge: `
            background: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(10px);
            border-radius: 1rem;
            padding: 1.5rem;
            border: 1px solid rgba(255, 255, 255, 0.1);
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
            transition: all 0.3s cubic-bezier(0.17, 0.67, 0.83, 0.67);
            position: relative;
            overflow: hidden;
        `,
        badgeHover: `
            transform: translateY(-5px);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            border-color: rgba(255, 255, 255, 0.2);
            background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%);
        `,
        badgeUnlocked: `
            border-color: rgba(147, 51, 234, 0.5);
        `,
        badgeGlow: `
            position: absolute;
            width: 100px;
            height: 100px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(124, 58, 237, 0.4) 0%, rgba(124, 58, 237, 0) 70%);
            top: -20px;
            right: -20px;
            opacity: 0;
            transition: opacity 0.3s ease;
        `,
        badgeGlowActive: `
            opacity: 1;
        `,
        badgeHeader: `
            display: flex;
            align-items: center;
            gap: 1rem;
            margin-bottom: 1rem;
        `,
        badgeIconContainer: `
            width: 48px;
            height: 48px;
            border-radius: 12px;
            background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 10px rgba(139, 92, 246, 0.3);
        `,
        badgeInfo: `
            flex: 1;
        `,
        badgeName: `
            font-size: 1.1rem;
            font-weight: 600;
            color: white;
            margin-bottom: 0.25rem;
        `,
        badgeDescription: `
            font-size: 0.85rem;
            color: rgba(255, 255, 255, 0.6);
            line-height: 1.4;
        `,
        progressContainer: `
            width: 100%;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 0.75rem;
            height: 0.5rem;
            overflow: hidden;
            margin: 1rem 0;
        `,
        progressBar: `
            height: 100%;
            border-radius: 0.75rem;
            background: linear-gradient(to right, #8b5cf6, #3b82f6);
            transition: width 1s cubic-bezier(0.17, 0.67, 0.83, 0.67);
            box-shadow: 0 0 10px rgba(139, 92, 246, 0.5);
        `,
        progressInfo: `
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 0.8rem;
        `,
        progressCount: `
            color: rgba(255, 255, 255, 0.7);
        `,
        detailsLink: `
            color: #a78bfa;
            font-size: 0.85rem;
            font-weight: 500;
            display: flex;
            align-items: center;
            gap: 0.25rem;
            transition: color 0.2s ease;
            cursor: pointer;
        `,
        detailsLinkHover: `
            color: #c4b5fd;
            text-decoration: underline;
        `,
        trophy: `
            background: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(10px);
            border-radius: 1rem;
            padding: 1.5rem;
            border: 1px solid rgba(255, 255, 255, 0.1);
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
            transition: all 0.3s cubic-bezier(0.17, 0.67, 0.83, 0.67);
            position: relative;
            overflow: hidden;
        `,
        trophyIconContainer: `
            width: 48px;
            height: 48px;
            border-radius: 12px;
            background: linear-gradient(135deg, #f59e0b 0%, #ef4444 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 10px rgba(245, 158, 11, 0.3);
        `,
        trophyDate: `
            font-size: 0.75rem;
            color: rgba(255, 255, 255, 0.5);
            margin-top: 0.25rem;
        `,
        skillProgress: `
            background: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(10px);
            border-radius: 1rem;
            padding: 1.5rem;
            border: 1px solid rgba(255, 255, 255, 0.1);
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
        `,
        skillProgressBar: `
            height: 100%;
            border-radius: 0.75rem;
            background: linear-gradient(to right, #10b981, #059669);
            transition: width 1s cubic-bezier(0.17, 0.67, 0.83, 0.67);
        `,
        loaderContainer: `
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 300px;
        `,
        loadingText: `
            color: rgba(255, 255, 255, 0.7);
            margin-top: 1rem;
            font-size: 1.1rem;
        `,
        stats: `
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            gap: 1rem;
            margin-bottom: 3rem;
        `,
        statCard: `
            background: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(10px);
            border-radius: 1rem;
            padding: 1.25rem;
            text-align: center;
            border: 1px solid rgba(255, 255, 255, 0.1);
        `,
        statValue: `
            font-size: 2rem;
            font-weight: 700;
            color: white;
            margin-bottom: 0.5rem;
        `,
        statLabel: `
            font-size: 0.85rem;
            color: rgba(255, 255, 255, 0.6);
        `
    };

    // Inline styles for dynamic values
    const getDynamicStyles = (progress) => {
        return {
            progressBarWidth: `width: ${progress}%`,
        };
    };

    return (
        <div style={{ cssText: styles.container }}>
            <div style={{ cssText: styles.content }}>
                <header style={{ cssText: styles.header }}>
                    <h1 style={{ cssText: styles.title }}>Achievements & Recognition</h1>
                    <p style={{ cssText: styles.subtitle }}>
                        Track your progress, unlock badges, and showcase your achievements as you grow your skills and complete challenges.
                    </p>
                </header>

                <nav style={{ cssText: styles.navigation }}>
                    <button 
                        style={{ cssText: `${styles.navButton} ${selectedCategory === 'badges' ? styles.navButtonActive : ''}` }}
                        onClick={() => setSelectedCategory('badges')}
                    >
                        <BadgeCheck size={16} /> Badges
                    </button>
                    <button 
                        style={{ cssText: `${styles.navButton} ${selectedCategory === 'trophies' ? styles.navButtonActive : ''}` }}
                        onClick={() => setSelectedCategory('trophies')}
                    >
                        <Trophy size={16} /> Trophies
                    </button>
                    <button 
                        style={{ cssText: `${styles.navButton} ${selectedCategory === 'skills' ? styles.navButtonActive : ''}` }}
                        onClick={() => setSelectedCategory('skills')}
                    >
                        <Award size={16} /> Skills
                    </button>
                </nav>

                {loading ? (
                    <div style={{ cssText: styles.loaderContainer }}>
                        <Loader2 size={48} className="animate-spin text-purple-400" />
                        <p style={{ cssText: styles.loadingText }}>Loading your achievements...</p>
                    </div>
                ) : (
                    <>
                        {/* Overview stats */}
                        <div style={{ cssText: styles.stats }}>
                            <div style={{ cssText: styles.statCard }}>
                                <div style={{ cssText: styles.statValue }}>{badges.filter(b => getBadgeProgress(b) === 100).length}</div>
                                <div style={{ cssText: styles.statLabel }}>Badges Unlocked</div>
                            </div>
                            <div style={{ cssText: styles.statCard }}>
                                <div style={{ cssText: styles.statValue }}>{trophies.length}</div>
                                <div style={{ cssText: styles.statLabel }}>Trophies Earned</div>
                            </div>
                            <div style={{ cssText: styles.statCard }}>
                                <div style={{ cssText: styles.statValue }}>
                                    {Object.values(mockProgress).reduce((a, b) => a + b, 0) / Object.values(mockProgress).length}%
                                </div>
                                <div style={{ cssText: styles.statLabel }}>Average Skill Progress</div>
                            </div>
                            <div style={{ cssText: styles.statCard }}>
                                <div style={{ cssText: styles.statValue }}>42</div>
                                <div style={{ cssText: styles.statLabel }}>Total Challenges</div>
                            </div>
                        </div>

                        {selectedCategory === 'badges' && (
                            <section>
                                <h2 style={{ cssText: styles.sectionTitle }}>
                                    <BadgeCheck size={24} color="#8b5cf6" />
                                    Skill Badges
                                </h2>

                                <div style={{ cssText: styles.badgesGrid }}>
                                    {badges.map((badge) => {
                                        const progress = getBadgeProgress(badge);
                                        const isComplete = progress === 100;
                                        
                                        return (
                                            <div
                                                key={badge.id}
                                                style={{ cssText: `${styles.badge} ${isComplete ? styles.badgeUnlocked : ''}` }}
                                                onMouseOver={(e) => {
                                                    e.currentTarget.style.cssText = `${styles.badge} ${styles.badgeHover} ${isComplete ? styles.badgeUnlocked : ''}`;
                                                    if (isComplete) {
                                                        e.currentTarget.querySelector('.badge-glow').style.cssText = styles.badgeGlow + styles.badgeGlowActive;
                                                    }
                                                }}
                                                onMouseOut={(e) => {
                                                    e.currentTarget.style.cssText = `${styles.badge} ${isComplete ? styles.badgeUnlocked : ''}`;
                                                    if (isComplete) {
                                                        e.currentTarget.querySelector('.badge-glow').style.cssText = styles.badgeGlow;
                                                    }
                                                }}
                                            >
                                                <div className="badge-glow" style={{ cssText: styles.badgeGlow }}></div>
                                                
                                                <div style={{ cssText: styles.badgeHeader }}>
                                                    <div style={{ cssText: styles.badgeIconContainer }}>
                                                        {isComplete ? (
                                                            <BadgeCheck size={24} color="white" />
                                                        ) : (
                                                            <BadgeCheck size={24} color="rgba(255, 255, 255, 0.5)" />
                                                        )}
                                                    </div>
                                                    <div style={{ cssText: styles.badgeInfo }}>
                                                        <h3 style={{ cssText: styles.badgeName }}>{badge.name}</h3>
                                                        <p style={{ cssText: styles.badgeDescription }}>{badge.description}</p>
                                                    </div>
                                                </div>
                                                
                                                <div style={{ cssText: styles.progressContainer }}>
                                                    <div 
                                                        style={{ cssText: `${styles.progressBar} ${getDynamicStyles(progress).progressBarWidth}` }}
                                                    ></div>
                                                </div>
                                                
                                                <div style={{ cssText: styles.progressInfo }}>
                                                    <span style={{ cssText: styles.progressCount }}>
                                                        {badge.progress ?? 0} / {badge.maxProgress ?? 0}
                                                    </span>
                                                    <a 
                                                        style={{ cssText: styles.detailsLink }}
                                                        onMouseOver={(e) => {
                                                            e.currentTarget.style.cssText = `${styles.detailsLink} ${styles.detailsLinkHover}`;
                                                        }}
                                                        onMouseOut={(e) => {
                                                            e.currentTarget.style.cssText = styles.detailsLink;
                                                        }}
                                                    >
                                                        View Details <ChevronRight size={14} />
                                                    </a>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </section>
                        )}

                        {selectedCategory === 'trophies' && (
                            <section>
                                <h2 style={{ cssText: styles.sectionTitle }}>
                                    <Trophy size={24} color="#f59e0b" />
                                    Achievement Trophies
                                </h2>

                                <div style={{ cssText: styles.badgesGrid }}>
                                    {trophies.map((trophy) => (
                                        <div
                                            key={trophy.id}
                                            style={{ cssText: styles.trophy }}
                                            onMouseOver={(e) => {
                                                e.currentTarget.style.cssText = `${styles.trophy} ${styles.badgeHover}`;
                                            }}
                                            onMouseOut={(e) => {
                                                e.currentTarget.style.cssText = styles.trophy;
                                            }}
                                        >
                                            <div style={{ cssText: styles.badgeHeader }}>
                                                <div style={{ cssText: styles.trophyIconContainer }}>
                                                    <Trophy size={24} color="white" />
                                                </div>
                                                <div style={{ cssText: styles.badgeInfo }}>
                                                    <h3 style={{ cssText: styles.badgeName }}>{trophy.name}</h3>
                                                    <p style={{ cssText: styles.badgeDescription }}>{trophy.description}</p>
                                                    <p style={{ cssText: styles.trophyDate }}>Earned on: {trophy.date}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {selectedCategory === 'skills' && (
                            <section>
                                <h2 style={{ cssText: styles.sectionTitle }}>
                                    <Award size={24} color="#10b981" />
                                    Skill Progress
                                </h2>
                                <div style={{ cssText: styles.badgesGrid }}>
                                    {Object.entries(mockProgress).map(([skill, progress]) => (
                                        <div
                                            key={skill}
                                            style={{ cssText: styles.skillProgress }}
                                            onMouseOver={(e) => {
                                                e.currentTarget.style.cssText = `${styles.skillProgress} ${styles.badgeHover}`;
                                            }}
                                            onMouseOut={(e) => {
                                                e.currentTarget.style.cssText = styles.skillProgress;
                                            }}
                                        >
                                            <h3 style={{ cssText: styles.badgeName }}>{skill.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</h3>
                                            <div style={{ cssText: styles.progressContainer }}>
                                                <div
                                                    style={{ cssText: `${styles.skillProgressBar} ${getDynamicStyles(progress).progressBarWidth}` }}
                                                ></div>
                                            </div>
                                            <div style={{ cssText: styles.progressInfo }}>
                                                <span style={{ cssText: styles.progressCount }}>
                                                    {progress}% Complete
                                                </span>
                                                <a 
                                                    style={{ cssText: styles.detailsLink }}
                                                    onMouseOver={(e) => {
                                                        e.currentTarget.style.cssText = `${styles.detailsLink} ${styles.detailsLinkHover}`;
                                                    }}
                                                    onMouseOut={(e) => {
                                                        e.currentTarget.style.cssText = styles.detailsLink;
                                                    }}
                                                >
                                                    View Path <ChevronRight size={14} />
                                                </a>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default AchievementsPage;