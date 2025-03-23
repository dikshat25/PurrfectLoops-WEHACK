import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Only import useNavigate

const questions = [
    "Why should we hire you?",
    "Describe a time you solved a problem under pressure.",
    "Where do you see yourself in 5 years?",
    "What are your strengths and weaknesses?",
    "Tell me about a project you worked on that you're proud of."
];

const MockInterview = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [response, setResponse] = useState("");
    const [isInterviewStarted, setIsInterviewStarted] = useState(false);
    const [timer, setTimer] = useState(60);
    const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
    const [showHelp, setShowHelp] = useState(false);
    const videoRef = useRef(null);
    const streamRef = useRef(null);
    const navigate = useNavigate(); // Initialize the navigate function

    // Start Interview - Access Webcam
    const startInterview = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            videoRef.current.srcObject = stream;
            streamRef.current = stream;
            setIsInterviewStarted(true);
            setTimer(60);
        } catch (error) {
            alert("Error accessing webcam. Please allow permissions.");
        }
    };

    // Stop Interview - Release Webcam Resources
    const stopInterview = () => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
        }
        setIsInterviewStarted(false);
    };

    useEffect(() => {
        if (isInterviewStarted && timer > 0) {
            const countdown = setInterval(() => setTimer((prev) => prev - 1), 1000);
            return () => clearInterval(countdown);
        }
        if (timer === 0) {
            stopInterview();
            alert("Time's up! Interview has ended.");
        }
    }, [isInterviewStarted, timer]);

    // Move to next question
    const nextQuestion = () => {
        if (!isAnswerSubmitted) {
            alert("Please submit your answer before moving to the next question.");
            return;
        }
        
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setResponse("");
            setTimer(60);
            setIsAnswerSubmitted(false);
        } else {
            alert("Interview Completed!");
            stopInterview();
        }
    };

    // Simulated AI Feedback
    const submitAnswer = () => {
        if (!response.trim()) {
            alert("Please enter your response before submitting.");
            return;
        }
        const feedback = [
            "Good response! Try to elaborate more.",
            "Your answer could be more structured.",
            "Great confidence! Try to be more concise."
        ];
        alert(`Response Submitted: ${response}\nFeedback: ${feedback[Math.floor(Math.random() * feedback.length)]}`);
        setIsAnswerSubmitted(true);
    };

    // Navigate back to previous page
    const handleExit = () => {
        stopInterview(); // Make sure to release camera resources
        navigate(-1); // Navigate back to the previous page
    };

    // Toggle help modal
    const toggleHelp = () => {
        setShowHelp(!showHelp);
    };

    // Help content
    const helpContent = {
        title: "Interview Tips",
        tips: [
            "Speak clearly and maintain eye contact with the camera",
            "Use the STAR method (Situation, Task, Action, Result) for behavioral questions",
            "Take a moment to gather your thoughts before answering",
            "Keep your answers concise and relevant",
            "Include specific examples from your experience when possible"
        ],
        buttonInstructions: "Click 'Submit Answer' after completing your response, then 'Next Question' to continue"
    };

    // Inline styles
    const styles = {
        container: {
            fontFamily: "'Roboto', sans-serif",
            display: 'flex',
            flexDirection: 'column',
            height: '100vh',
            background: 'linear-gradient(135deg, #f5f7fa 0%, #e4edf9 100%)',
            color: '#333',
            margin: 0,
            padding: 0,
            boxSizing: 'border-box',
        },
        header: {
            background: '#2c3e50',
            color: 'white',
            padding: '1rem',
            display: 'flex',
            justifyContent: 'center', // Center the title
            alignItems: 'center',
            boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
        },
        title: {
            margin: 0,
            fontSize: '1.8rem',
            fontWeight: 'bold',
            textAlign: 'center',
        },
        content: {
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            padding: '2rem',
            gap: '2rem',
            overflow: 'auto',
        },
        videoSection: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            backgroundColor: '#fff',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            padding: '1.5rem',
            marginBottom: '1rem',
        },
        videoFeed: {
            width: '100%',
            maxWidth: '640px',
            height: '360px',
            backgroundColor: '#000',
            borderRadius: '8px',
            objectFit: 'cover',
            marginBottom: '1rem',
            boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
        },
        timer: {
            fontSize: '1.2rem',
            fontWeight: 'bold',
            color: timer < 10 ? '#e74c3c' : '#333',
            backgroundColor: timer < 10 ? 'rgba(231, 76, 60, 0.1)' : 'transparent',
            padding: timer < 10 ? '0.5rem 1rem' : '0.5rem',
            borderRadius: '4px',
            marginBottom: '1rem',
            transition: 'all 0.3s ease',
        },
        buttonGroup: {
            display: 'flex',
            gap: '1rem',
            marginTop: '1rem',
            width: '100%',
            justifyContent: 'center',
        },
        button: {
            padding: '0.75rem 1.5rem',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'bold',
            border: 'none',
            transition: 'all 0.2s ease',
            fontSize: '1rem',
        },
        startButton: {
            backgroundColor: '#2ecc71',
            color: 'white',
            boxShadow: '0 2px 5px rgba(46, 204, 113, 0.4)',
        },
        stopButton: {
            backgroundColor: '#e74c3c',
            color: 'white',
            boxShadow: '0 2px 5px rgba(231, 76, 60, 0.4)',
        },
        questionSection: {
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
        },
        questionBox: {
            backgroundColor: '#fff',
            borderRadius: '8px',
            padding: '1.5rem',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        },
        questionLabel: {
            fontWeight: 'bold',
            fontSize: '1rem',
            color: '#7f8c8d',
            marginBottom: '0.5rem',
            textTransform: 'uppercase',
        },
        questionText: {
            fontSize: '1.4rem',
            fontWeight: '500',
            color: '#2c3e50',
            margin: 0,
        },
        responseBox: {
            width: '100%',
            height: '150px',
            padding: '1rem',
            borderRadius: '8px',
            border: '1px solid #ddd',
            fontSize: '1rem',
            resize: 'vertical',
            fontFamily: 'inherit',
            backgroundColor: '#fff',
            boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.1)',
            transition: 'border 0.3s ease, box-shadow 0.3s ease',
        },
        submitButton: {
            backgroundColor: '#3498db',
            color: 'white',
            boxShadow: '0 2px 5px rgba(26, 154, 240, 0.4)',
        },
        nextButton: {
            backgroundColor: '#9b59b6',
            color: 'white',
            boxShadow: '0 2px 5px rgba(155, 89, 182, 0.4)',
            opacity: isAnswerSubmitted ? 1 : 0.6,
            cursor: isAnswerSubmitted ? 'pointer' : 'not-allowed',
        },
        footer: {
            display: 'flex',
            justifyContent: 'space-between',
            padding: '1rem 2rem',
            backgroundColor: '#2c3e50',
            color: 'white',
        },
        exitButton: {
            backgroundColor: '#e74c3c',
            color: 'white',
            boxShadow: '0 2px 5px rgba(231, 76, 60, 0.4)',
        },
        helpButton: {
            backgroundColor: '#f39c12',
            color: 'white',
            boxShadow: '0 2px 5px rgba(243, 156, 18, 0.4)',
        },
        progressBar: {
            width: '100%',
            height: '8px',
            backgroundColor: '#ecf0f1',
            borderRadius: '4px',
            overflow: 'hidden',
            marginBottom: '1rem',
        },
        progressFill: {
            height: '100%',
            backgroundColor: '#3498db',
            width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`,
            transition: 'width 0.3s ease',
        },
        questionCounter: {
            textAlign: 'center',
            marginBottom: '1rem',
            color: '#7f8c8d',
            fontSize: '0.9rem',
        },
        helpModal: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.7)',
            display: showHelp ? 'flex' : 'none',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
        },
        helpContent: {
            backgroundColor: '#fff',
            borderRadius: '8px',
            width: '80%',
            maxWidth: '600px',
            padding: '2rem',
            boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
        },
        helpTitle: {
            fontSize: '1.8rem',
            color: '#2c3e50',
            marginTop: 0,
            marginBottom: '1.5rem',
            borderBottom: '2px solid #3498db',
            paddingBottom: '0.5rem',
        },
        helpTipsList: {
            listStyleType: 'circle',
            paddingLeft: '1.5rem',
        },
        helpTipItem: {
            margin: '0.7rem 0',
            fontSize: '1.1rem',
            color: '#34495e',
            lineHeight: '1.4',
        },
        helpInstructions: {
            marginTop: '1.5rem',
            padding: '1rem',
            backgroundColor: '#f8f9fa',
            borderRadius: '6px',
            borderLeft: '4px solid #3498db',
        },
        closeHelpButton: {
            display: 'block',
            marginTop: '1.5rem',
            marginLeft: 'auto',
            padding: '0.6rem 1.2rem',
            backgroundColor: '#3498db',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'bold',
            transition: 'all 0.2s ease',
        },
    };

    // Hover styles (applied via inline functions)
    const applyHoverStyle = (e, style) => {
        Object.assign(e.target.style, style);
    };

    const removeHoverStyle = (e, originalStyle) => {
        Object.assign(e.target.style, originalStyle);
    };

    return (
        <div style={styles.container}>
            <header style={styles.header}>
                <h1 style={styles.title}>Mock Interview</h1>
            </header>
            
            <div style={styles.content}>
                {/* Progress indicator */}
                <div>
                    <div style={styles.progressBar}>
                        <div style={styles.progressFill}></div>
                    </div>
                    <div style={styles.questionCounter}>
                        Question {currentQuestionIndex + 1} of {questions.length}
                    </div>
                </div>

                <div style={styles.videoSection}>
                    <video 
                        ref={videoRef} 
                        autoPlay 
                        style={styles.videoFeed}
                    ></video>
                    <p style={styles.timer}>Time Left: {timer}s</p>
                    <div style={styles.buttonGroup}>
                        {!isInterviewStarted ? (
                            <button 
                                onClick={startInterview} 
                                style={{...styles.button, ...styles.startButton}}
                                onMouseOver={(e) => applyHoverStyle(e, { transform: 'translateY(-2px)', boxShadow: '0 4px 8px rgba(46, 204, 113, 0.6)' })}
                                onMouseOut={(e) => removeHoverStyle(e, { transform: 'translateY(0)', boxShadow: '0 2px 5px rgba(46, 204, 113, 0.4)' })}
                            >
                                Start Interview
                            </button>
                        ) : (
                            <button 
                                onClick={stopInterview} 
                                style={{...styles.button, ...styles.stopButton}}
                                onMouseOver={(e) => applyHoverStyle(e, { transform: 'translateY(-2px)', boxShadow: '0 4px 8px rgba(231, 76, 60, 0.6)' })}
                                onMouseOut={(e) => removeHoverStyle(e, { transform: 'translateY(0)', boxShadow: '0 2px 5px rgba(231, 76, 60, 0.4)' })}
                            >
                                Stop Interview
                            </button>
                        )}
                    </div>
                </div>

                <div style={styles.questionSection}>
                    <div style={styles.questionBox}>
                        <p style={styles.questionLabel}>Question:</p>
                        <p style={styles.questionText}>{questions[currentQuestionIndex]}</p>
                    </div>

                    <textarea
                        style={styles.responseBox}
                        placeholder="Type your response here..."
                        value={response}
                        onChange={(e) => setResponse(e.target.value)}
                        onFocus={(e) => applyHoverStyle(e, { border: '1px solid #3498db', boxShadow: 'inset 0 1px 3px rgba(52, 152, 219, 0.3)' })}
                        onBlur={(e) => removeHoverStyle(e, { border: '1px solid #ddd', boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.1)' })}
                    ></textarea>

                    <div style={styles.buttonGroup}>
                        <button 
                            onClick={submitAnswer} 
                            style={{...styles.button, ...styles.submitButton}}
                            onMouseOver={(e) => applyHoverStyle(e, { transform: 'translateY(-2px)', boxShadow: '0 4px 8px rgba(52, 152, 219, 0.6)' })}
                            onMouseOut={(e) => removeHoverStyle(e, { transform: 'translateY(0)', boxShadow: '0 2px 5px rgba(52, 152, 219, 0.4)' })}
                        >
                            Submit Answer
                        </button>
                        <button 
                            onClick={nextQuestion} 
                            style={{...styles.button, ...styles.nextButton}}
                            onMouseOver={(e) => {
                                if (isAnswerSubmitted) {
                                    applyHoverStyle(e, { transform: 'translateY(-2px)', boxShadow: '0 4px 8px rgba(155, 89, 182, 0.6)' })
                                }
                            }}
                            onMouseOut={(e) => {
                                if (isAnswerSubmitted) {
                                    removeHoverStyle(e, { transform: 'translateY(0)', boxShadow: '0 2px 5px rgba(155, 89, 182, 0.4)' })
                                }
                            }}
                        >
                            Next Question
                        </button>
                    </div>
                </div>
            </div>

            <footer style={styles.footer}>
                <button 
                    onClick={handleExit} 
                    style={{...styles.button, ...styles.exitButton}}
                    onMouseOver={(e) => applyHoverStyle(e, { transform: 'translateY(-2px)', boxShadow: '0 4px 8px rgba(231, 76, 60, 0.6)' })}
                    onMouseOut={(e) => removeHoverStyle(e, { transform: 'translateY(0)', boxShadow: '0 2px 5px rgba(231, 76, 60, 0.4)' })}
                >
                    Exit Interview
                </button>
                <button 
                    onClick={toggleHelp}
                    style={{...styles.button, ...styles.helpButton}}
                    onMouseOver={(e) => applyHoverStyle(e, { transform: 'translateY(-2px)', boxShadow: '0 4px 8px rgba(243, 156, 18, 0.6)' })}
                    onMouseOut={(e) => removeHoverStyle(e, { transform: 'translateY(0)', boxShadow: '0 2px 5px rgba(243, 156, 18, 0.4)' })}
                >
                    Need Help?
                </button>
            </footer>

            {/* Help Modal */}
            <div style={styles.helpModal}>
                <div style={styles.helpContent}>
                    <h2 style={styles.helpTitle}>{helpContent.title}</h2>
                    <ul style={styles.helpTipsList}>
                        {helpContent.tips.map((tip, index) => (
                            <li key={index} style={styles.helpTipItem}>{tip}</li>
                        ))}
                    </ul>
                    <div style={styles.helpInstructions}>
                        <p>{helpContent.buttonInstructions}</p>
                    </div>
                    <button 
                        onClick={toggleHelp} 
                        style={styles.closeHelpButton}
                        onMouseOver={(e) => applyHoverStyle(e, { backgroundColor: '#2980b9' })}
                        onMouseOut={(e) => removeHoverStyle(e, { backgroundColor: '#3498db' })}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MockInterview;