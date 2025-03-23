import React, { useState, useEffect, useRef } from 'react';

// Mock Socket.IO (for demonstration purposes in a non-server environment)
const mockSocket = {
    on: (event, callback) => {
        mockSocket.listeners[event] = callback;
    },
    emit: (event, data) => {
        // Simulate server response within the client
        if (event === 'create-team') {
            const newTeam = { name: data.teamName, members: [data.memberName], score: 0 };
            mockSocket.listeners['team-created']?.(newTeam);
            mockSocket.teams.push(newTeam); // Store the created team
            mockSocket.listeners['update-teams']?.(mockSocket.teams); // Emit to update all
        } else if (event === 'join-team') {
            const teamToJoin = mockSocket.teams.find(t => t.name === data.teamName);
            if (teamToJoin) {
                const updatedTeam = { ...teamToJoin, members: [...teamToJoin.members, data.memberName] }; //update immutably
                mockSocket.listeners['team-joined']?.(updatedTeam);
                mockSocket.teams = mockSocket.teams.map(t => t.name === data.teamName ? updatedTeam : t);
                mockSocket.listeners['update-teams']?.(mockSocket.teams); //update all
            } else {
                mockSocket.listeners['team-error']?.('Team not found');
            }
        } else if (event === 'send-message') {
            mockSocket.listeners['message']?.({ teamName: data.teamName, message: data.message });
        } else if (event === 'get-user-team') {
            if (mockSocket.userTeam) {
                mockSocket.listeners['user-team']?.(mockSocket.userTeam);
            } else {
                mockSocket.listeners['user-team']?.(null);
            }
        }
    },
    listeners: {},
    teams: [], //mock db
    userTeam: null,
};

