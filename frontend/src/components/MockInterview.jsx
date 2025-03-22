import React, { useState, useRef } from "react";

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
    const videoRef = useRef(null);
    const streamRef = useRef(null);

    // Function to start the webcam
    const startInterview = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            videoRef.current.srcObject = stream;
            streamRef.current = stream;
            setIsInterviewStarted(true);
        } catch (error) {
            alert("Error accessing webcam. Please allow permissions.");
        }
    };

    // Function to stop the webcam
    const stopInterview = () => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
        }
        setIsInterviewStarted(false);
    };

    // Move to the next question
    const nextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setResponse(""); // Clear previous response
        } else {
            alert("Interview Completed!");
        }
    };

    // Handle response submission
    const submitAnswer = () => {
        if (!response.trim()) {
            alert("Please enter your response before submitting.");
            return;
        }
        alert(`Response Submitted: ${response}`);
    };

    return (
        <div className="flex flex-col h-screen w-screen bg-gray-100">
            {/* Top Bar */}
            <header className="bg-blue-600 text-white text-xl font-bold py-4 text-center">
                Mock Interview
            </header>

            {/* Main Content */}
            <div className="flex-grow flex flex-col md:flex-row justify-center items-center p-6">
                {/* Video Section */}
                <div className="w-full md:w-1/2 p-4 flex flex-col items-center">
                    <video ref={videoRef} autoPlay className="border rounded-lg w-full h-80 md:h-96"></video>
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

                {/* Question & Response Section */}
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

            {/* Bottom Bar */}
            <footer className="bg-gray-800 text-white py-3 text-center">
                <button className="px-4 py-2 bg-red-500 rounded-lg mx-2">Exit Interview</button>
                <button className="px-4 py-2 bg-yellow-500 rounded-lg mx-2">Need Help?</button>
            </footer>
        </div>
    );
};

export default MockInterview;
