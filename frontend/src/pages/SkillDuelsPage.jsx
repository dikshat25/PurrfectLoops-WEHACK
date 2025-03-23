import React, { useState, useEffect, useRef } from 'react';

// Mock Socket.IO (for demonstration purposes)
const mockSocket = {
    on: (event, callback) => {
        mockSocket.listeners[event] = callback;
    },
    emit: (event, data) => {
        // Simulate server responses
        if (event === 'invite-duel') {
            const { challenger, challengee, skill } = data;
            mockSocket.listeners['duel-invitation']?.({ challenger, challengee, skill, duelId: 'duel-' + Math.random().toString(36).substring(7) }); // Include duelId
        } else if (event === 'accept-duel') {
            const { duelId, challengee } = data;
            if (mockSocket.duelInvitations[duelId]) { //check if duel invitation exists
                mockSocket.listeners['duel-start']?.({ duelId, participants: [mockSocket.duelInvitations[duelId].challenger, challengee], skill: mockSocket.duelInvitations[duelId].skill }); //send duel start
                mockSocket.currentDuels[duelId] = { participants: [mockSocket.duelInvitations[duelId].challenger, challengee], skill: mockSocket.duelInvitations[duelId].skill, startTime: Date.now() };
                delete mockSocket.duelInvitations[duelId];
            }


        } else if (event === 'duel-update') {
            const { duelId, progress, participant } = data;
            if (!mockSocket.duelProgress[duelId]) {
                mockSocket.duelProgress[duelId] = {};
            }
            mockSocket.duelProgress[duelId][participant] = progress;
            mockSocket.listeners['duel-progress-update']?.({ duelId, progress: mockSocket.duelProgress[duelId] });
        } else if (event === 'finish-duel') {
            const { duelId, winner } = data;
            const duel = mockSocket.currentDuels[duelId];
            if (duel) {
                mockSocket.listeners['duel-ended']?.({ duelId, winner, participants: duel.participants, skill: duel.skill });
                mockSocket.duelHistory[duelId] = { ...duel, winner, endTime: Date.now() };
                delete mockSocket.currentDuels[duelId];
            }


        } else if (event === 'get-duel-history') {
            mockSocket.listeners['duel-history']?.(mockSocket.duelHistory);
        } else if (event === 'get-current-duels') {
            mockSocket.listeners['current-duels']?.(mockSocket.currentDuels);
        }
    },
    listeners: {},
    duelInvitations: {},  // Store duel invitations,
    currentDuels: {},
    duelProgress: {},
    duelHistory: {},
    leaderboard: [  // Mock leaderboard data
        { name: 'User1', wins: 15, losses: 5 },
        { name: 'User2', wins: 12, losses: 8 },
        { name: 'User3', wins: 10, losses: 10 },
        { name: 'User4', wins: 8, losses: 12 },
        { name: 'User5', wins: 5, losses: 15 },
    ],
};

