import React, { useState, useRef, useEffect } from "react";

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
        <div className="flex flex-col min-h-screen bg-gray-100">
            <header className="bg-blue-600 text-white text-xl font-bold py-4 text-center">
                Mock Interview
            </header>

            <div className="flex-grow flex flex-col md:flex-row items-center p-6">
                <div className="w-full md:w-1/2 p-4 flex flex-col items-center">
                    <video ref={videoRef} autoPlay className="border rounded-lg w-full h-80 md:h-96"></video>
                    <p className="mt-2 text-lg font-bold text-red-600">Time Left: {timer}s</p>
                    <div className="flex gap-4 mt-4">
                        {!isInterviewStarted ? (
                            <button onClick={startInterview} className="bg-blue-600 text-white px-4 py-2 rounded-lg">
                                Start Interview
                            </button>
                        ) : (
                            <button onClick={stopInterview} className="bg-red-600 text-white px-4 py-2 rounded-lg">
                                Stop Interview
                            </button>
                        )}
                    </div>
                </div>

                <div className="w-full md:w-1/2 p-4">
                    <div className="bg-white shadow-md rounded-lg p-6">
                        <p className="text-lg font-semibold">Question:</p>
                        <p className="text-gray-700">{questions[currentQuestionIndex]}</p>
                    </div>

                    <textarea
                        className="border rounded-lg w-full p-3 mt-4 h-32"
                        placeholder="Type your response here..."
                        value={response}
                        onChange={(e) => setResponse(e.target.value)}
                    ></textarea>

                    <div className="flex gap-4 mt-4">
                        <button onClick={submitAnswer} className="bg-green-600 text-white px-4 py-2 rounded-lg">
                            Submit Answer
                        </button>
                        <button onClick={nextQuestion} className="bg-gray-600 text-white px-4 py-2 rounded-lg">
                            Next Question
                        </button>
                    </div>
                </div>
            </div>

            <footer className="bg-gray-800 text-white py-3 text-center">
                <button className="px-4 py-2 bg-red-500 rounded-lg mx-2">Exit Interview</button>
                <button className="px-4 py-2 bg-yellow-500 rounded-lg mx-2">Need Help?</button>
            </footer>
        </div>
    );
};

export default MockInterview;
