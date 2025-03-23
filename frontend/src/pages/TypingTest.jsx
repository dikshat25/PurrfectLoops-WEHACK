import React, { useState, useEffect, useRef, useCallback } from 'react';
import { CheckCircle, XCircle, Clock, RefreshCw, Play, Award } from 'lucide-react';

// Internal CSS styles object
const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(to bottom right, #0f172a, #4c1d95, #000000)',
    padding: '2rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: "'Inter', sans-serif",
  },
  wrapper: {
    maxWidth: '800px',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem',
  },
  header: {
    textAlign: 'center',
    marginBottom: '1rem',
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: '800',
    background: 'linear-gradient(to right, #60a5fa, #a78bfa, #ec4899)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    marginBottom: '0.5rem',
    textShadow: '0 0 20px rgba(123, 97, 255, 0.3)',
  },
  subtitle: {
    color: '#94a3b8',
    fontSize: '1rem',
  },
  mainCard: {
    background: 'rgba(15, 23, 42, 0.7)',
    backdropFilter: 'blur(12px)',
    borderRadius: '1rem',
    padding: '1.5rem',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
  },
  statsBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1.5rem',
    flexWrap: 'wrap',
    gap: '1rem',
  },
  timer: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '1.5rem',
    fontWeight: '600',
  },
  timerNormal: {
    color: '#2dd4bf',
  },
  timerWarning: {
    color: '#facc15',
  },
  timerDanger: {
    color: '#f87171',
  },
  statsGroup: {
    display: 'flex',
    gap: '1.5rem',
  },
  statItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  statLabel: {
    color: '#94a3b8',
    fontSize: '0.875rem',
    marginBottom: '0.25rem',
  },
  statValue: {
    fontSize: '1.25rem',
    fontWeight: '700',
    color: 'white',
  },
  green: {
    color: '#4ade80',
  },
  yellow: {
    color: '#facc15',
  },
  red: {
    color: '#f87171',
  },
  textDisplayContainer: {
    position: 'relative',
    marginBottom: '1.5rem',
  },
  textDisplay: {
    fontSize: '1.125rem',
    lineHeight: '1.8',
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
    minHeight: '120px',
    maxHeight: '240px',
    overflow: 'auto',
    padding: '1.25rem',
    borderRadius: '0.75rem',
    backgroundColor: 'rgba(15, 23, 42, 0.9)',
    border: '1px solid rgba(55, 65, 81, 0.7)',
    boxShadow: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.3)',
  },
  overlay: {
    position: 'absolute',
    inset: '0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backdropFilter: 'blur(4px)',
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    borderRadius: '0.75rem',
  },
  charCorrect: {
    color: '#4ade80',
  },
  charIncorrect: {
    color: '#f87171',
  },
  charUntyped: {
    color: '#94a3b8',
  },
  cursor: {
    position: 'relative',
  },
  cursorLine: {
    position: 'absolute',
    bottom: '0',
    left: '0',
    width: '100%',
    height: '2px',
    backgroundColor: '#a855f7',
  },
  cursorPulse: {
    animation: 'pulse 1.5s infinite',
  },
  input: {
    width: '100%',
    padding: '1rem',
    fontSize: '1.125rem',
    color: 'white',
    backgroundColor: 'rgba(30, 41, 59, 0.7)',
    borderRadius: '0.75rem',
    border: '1px solid rgba(75, 85, 99, 0.7)',
    outline: 'none',
    transition: 'all 0.3s ease',
    marginBottom: '1.5rem',
  },
  inputFocus: {
    borderColor: '#a855f7',
    boxShadow: '0 0 0 2px rgba(168, 85, 247, 0.3)',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#8b5cf6',
    color: 'white',
    fontWeight: '600',
    padding: '0.75rem 1.5rem',
    borderRadius: '9999px',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 10px 15px -3px rgba(139, 92, 246, 0.3)',
  },
  buttonHover: {
    backgroundColor: '#7c3aed',
    transform: 'translateY(-2px)',
    boxShadow: '0 15px 20px -3px rgba(139, 92, 246, 0.4)',
  },
  startButton: {
    backgroundColor: '#3b82f6',
    boxShadow: '0 10px 15px -3px rgba(59, 130, 246, 0.3)',
  },
  startButtonHover: {
    backgroundColor: '#2563eb',
    boxShadow: '0 15px 20px -3px rgba(59, 130, 246, 0.4)',
  },
  statusBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.5rem 1rem',
    borderRadius: '9999px',
    backgroundColor: 'rgba(30, 41, 59, 0.7)',
    border: '1px solid rgba(75, 85, 99, 0.5)',
  },
  resultsCard: {
    background: 'rgba(15, 23, 42, 0.7)',
    backdropFilter: 'blur(12px)',
    borderRadius: '1rem',
    padding: '1.5rem',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
  },
  resultsHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1.5rem',
  },
  resultsTitle: {
    fontSize: '1.5rem',
    fontWeight: '700',
    background: 'linear-gradient(to right, #facc15, #ec4899)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  resultsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '1rem',
  },
  resultCard: {
    backgroundColor: 'rgba(30, 41, 59, 0.5)',
    borderRadius: '0.75rem',
    padding: '1rem',
    border: '1px solid rgba(75, 85, 99, 0.4)',
    boxShadow: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.1)',
  },
  resultLabel: {
    color: '#94a3b8',
    fontSize: '0.875rem',
    marginBottom: '0.5rem',
  },
  resultValue: {
    fontSize: '1.75rem',
    fontWeight: '700',
    color: 'white',
  },
  resultSubtext: {
    color: '#64748b',
    fontSize: '0.75rem',
    marginTop: '0.25rem',
  },
  '@keyframes pulse': {
    '0%, 100%': {
      opacity: 1,
    },
    '50%': {
      opacity: 0.4,
    },
  },
};