// Internal CSS styles
const styles = {
    container: {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '2rem',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e9f2 100%)',
        borderRadius: '16px',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
        fontFamily: '"Inter", system-ui, sans-serif',
    },
    header: {
        textAlign: 'center',
        marginBottom: '3rem',
        position: 'relative',
    },
    title: {
        fontSize: '3.5rem',
        fontWeight: '800',
        color: '#2563eb',
        marginBottom: '1rem',
        textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        position: 'relative',
        display: 'inline-block',
    },
    titleDecoration: {
        content: '""',
        position: 'absolute',
        bottom: '-10px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100px',
        height: '4px',
        background: 'linear-gradient(90deg, #3b82f6, #2dd4bf)',
        borderRadius: '2px',
    },
    section: {
        background: '#ffffff',
        borderRadius: '16px',
        padding: '2rem',
        marginBottom: '2rem',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)',
        borderTop: '5px solid #3b82f6',
        transition: 'transform 0.3s ease',
    },
    sectionTitle: {
        fontSize: '1.6rem',
        fontWeight: '700',
        color: '#1e3a8a',
        marginBottom: '1.5rem',
        paddingBottom: '0.75rem',
        borderBottom: '2px solid #f3f4f6',
        display: 'flex',
        alignItems: 'center',
    },
    inputsContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
    },
    input: {
        padding: '0.75rem 1rem',
        borderRadius: '8px',
        border: '1px solid #e5e7eb',
        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
        fontSize: '1rem',
        transition: 'border-color 0.2s, box-shadow 0.2s',
        outline: 'none',
    },
    select: {
        padding: '0.75rem 1rem',
        borderRadius: '8px',
        border: '1px solid #e5e7eb',
        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
        fontSize: '1rem',
        backgroundColor: '#fff',
        cursor: 'pointer',
    },
    button: {
        backgroundColor: '#2563eb',
        color: 'white',
        fontWeight: '600',
        padding: '0.75rem 1.5rem',
        borderRadius: '8px',
        border: 'none',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        boxShadow: '0 4px 10px rgba(37, 99, 235, 0.2)',
        outline: 'none',
        width: '100%',
    },
    buttonHover: {
        backgroundColor: '#1d4ed8',
        transform: 'translateY(-2px)',
        boxShadow: '0 6px 15px rgba(37, 99, 235, 0.3)',
    },
    duelCard: {
        background: 'linear-gradient(to right, #f0f9ff, #e0f2fe)',
        border: '1px solid #dbeafe',
        borderRadius: '12px',
        padding: '1.5rem',
        marginBottom: '1rem',
    },
    liveDuel: {
        background: 'linear-gradient(to right, #eff6ff, #dbeafe)',
        borderRadius: '12px',
        padding: '1.5rem',
        border: '1px solid #bfdbfe',
        position: 'relative',
        overflow: 'hidden',
    },
    timer: {
        fontSize: '2rem',
        fontWeight: '700',
        color: '#ef4444',
        textAlign: 'center',
        margin: '1rem 0',
    },
    progressContainer: {
        marginTop: '1rem',
    },
    progressLabel: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '0.5rem',
    },
    progressBarContainer: {
        width: '100%',
        height: '12px',
        backgroundColor: '#e5e7eb',
        borderRadius: '6px',
        overflow: 'hidden',
    },
    yourProgressBar: {
        height: '100%',
        backgroundColor: '#2563eb',
        borderRadius: '6px',
        transition: 'width 0.5s ease',
    },
    opponentProgressBar: {
        height: '100%',
        backgroundColor: '#ef4444',
        borderRadius: '6px',
        transition: 'width 0.5s ease',
    },
    resultCard: {
        background: 'linear-gradient(to right, #ecfdf5, #d1fae5)',
        border: '1px solid #a7f3d0',
        borderRadius: '12px',
        padding: '1.5rem',
    },
    resultTitle: {
        fontSize: '1.5rem',
        fontWeight: '700',
        color: '#047857',
        marginBottom: '1rem',
    },
    table: {
        width: '100%',
        borderCollapse: 'separate',
        borderSpacing: '0',
    },
    tableHeader: {
        backgroundColor: '#f1f5f9',
        color: '#334155',
    },
    tableHeaderCell: {
        padding: '1rem',
        textAlign: 'left',
        fontWeight: '600',
        fontSize: '0.875rem',
        letterSpacing: '0.05em',
        textTransform: 'uppercase',
        borderBottom: '2px solid #e2e8f0',
        position: 'relative',
    },
    tableRow: {
        transition: 'background-color 0.2s',
    },
    tableRowHover: {
        backgroundColor: '#f8fafc',
    },
    tableCell: {
        padding: '1rem',
        borderBottom: '1px solid #e2e8f0',
        fontSize: '0.875rem',
    },
    historyCard: {
        background: '#f8fafc',
        borderRadius: '12px',
        padding: '1.5rem',
        marginBottom: '1rem',
        border: '1px solid #e2e8f0',
        transition: 'transform 0.2s, box-shadow 0.2s',
    },
    historyCardHover: {
        transform: 'translateY(-2px)',
        boxShadow: '0 8px 20px rgba(0, 0, 0, 0.05)',
    },
    badge: {
        display: 'inline-block',
        padding: '0.25rem 0.75rem',
        borderRadius: '9999px',
        fontSize: '0.75rem',
        fontWeight: '600',
        marginLeft: '0.5rem',
    },
    badgeBlue: {
        backgroundColor: '#dbeafe',
        color: '#1e40af',
    },
    badgeGreen: {
        backgroundColor: '#dcfce7',
        color: '#166534',
    },
    badgeRed: {
        backgroundColor: '#fee2e2',
        color: '#b91c1c',
    },
    winnerBadge: {
        backgroundColor: '#fef3c7',
        color: '#92400e',
        padding: '0.25rem 0.75rem',
        borderRadius: '9999px',
        fontSize: '0.875rem',
        fontWeight: '600',
    },
    emptyState: {
        textAlign: 'center',
        padding: '2rem',
        color: '#64748b',
        fontSize: '1rem',
    },
    flexRow: {
        display: 'flex',
        flexDirection: 'row',
        gap: '1rem',
    },
    flexCol: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
    },
    responsiveGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '1rem',
    },
    // Media queries would need to be handled differently in React
};