const RealTimeCollaborativeChallenges = () => {
    // CSS Styles
    const styles = {
        container: {
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '1.5rem',
            fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif',
            color: '#333',
            backgroundColor: '#f5f7fa',
            minHeight: '100vh',
        },
        pageTitle: {
            fontSize: '2.5rem',
            fontWeight: '700',
            color: '#3b82f6',
            textAlign: 'center',
            marginBottom: '2rem',
            textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
            padding: '0.5rem 0',
            borderBottom: '2px solid #e5e7eb',
        },
        section: {
            backgroundColor: '#ffffff',
            borderRadius: '0.75rem',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.1)',
            padding: '1.5rem',
            marginBottom: '2rem',
            border: '1px solid #e5e7eb',
            transition: 'all 0.3s ease',
        },
        sectionTitle: {
            fontSize: '1.25rem',
            fontWeight: '600',
            color: '#1f2937',
            marginBottom: '1.5rem',
            paddingBottom: '0.5rem',
            borderBottom: '1px solid #e5e7eb',
        },
        flexRow: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
        },
        flexCol: {
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
        },
        input: {
            padding: '0.625rem 0.75rem',
            fontSize: '0.875rem',
            lineHeight: '1.25rem',
            borderRadius: '0.375rem',
            border: '1px solid #d1d5db',
            boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
            width: '100%',
            outline: 'none',
            transition: 'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out',
        },
        inputFocus: {
            borderColor: '#3b82f6',
            boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.3)',
        },
        buttonPrimary: {
            backgroundColor: '#3b82f6',
            color: '#ffffff',
            fontWeight: '500',
            padding: '0.625rem 1rem',
            borderRadius: '0.375rem',
            border: 'none',
            cursor: 'pointer',
            transition: 'background-color 0.15s ease-in-out, transform 0.1s ease',
            boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        buttonPrimaryHover: {
            backgroundColor: '#2563eb',
            transform: 'translateY(-1px)',
        },
        buttonSuccess: {
            backgroundColor: '#10b981',
            color: '#ffffff',
            fontWeight: '500',
            padding: '0.625rem 1rem',
            borderRadius: '0.375rem',
            border: 'none',
            cursor: 'pointer',
            transition: 'background-color 0.15s ease-in-out, transform 0.1s ease',
            boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        buttonSuccessHover: {
            backgroundColor: '#059669',
            transform: 'translateY(-1px)',
        },
        teamInfo: {
            backgroundColor: '#f9fafb',
            borderLeft: '4px solid #64748b',
            padding: '1rem',
            borderRadius: '0.375rem',
            marginBottom: '1rem',
        },
        teamWarning: {
            backgroundColor: '#fef3c7',
            borderLeft: '4px solid #f59e0b',
            color: '#78350f',
            padding: '1rem',
            borderRadius: '0.375rem',
            marginBottom: '1rem',
        },
        label: {
            display: 'block',
            fontSize: '0.875rem',
            fontWeight: '500',
            color: '#374151',
            marginBottom: '0.5rem',
        },
        gridContainer: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem',
        },
        card: {
            backgroundColor: '#f9fafb',
            border: '1px solid #e5e7eb',
            borderRadius: '0.5rem',
            padding: '1rem',
            height: '100%',
        },
        cardTitle: {
            fontSize: '1rem',
            fontWeight: '600',
            color: '#374151',
            marginBottom: '0.75rem',
        },
        chatWindow: {
            backgroundColor: '#ffffff',
            border: '1px solid #e5e7eb',
            borderRadius: '0.375rem',
            padding: '0.75rem',
            maxHeight: '250px',
            overflowY: 'auto',
            marginBottom: '1rem',
            boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.05)',
        },
        chatMessage: {
            padding: '0.5rem',
            marginBottom: '0.5rem',
            borderRadius: '0.375rem',
            fontSize: '0.875rem',
            lineHeight: '1.25rem',
            backgroundColor: '#f3f4f6',
        },
        progressList: {
            listStyle: 'inside',
            paddingLeft: '1.25rem',
        },
        progressItem: {
            marginBottom: '0.5rem',
            fontSize: '0.875rem',
            lineHeight: '1.25rem',
        },
        scoreDisplay: {
            backgroundColor: '#f3f4f6',
            borderRadius: '0.5rem',
            padding: '1.5rem',
            fontSize: '1.875rem',
            fontWeight: '700',
            textAlign: 'center',
            color: '#1f2937',
            boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.05)',
        },
        leaderboardList: {
            listStyle: 'decimal',
            paddingLeft: '1.5rem',
        },
        leaderboardItem: {
            padding: '0.5rem 0',
            borderBottom: '1px solid #e5e7eb',
            fontSize: '0.875rem',
            lineHeight: '1.25rem',
        },
        timer: {
            fontSize: '2.25rem',
            fontWeight: '700',
            textAlign: 'center',
            color: '#dc2626',
            padding: '1rem',
            borderRadius: '0.5rem',
            backgroundColor: '#fee2e2',
            marginTop: '0.5rem',
            boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.05)',
        },
        currentChallenge: {
            backgroundColor: '#e0f2fe',
            borderRadius: '0.375rem',
            padding: '0.75rem',
            marginTop: '1rem',
            fontSize: '1rem',
            fontWeight: '500',
            color: '#0369a1',
            textAlign: 'center',
        },
        buttonGroup: {
            display: 'flex',
            flexDirection: 'row',
            gap: '0.75rem',
        },
        inputGroup: {
            display: 'flex',
            flexDirection: 'row',
            gap: '0.75rem',
            width: '100%',
        },
    };

    const [teamNameInput, setTeamNameInput] = useState('');
    const [team, setTeam] = useState(null);
    const [progressListItems, setProgressListItems] = useState(['Waiting for the challenge to start...']);
    const [chatMessages, setChatMessages] = useState([]);
    const [chatInput, setChatInput] = useState('');
    const [score, setScore] = useState(0);
    const [leaderboard, setLeaderboard] = useState([]);
    const [timerDisplay, setTimerDisplay] = useState('--:--');
    const [challengeStartTime, setChallengeStartTime] = useState(null);
    const [challengeDuration, setChallengeDuration] = useState(0);
    const [currentChallenge, setCurrentChallenge] = useState("");
    
    // State for hover effects
    const [createBtnHover, setCreateBtnHover] = useState(false);
    const [joinBtnHover, setJoinBtnHover] = useState(false);
    const [sendBtnHover, setSendBtnHover] = useState(false);
    const [inputFocus, setInputFocus] = useState(false);
    const [chatInputFocus, setChatInputFocus] = useState(false);
    
    const chatWindowRef = useRef(null);

    //const socket = io(); // Replace with actual Socket.IO connection
    const socket = mockSocket;

    // --- Helper Functions ---
    /**
     * Displays a toast message.  Uses a basic alert for this example.
     */
    const showToast = (message, type = 'info') => {
        let backgroundColor = '#3498db'; // Default to info
        if (type === 'success') backgroundColor = '#2ecc71';
        else if (type === 'warning') backgroundColor = '#f39c12';
        else if (type === 'danger') backgroundColor = '#dc3545';

        // In a real app, use a proper toast library (e.g., react-toastify)
        alert(`${message} (Type: ${type})`);
    };

    // --- Event Handlers ---

    /**
     * Handles the creation of a new team.
     */
    const handleCreateTeam = () => {
        if (!teamNameInput.trim()) {
            showToast('Please enter a team name.', 'warning');
            return;
        }
        socket.emit('create-team', { teamName: teamNameInput, memberName: 'You' });
        setTeamNameInput('');
    };

    /**
     * Handles joining an existing team.
     */
    const handleJoinTeam = () => {
        if (!teamNameInput.trim()) {
            showToast('Please enter the name of the team you want to join.', 'warning');
            return;
        }
        socket.emit('join-team', { teamName: teamNameInput, memberName: 'You' });
        setTeamNameInput('');
    };

    /**
     * Handles sending a chat message.
     */
    const handleSendMessage = () => {
        const message = chatInput.trim();
        if (!message) return;

        if (team) {
            socket.emit('send-message', { teamName: team.name, message: `You: ${message}` });
            setChatInput('');
        } else {
            showToast('You are not on a team. Please create or join a team to chat.', 'warning');
        }
    };

    // --- Socket.IO Event Listeners (using useEffect) ---
    useEffect(() => {
        /**
         * Updates the team information on the UI.
         */
        const updateTeamInfo = (updatedTeam) => {
            setTeam(updatedTeam);
        };

        socket.on('team-created', (newTeam) => {
            setTeam(newTeam);
            showToast(`Team "${newTeam.name}" created successfully!`, 'success');
        });

        socket.on('team-joined', (joinedTeam) => {
            setTeam(joinedTeam);
            showToast(`Joined team "${joinedTeam.name}"!`, 'success');
        });

        socket.on('team-error', (error) => {
            showToast(error, 'danger');
        });

        socket.on('update-teams', (updatedTeams) => {
            // Find the team the user is on, or null
            const myTeam = updatedTeams.find(t => t.name === team?.name) || null;
            updateTeamInfo(myTeam);
        });

        /**
         * Displays a message in the collaboration area.
         */
        socket.on('message', (data) => {
            setChatMessages(prev => [...prev, data.message]);
        });

        /**
         * Updates the challenge progress list.
         */
        socket.on('progress-update', (update) => {
            setProgressListItems(prev => [...prev, update]);
        });

        /**
         * Updates the team score.
         */
        socket.on('score-update', (newScore) => {
            setScore(newScore);
        });

        /**
         * Updates the leaderboard.
         */
        socket.on('leaderboard-update', (newLeaderboard) => {
            setLeaderboard(newLeaderboard);
        });

        /**
         * Starts the challenge timer.
         */
        socket.on('start-timer', (startTime, duration, challengeName) => {
            setChallengeStartTime(startTime);
            setChallengeDuration(duration);
            setCurrentChallenge(challengeName);
        });

        /**
         * Ends the challenge.
         */
        socket.on('end-challenge', () => {
            clearInterval(timerInterval.current);
            setTimerDisplay('Challenge Ended!');
            showToast('The challenge has ended!', 'info');
            setCurrentChallenge("");
        });

        // --- Initialization ---
        const init = () => {
            socket.emit('get-user-team');
        };

        socket.on('user-team', (userTeam) => {
            setTeam(userTeam);
        });

        init();

        // Cleanup
        return () => {
            //  socket.disconnect(); //  disconnect
        };
    }, [socket, team?.name]);

    // --- Timer Logic (using useEffect and useRef) ---
    const timerInterval = useRef(null);

    useEffect(() => {
        if (challengeStartTime) {
            timerInterval.current = setInterval(() => {
                const now = new Date().getTime();
                const timePassed = Math.floor((now - challengeStartTime) / 1000);
                const timeLeft = Math.max(0, challengeDuration - timePassed);

                const minutes = Math.floor(timeLeft / 60);
                const seconds = timeLeft % 60;

                setTimerDisplay(`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);

                if (timeLeft <= 0) {
                    clearInterval(timerInterval.current);
                    setTimerDisplay('00:00');
                }
            }, 1000);
        }

        return () => {
            if (timerInterval.current) {
                clearInterval(timerInterval.current);
            }
        };
    }, [challengeStartTime, challengeDuration]);

    // Scroll to bottom of chat window on new message
    useEffect(() => {
        if (chatWindowRef.current) {
            chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
        }
    }, [chatMessages]);

    return (
        <div style={styles.container}>
            {/* Page Title */}
            <h1 style={styles.pageTitle}>
                Real-Time Collaborative Challenges
            </h1>

            {/* Team Management Section */}
            <section style={styles.section}>
                <div style={styles.flexRow}>
                    <h2 style={styles.sectionTitle}>Team Management</h2>
                    <div style={styles.buttonGroup}>
                        <input
                            type="text"
                            placeholder="Team Name"
                            value={teamNameInput}
                            onChange={(e) => setTeamNameInput(e.target.value)}
                            style={{
                                ...styles.input,
                                ...(inputFocus ? styles.inputFocus : {})
                            }}
                            onFocus={() => setInputFocus(true)}
                            onBlur={() => setInputFocus(false)}
                        />
                        <button
                            onClick={handleCreateTeam}
                            style={{
                                ...styles.buttonSuccess,
                                ...(createBtnHover ? styles.buttonSuccessHover : {})
                            }}
                            onMouseEnter={() => setCreateBtnHover(true)}
                            onMouseLeave={() => setCreateBtnHover(false)}
                        >
                            Create Team
                        </button>
                        <button
                            onClick={handleJoinTeam}
                            style={{
                                ...styles.buttonPrimary,
                                ...(joinBtnHover ? styles.buttonPrimaryHover : {})
                            }}
                            onMouseEnter={() => setJoinBtnHover(true)}
                            onMouseLeave={() => setJoinBtnHover(false)}
                        >
                            Join Team
                        </button>
                    </div>
                </div>
                {team ? (
                    <div style={styles.teamInfo}>
                        <p style={{ fontWeight: '600' }}>Team Name: <span id="team-name">{team.name}</span></p>
                        <p>Members: <span id="team-members">{team.members.join(', ')}</span></p>
                    </div>
                ) : (
                    <div style={styles.teamWarning}>
                        <p>You are not currently on a team. Create a team or join an existing one to participate.</p>
                    </div>
                )}
            </section>

            {/* Live Challenge Feed and Collaboration Area */}
            <section style={styles.section}>
                <h2 style={styles.sectionTitle}>Live Challenge</h2>
                {currentChallenge && (
                    <div style={styles.currentChallenge}>
                        Current Challenge: {currentChallenge}
                    </div>
                )}
                <div style={{ marginTop: '1.5rem' }}>
                    <div style={styles.gridContainer}>
                        <div>
                            <div style={styles.card}>
                                <h3 style={styles.cardTitle}>Challenge Progress</h3>
                                <ul id="progress-list" style={styles.progressList}>
                                    {progressListItems.map((item, index) => (
                                        <li key={index} style={styles.progressItem}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div>
                            <div style={styles.card}>
                                <h3 style={styles.cardTitle}>Team Chat</h3>
                                <div id="chat-window" style={styles.chatWindow} ref={chatWindowRef}>
                                    {chatMessages.map((message, index) => (
                                        <p key={index} style={styles.chatMessage}>{message}</p>
                                    ))}
                                </div>
                                <div style={styles.inputGroup}>
                                    <input
                                        type="text"
                                        placeholder="Type your message..."
                                        value={chatInput}
                                        onChange={(e) => setChatInput(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                handleSendMessage();
                                            }
                                        }}
                                        style={{
                                            ...styles.input,
                                            ...(chatInputFocus ? styles.inputFocus : {})
                                        }}
                                        onFocus={() => setChatInputFocus(true)}
                                        onBlur={() => setChatInputFocus(false)}
                                    />
                                    <button
                                        onClick={handleSendMessage}
                                        style={{
                                            ...styles.buttonPrimary,
                                            ...(sendBtnHover ? styles.buttonPrimaryHover : {})
                                        }}
                                        onMouseEnter={() => setSendBtnHover(true)}
                                        onMouseLeave={() => setSendBtnHover(false)}
                                    >
                                        Send
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Scoreboard and Leaderboard */}
            <section style={styles.section}>
                <h2 style={styles.sectionTitle}>Scoreboard and Leaderboard</h2>
                <div style={styles.gridContainer}>
                    <div>
                        <h3 style={styles.cardTitle}>Team Score</h3>
                        <div id="team-score" style={styles.scoreDisplay}>
                            {score}
                        </div>
                    </div>
                    <div>
                        <h3 style={styles.cardTitle}>Leaderboard</h3>
                        <ol id="leaderboard" style={styles.leaderboardList}>
                            {leaderboard.length > 0 ? (
                                leaderboard.map((team, index) => (
                                    <li key={index} style={styles.leaderboardItem}>{`${team.name}: ${team.score}`}</li>
                                ))
                            ) : (
                                <li style={styles.leaderboardItem}>No teams on the leaderboard yet</li>
                            )}
                        </ol>
                    </div>
                </div>
            </section>

            {/* Timer Section */}
            <section style={styles.section}>
                <h2 style={styles.sectionTitle}>Time Remaining</h2>
                <div id="timer" style={styles.timer}>
                    {timerDisplay}
                </div>
            </section>
        </div>
    );
};

export default RealTimeCollaborativeChallenges;