// Sample text for the typing test
const sampleText = `The quick brown fox jumps over the lazy dog. A journey of a thousand miles begins with a single step. The only way to do great work is to love what you do. All that glitters is not gold. To be or not to be, that is the question.`;

const TypingTest = () => {
    const [text, setText] = useState(sampleText);
    const [input, setInput] = useState('');
    const [timeRemaining, setTimeRemaining] = useState(60); // 60 seconds
    const [isRunning, setIsRunning] = useState(false);
    const [testDone, setTestDone] = useState(false);
    const [correctChars, setCorrectChars] = useState(0);
    const [incorrectChars, setIncorrectChars] = useState(0);
    const [totalChars, setTotalChars] = useState(0);
    const [wpm, setWpm] = useState(0);
    const [currentCharIndex, setCurrentCharIndex] = useState(0);
    const inputRef = useRef(null);
    const [testStarted, setTestStarted] = useState(false);
    const [accuracy, setAccuracy] = useState(100);
    const [showPulse, setShowPulse] = useState(false);
    const [inputFocused, setInputFocused] = useState(false);
    const [buttonHover, setButtonHover] = useState(false);
    const [startButtonHover, setStartButtonHover] = useState(false);

    // Reset the test to initial state
    const resetTest = useCallback(() => {
        setText(sampleText);
        setInput('');
        setTimeRemaining(60);
        setIsRunning(false);
        setTestDone(false);
        setCorrectChars(0);
        setIncorrectChars(0);
        setTotalChars(0);
        setWpm(0);
        setCurrentCharIndex(0);
        setTestStarted(false);
        setAccuracy(100);
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    // Start the test and focus on input
    const startTest = () => {
        setIsRunning(true);
        setTestStarted(true);
        setShowPulse(true);
        setTimeout(() => setShowPulse(false), 1000);
        
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    // Handle input changes, update counters
    const handleInputChange = (e) => {
        const value = e.target.value;
        
        if (!isRunning && !testDone) {
            startTest();
        }
        
        setInput(value);
        
        const typedChar = value[value.length - 1];
        const expectedChar = text[value.length - 1];
        
        setCurrentCharIndex(value.length);
        setTotalChars(value.length);
        
        if (typedChar === expectedChar) {
            setCorrectChars(prev => prev + 1);
        } else {
            setIncorrectChars(prev => prev + 1);
        }
        
        // Calculate accuracy
        const calculatedAccuracy = value.length > 0 
            ? Math.round((correctChars / value.length) * 100) 
            : 100;
        setAccuracy(calculatedAccuracy);
        
        if (value === text) {
            setTestDone(true);
            setIsRunning(false);
        }
    };

    // Calculate words per minute
    const calculateWPM = useCallback(() => {
        const words = correctChars / 5; // Standard: 5 characters = 1 word
        const timeInMinutes = (60 - timeRemaining) / 60;
        const calculatedWpm = timeInMinutes > 0 ? Math.floor(words / timeInMinutes) : 0;
        setWpm(calculatedWpm);
    }, [correctChars, timeRemaining]);

    // Timer effect
    useEffect(() => {
        if (isRunning) {
            const timer = setInterval(() => {
                setTimeRemaining(prev => {
                    if (prev <= 1) {
                        setIsRunning(false);
                        setTestDone(true);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [isRunning]);

    // Calculate WPM when test is done or time runs out
    useEffect(() => {
        if (testDone || timeRemaining === 0) {
            calculateWPM();
        }
    }, [testDone, timeRemaining, calculateWPM]);

    // Focus on input when component mounts
    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    // Calculate WPM during the test for live feedback
    useEffect(() => {
        if (isRunning) {
            calculateWPM();
        }
    }, [correctChars, isRunning, calculateWPM]);

    const getHighlightedText = () => {
        return text.split('').map((char, index) => {
            let style = {...styles.charUntyped};
            
            if (index < input.length) {
                if (char === input[index]) {
                    style = {...styles.charCorrect};
                } else {
                    style = {...styles.charIncorrect};
                }
            }
            
            // Add cursor effect
            if (index === currentCharIndex) {
                return (
                    <span key={index} style={{...style, ...styles.cursor}}>
                        {char}
                        <span 
                            style={{
                                ...styles.cursorLine,
                                ...(showPulse ? styles.cursorPulse : {})
                            }}
                        ></span>
                    </span>
                );
            }
            
            return <span key={index} style={style}>{char}</span>;
        });
    };

    const getTimerStyle = () => {
        if (timeRemaining <= 10) return {...styles.timer, ...styles.timerDanger};
        if (timeRemaining <= 30) return {...styles.timer, ...styles.timerWarning};
        return {...styles.timer, ...styles.timerNormal};
    };

    const getAccuracyStyle = () => {
        if (accuracy >= 95) return styles.green;
        if (accuracy >= 80) return styles.yellow;
        return styles.red;
    };

    return (
        <div style={styles.container}>
            <div style={styles.wrapper}>
                <div style={styles.header}>
                    <h1 style={styles.title}>Speed Typing Test</h1>
                    {!testStarted && (
                        <p style={styles.subtitle}>
                            Improve your typing speed and accuracy. Click "Start Test" or just start typing.
                        </p>
                    )}
                </div>

                <div style={styles.mainCard}>
                    <div style={styles.statsBar}>
                        {isRunning && (
                            <div style={getTimerStyle()}>
                                <Clock size={20} />
                                <span>{timeRemaining}s</span>
                            </div>
                        )}
                        
                        {isRunning && (
                            <div style={styles.statsGroup}>
                                <div style={styles.statItem}>
                                    <div style={styles.statLabel}>WPM</div>
                                    <div style={styles.statValue}>{wpm}</div>
                                </div>
                                <div style={styles.statItem}>
                                    <div style={styles.statLabel}>Accuracy</div>
                                    <div style={{...styles.statValue, ...getAccuracyStyle()}}>{accuracy}%</div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div style={styles.textDisplayContainer}>
                        <div style={styles.textDisplay}>
                            {getHighlightedText()}
                        </div>
                        
                        {!isRunning && !testDone && !testStarted && (
                            <div style={styles.overlay}>
                                <button
                                    onClick={startTest}
                                    style={{
                                        ...styles.button, 
                                        ...styles.startButton,
                                        ...(startButtonHover ? styles.startButtonHover : {})
                                    }}
                                    onMouseEnter={() => setStartButtonHover(true)}
                                    onMouseLeave={() => setStartButtonHover(false)}
                                >
                                    <Play size={18} />
                                    Start Test
                                </button>
                            </div>
                        )}
                    </div>

                    <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={handleInputChange}
                        placeholder={isRunning ? "Type the text exactly as shown above..." : "Click 'Start Test' or just start typing..."}
                        disabled={testDone}
                        style={{
                            ...styles.input,
                            ...(inputFocused ? styles.inputFocus : {})
                        }}
                        onFocus={() => setInputFocused(true)}
                        onBlur={() => setInputFocused(false)}
                    />

                    <div style={styles.buttonContainer}>
                        {testDone && (
                            <button
                                onClick={resetTest}
                                style={{
                                    ...styles.button,
                                    ...(buttonHover ? styles.buttonHover : {})
                                }}
                                onMouseEnter={() => setButtonHover(true)}
                                onMouseLeave={() => setButtonHover(false)}
                            >
                                <RefreshCw size={18} />
                                Try Again
                            </button>
                        )}

                        {testDone && (
                            <div style={styles.statusBadge}>
                                {input === text ? (
                                    <>
                                        <CheckCircle size={20} color="#4ade80" />
                                        <span style={styles.green}>Completed!</span>
                                    </>
                                ) : (
                                    <>
                                        <XCircle size={20} color="#f87171" />
                                        <span style={styles.red}>Incomplete</span>
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {testDone && (
                    <div style={styles.resultsCard}>
                        <div style={styles.resultsHeader}>
                            <h2 style={styles.resultsTitle}>Your Results</h2>
                            <Award size={24} color="#facc15" />
                        </div>
                        
                        <div style={styles.resultsGrid}>
                            <div style={styles.resultCard}>
                                <div style={styles.resultLabel}>Words Per Minute</div>
                                <div style={styles.resultValue}>{wpm}</div>
                            </div>
                            
                            <div style={styles.resultCard}>
                                <div style={styles.resultLabel}>Accuracy</div>
                                <div style={{
                                    ...styles.resultValue,
                                    ...(accuracy >= 95 ? styles.green : 
                                       accuracy >= 80 ? styles.yellow : styles.red)
                                }}>{accuracy}%</div>
                            </div>
                            
                            <div style={styles.resultCard}>
                                <div style={styles.resultLabel}>Time Used</div>
                                <div style={styles.resultValue}>{60 - timeRemaining}s</div>
                            </div>
                            
                            <div style={styles.resultCard}>
                                <div style={styles.resultLabel}>Characters</div>
                                <div style={styles.resultValue}>
                                    <span style={styles.green}>{correctChars}</span>
                                    <span style={{color: '#64748b'}}> / </span>
                                    <span style={styles.red}>{incorrectChars}</span>
                                </div>
                                <div style={styles.resultSubtext}>correct / incorrect</div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TypingTest;