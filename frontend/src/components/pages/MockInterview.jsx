import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import "/src/App.css"; // Correct path to CSS

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
    const videoRef = useRef(null);
    const streamRef = useRef(null);

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
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setResponse("");
            setTimer(60);
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
    };

    return (
        <div className="mock-interview-container full-page">
            <header className="header">
                <Link to="/job-recommendation" className="job-recommendation-link">Job Recommendations</Link> {/* Link updated */}
                <h1>Mock Interview</h1>
            </header>
            <div className="interview-content full-height">
                <div className="video-section full-video">
                    <video ref={videoRef} autoPlay className="video-feed"></video>
                    <p className="timer">Time Left: {timer}s</p>
                    <div className="button-group">
                        {!isInterviewStarted ? (
                            <button onClick={startInterview} className="start-btn">Start Interview</button>
                        ) : (
                            <button onClick={stopInterview} className="stop-btn">Stop Interview</button>
                        )}
                    </div>
                </div>

                <div className="question-section full-width">
                    <div className="question-box">
                        <p className="question-label">Question:</p>
                        <p className="question-text">{questions[currentQuestionIndex]}</p>
                    </div>

                    <textarea
                        className="response-box large-input"
                        placeholder="Type your response here..."
                        value={response}
                        onChange={(e) => setResponse(e.target.value)}
                    ></textarea>

                    <div className="button-group">
                        <button onClick={submitAnswer} className="submit-btn">Submit Answer</button>
                        <button onClick={nextQuestion} className="next-btn">Next Question</button>
                    </div>
                </div>
            </div>

            <footer className="footer bottom-bar">
                <button onClick={stopInterview} className="exit-btn">Exit Interview</button>
                <button className="help-btn">Need Help?</button>
            </footer>
        </div>
    );
};

export default MockInterview;