const SkillDuels = () => {
    const [challengerName, setChallengerName] = useState('');
    const [challengeeName, setChallengeeName] = useState('');
    const [skill, setSkill] = useState('coding'); // Default skill
    const [duel, setDuel] = useState(null);
    const [duelResult, setDuelResult] = useState(null);
    const [leaderboard, setLeaderboard] = useState([]);
    const [timerDisplay, setTimerDisplay] = useState('--:--');
    const [duelDuration, setDuelDuration] = useState(60); // in seconds
    const [duelStartTime, setDuelStartTime] = useState(null);
    const [userProgress, setUserProgress] = useState(0);  // 0-100
    const [duelHistory, setDuelHistory] = useState([]);
    const [currentDuels, setCurrentDuels] = useState([]);
    const [buttonHoverStates, setButtonHoverStates] = useState({
        invite: false,
        update: false,
        finish: false,
    });
    const [hoveredHistoryCard, setHoveredHistoryCard] = useState(null);

    //const socket = io(); // Replace with actual Socket.IO
    const socket = mockSocket;
    const timerInterval = useRef(null);
    const [duelId, setDuelId] = useState(null);

    // --- Helper Functions ---
    const showToast = (message, type = 'info') => {
        alert(`${message} (Type: ${type})`);
    };

    // --- Event Handlers ---
    const handleInviteDuel = () => {
        if (!challengerName.trim() || !challengeeName.trim()) {
            showToast('Please enter both challenger and challengee names.', 'warning');
            return;
        }
        if (challengerName === challengeeName) {
            showToast('Challenger and Challengee cannot be the same.', 'warning');
            return;
        }
        socket.emit('invite-duel', { challenger: challengerName, challengee: challengeeName, skill });
        setChallengerName('');
        setChallengeeName('');
    };

    const handleAcceptDuel = (acceptedDuelId) => {
        socket.emit('accept-duel', { duelId: acceptedDuelId, challengee: 'Current User' }); // Replace 'Current User'
    };

    const handleUpdateProgress = () => {
        if (duelId) {
            const newProgress = Math.min(100, userProgress + 10); // Increment by 10, max 100
            setUserProgress(newProgress);
            socket.emit('duel-update', { duelId, progress: newProgress, participant: 'Current User' }); //replace current user
        }
    };

    const handleFinishDuel = () => {
        if (duelId) {
            // Determine the winner (basic logic for example)
            const winner = userProgress >= 100 ? 'Current User' : 'Opponent';  // Replace 'Opponent'
            socket.emit('finish-duel', { duelId, winner });
            setUserProgress(0);
        }
    };

    // --- Socket.IO Event Listeners ---
    useEffect(() => {
        socket.on('duel-invitation', (invitation) => {
            // Display invitation to the challengee.  In a real app, use a modal or notification.
            if (invitation.challengee === 'Current User') { // Replace 'Current User'
                const accept = confirm(`${invitation.challenger} has invited you to a ${invitation.skill} duel. Accept?`);
                if (accept) {
                    handleAcceptDuel(invitation.duelId);
                }
            }
            mockSocket.duelInvitations[invitation.duelId] = invitation; //store invitation
        });

        socket.on('duel-start', (startData) => {
            setDuel(startData);
            setDuelId(startData.duelId);
            setDuelStartTime(Date.now());
            setDuelResult(null); //clear previous
            setDuelDuration(60); //reset
            setUserProgress(0);
        });

        socket.on('duel-progress-update', (data) => {
            // Update UI with progress.  For simplicity, assume two participants.
            if (data.duelId === duelId) {
                //setDuelProgress(data.progress);
            }
        });

        socket.on('duel-ended', (result) => {
            setDuelResult(result);
            setDuel(null); // Reset duel state
            setDuelId(null);
            if (timerInterval.current) {
                clearInterval(timerInterval.current);
            }
            // Update leaderboard (basic example)
            const updatedLeaderboard = leaderboard.map(user => {
                if (result.participants.includes(user.name)) {
                    if (user.name === result.winner) {
                        return { ...user, wins: user.wins + 1 };
                    } else {
                        return { ...user, losses: user.losses + 1 };
                    }
                }
                return user;
            });
            setLeaderboard(updatedLeaderboard);
        });

        socket.on('leaderboard-update', (updatedLeaderboard) => {
            setLeaderboard(updatedLeaderboard);
        });

        socket.on('duel-history', (history) => {
            setDuelHistory(history);
        });

        socket.on('current-duels', (duels) => {
            setCurrentDuels(duels);
        });

        // --- Initialization ---
        const init = () => {
            socket.emit('get-duel-history');
            socket.emit('get-current-duels');
        };

        init();

        // Cleanup
        return () => {
            // socket.disconnect();
            if (timerInterval.current) {
                clearInterval(timerInterval.current);
            }
        };
    }, [socket, duelId]);

    // --- Timer Logic ---
    useEffect(() => {
        if (duelStartTime) {
            timerInterval.current = setInterval(() => {
                const now = Date.now();
                const timePassed = Math.floor((now - duelStartTime) / 1000);
                const timeLeft = Math.max(0, duelDuration - timePassed);

                const minutes = Math.floor(timeLeft / 60);
                const seconds = timeLeft % 60;

                setTimerDisplay(`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);

                if (timeLeft <= 0) {
                    clearInterval(timerInterval.current);
                    setTimerDisplay('00:00');
                    handleFinishDuel(); //end duel
                }
            }, 1000);
        }

        return () => {
            if (timerInterval.current) {
                clearInterval(timerInterval.current);
            }
        };
    }, [duelStartTime, duelDuration, duelId]);

    // Skill badge renderer
    const renderSkillBadge = (skillType) => {
        let badgeStyle = { ...styles.badge };
        
        switch(skillType) {
            case 'coding':
                badgeStyle = { ...badgeStyle, ...styles.badgeBlue };
                break;
            case 'design':
                badgeStyle = { ...badgeStyle, ...styles.badgeGreen };
                break;
            case 'problem-solving':
                badgeStyle = { ...badgeStyle, ...styles.badgeRed };
                break;
            default:
                badgeStyle = { ...badgeStyle, ...styles.badgeBlue };
        }
        
        return (
            <span style={badgeStyle}>
                {skillType.charAt(0).toUpperCase() + skillType.slice(1)}
            </span>
        );
    };

    return (
        <div style={styles.container}>
            <header style={styles.header}>
                <h1 style={styles.title}>
                    Skill Duels
                    <span style={styles.titleDecoration}></span>
                </h1>
            </header>

            <section style={styles.section}>
                <h2 style={styles.sectionTitle}>
                    Invite to Duel
                </h2>
                <div style={styles.inputsContainer}>
                    <div style={styles.responsiveGrid}>
                        <input
                            type="text"
                            placeholder="Your Name"
                            value={challengerName}
                            onChange={(e) => setChallengerName(e.target.value)}
                            style={styles.input}
                        />
                        <input
                            type="text"
                            placeholder="Opponent's Name"
                            value={challengeeName}
                            onChange={(e) => setChallengeeName(e.target.value)}
                            style={styles.input}
                        />
                        <select
                            value={skill}
                            onChange={(e) => setSkill(e.target.value)}
                            style={styles.select}
                        >
                            <option value="coding">Coding</option>
                            <option value="design">Design</option>
                            <option value="problem-solving">Problem Solving</option>
                        </select>
                        <button
                            onClick={handleInviteDuel}
                            style={{
                                ...styles.button,
                                ...(buttonHoverStates.invite ? styles.buttonHover : {})
                            }}
                            onMouseEnter={() => setButtonHoverStates({...buttonHoverStates, invite: true})}
                            onMouseLeave={() => setButtonHoverStates({...buttonHoverStates, invite: false})}
                        >
                            Invite to Duel
                        </button>
                    </div>
                </div>
            </section>

            <section style={styles.section}>
                <h2 style={styles.sectionTitle}>
                    Current Duels
                </h2>
                {currentDuels && Object.keys(currentDuels).length > 0 ? (
                    <div style={styles.flexCol}>
                        {Object.entries(currentDuels).map(([key, duelData]) => (
                            <div key={key} style={styles.duelCard}>
                                <p><span style={{fontWeight: 600}}>Duel ID:</span> {key}</p>
                                <p><span style={{fontWeight: 600}}>Participants:</span> {duelData.participants.join(' vs ')}</p>
                                <p>
                                    <span style={{fontWeight: 600}}>Skill:</span> 
                                    {renderSkillBadge(duelData.skill)}
                                </p>
                                <p><span style={{fontWeight: 600}}>Start Time:</span> {new Date(duelData.startTime).toLocaleString()}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div style={styles.emptyState}>No duels currently in progress.</div>
                )}
            </section>

            <section style={styles.section}>
                <h2 style={styles.sectionTitle}>
                    Live Duel
                </h2>
                {duel ? (
                    <div style={styles.liveDuel}>
                        <div style={styles.flexRow}>
                            <div style={{flex: 1}}>
                                <p style={{fontWeight: 600, fontSize: '1.25rem'}}>
                                    {duel.participants.join(' vs ')}
                                </p>
                                <p>
                                    <span style={{fontWeight: 600}}>Skill:</span> 
                                    {renderSkillBadge(duel.skill)}
                                </p>
                            </div>
                            <div style={styles.timer}>
                                {timerDisplay}
                            </div>
                        </div>
                        
                        <div style={{marginTop: '2rem'}}>
                            <div style={styles.progressContainer}>
                                <div style={styles.progressLabel}>
                                    <span style={{fontWeight: 600}}>Your Progress:</span>
                                    <span>{userProgress}%</span>
                                </div>
                                <div style={styles.progressBarContainer}>
                                    <div 
                                        style={{
                                            ...styles.yourProgressBar,
                                            width: `${userProgress}%`
                                        }}
                                    ></div>
                                </div>
                                <button
                                    onClick={handleUpdateProgress}
                                    style={{
                                        ...styles.button,
                                        backgroundColor: '#10b981',
                                        marginTop: '1rem',
                                        ...(buttonHoverStates.update ? {backgroundColor: '#059669'} : {})
                                    }}
                                    onMouseEnter={() => setButtonHoverStates({...buttonHoverStates, update: true})}
                                    onMouseLeave={() => setButtonHoverStates({...buttonHoverStates, update: false})}
                                >
                                    Update Progress
                                </button>
                            </div>
                            
                            <div style={{...styles.progressContainer, marginTop: '2rem'}}>
                                <div style={styles.progressLabel}>
                                    <span style={{fontWeight: 600}}>Opponent Progress:</span>
                                    <span>0%</span>
                                </div>
                                <div style={styles.progressBarContainer}>
                                    <div 
                                        style={{
                                            ...styles.opponentProgressBar,
                                            width: `0%`
                                        }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                        
                        <button
                            onClick={handleFinishDuel}
                            style={{
                                ...styles.button,
                                backgroundColor: '#ef4444',
                                marginTop: '2rem',
                                ...(buttonHoverStates.finish ? {backgroundColor: '#dc2626'} : {})
                            }}
                            onMouseEnter={() => setButtonHoverStates({...buttonHoverStates, finish: true})}
                            onMouseLeave={() => setButtonHoverStates({...buttonHoverStates, finish: false})}
                        >
                            Finish Duel
                        </button>
                    </div>
                ) : duelResult ? (
                    <div style={styles.resultCard}>
                        <p style={styles.resultTitle}>
                            Duel Result: <span style={{fontWeight: 800}}>{duelResult.winner}</span> wins!
                        </p>
                        <p><span style={{fontWeight: 600}}>Participants:</span> {duelResult.participants.join(' vs ')}</p>
                        <p>
                            <span style={{fontWeight: 600}}>Skill:</span>
                            {renderSkillBadge(duelResult.skill)}
                        </p>
                    </div>
                ) : (
                    <div style={styles.emptyState}>No duel in progress.</div>
                )}
            </section>

            <section style={styles.section}>
                <h2 style={styles.sectionTitle}>
                    Leaderboard
                </h2>
                <div style={{borderRadius: '12px', overflow: 'hidden', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)'}}>
                    <table style={styles.table}>
                        <thead style={styles.tableHeader}>
                            <tr>
                                <th style={{...styles.tableHeaderCell, width: '50%'}}>Name</th>
                                <th style={{...styles.tableHeaderCell, width: '25%'}}>Wins</th>
                                <th style={{...styles.tableHeaderCell, width: '25%'}}>Losses</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mockSocket.leaderboard.map((user, index) => (
                                <tr 
                                    key={index} 
                                    style={{
                                        ...styles.tableRow,
                                        backgroundColor: index % 2 === 0 ? '#ffffff' : '#f8fafc'
                                    }}
                                >
                                    <td style={styles.tableCell}>{user.name}</td>
                                    <td style={{...styles.tableCell, color: '#047857', fontWeight: 600}}>{user.wins}</td>
                                    <td style={{...styles.tableCell, color: '#b91c1c', fontWeight: 600}}>{user.losses}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            <section style={styles.section}>
                <h2 style={styles.sectionTitle}>
                    Duel History
                </h2>
                {duelHistory && Object.keys(duelHistory).length > 0 ? (
                    <div style={styles.flexCol}>
                        {Object.entries(duelHistory).map(([key, duelData]) => (
                            <div 
                                key={key} 
                                style={{
                                    ...styles.historyCard,
                                    ...(hoveredHistoryCard === key ? styles.historyCardHover : {})
                                }}
                                onMouseEnter={() => setHoveredHistoryCard(key)}
                                onMouseLeave={() => setHoveredHistoryCard(null)}
                            >
                                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem'}}>
                                    <p style={{fontWeight: 700, fontSize: '1.125rem'}}>
                                        {duelData.participants.join(' vs ')}
                                    </p>
                                    <span style={styles.winnerBadge}>Winner: {duelData.winner}</span>
                                </div>
                                <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem'}}>
                                    <p><span style={{fontWeight: 600}}>Duel ID:</span> {key}</p>
                                    <p>
                                        <span style={{fontWeight: 600}}>Skill:</span>
                                        {renderSkillBadge(duelData.skill)}
                                    </p>
                                    <p><span style={{fontWeight: 600}}>Start:</span> {new Date(duelData.startTime).toLocaleTimeString()}</p>
                                    <p><span style={{fontWeight: 600}}>End:</span> {new Date(duelData.endTime).toLocaleTimeString()}</p>
                                    <p><span style={{fontWeight: 600}}>Duration:</span> {Math.round((duelData.endTime - duelData.startTime) / 1000)} sec</p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div style={styles.emptyState}>No duel history available.</div>
                )}</section>
                </div>
            );
        };
        
        export default SkillDuels;