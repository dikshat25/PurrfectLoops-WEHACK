import React, { useState, useRef, useCallback, useEffect } from 'react';
import Webcam from 'react-webcam';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';
import { AlertCircle, Mic, MicOff, Video, VideoOff, Check, X, Play, Square, Send, Clock, HelpCircle, Download, ChevronRight, ChevronDown, ChevronUp, BarChart2 } from 'lucide-react';

const VideoAnalysis = () => {
  // State variables
  const [isRecording, setIsRecording] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [videoURL, setVideoURL] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState(null);
  const [realTimeData, setRealTimeData] = useState([]);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [cameraEnabled, setCameraEnabled] = useState(true);
  const [micEnabled, setMicEnabled] = useState(true);
  const [showTips, setShowTips] = useState(false);
  const [showDetailedAnalysis, setShowDetailedAnalysis] = useState(false);
  const [countdownValue, setCountdownValue] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Refs
  const webcamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const timerRef = useRef(null);

  // Mock data for filler words chart
  const fillerWordsData = [
    { name: 'Um', count: 7 },
    { name: 'Like', count: 3 },
    { name: 'You know', count: 2 },
  ];

  // Mock function to simulate real-time analysis
  useEffect(() => {
    if (isRecording) {
      const interval = setInterval(() => {
        setRealTimeData(prevData => {
          const newPoint = {
            time: prevData.length,
            confidence: Math.min(85, Math.random() * 30 + (prevData.length * 2)),
            speed: Math.random() * 20 + 120
          };
          return [...prevData, newPoint];
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isRecording]);

  // Timer effect for recording duration
  useEffect(() => {
    if (isRecording) {
      timerRef.current = setInterval(() => {
        setElapsedTime(prev => prev + 1);
      }, 1000);
    } else if (!isRecording && timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRecording]);

  // Countdown effect before recording starts
  const startCountdown = () => {
    setCountdownValue(3);
    const countdownTimer = setInterval(() => {
      setCountdownValue(prev => {
        if (prev <= 1) {
          clearInterval(countdownTimer);
          handleStartRecording();
          return null;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Function to format seconds into MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Function to handle recording start
  const handleStartRecording = useCallback(() => {
    setIsRecording(true);
    setRealTimeData([]);
    setError(null);
    setVideoURL(null);
    setRecordedChunks([]);
    setAnalysisResults(null);
    setElapsedTime(0);
    setSubmitSuccess(false);
    
    if (webcamRef.current && webcamRef.current.stream) {
      mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
        mimeType: 'video/webm'
      });
      
      mediaRecorderRef.current.addEventListener('dataavailable', handleDataAvailable);
      mediaRecorderRef.current.addEventListener('stop', handleStopRecording);
      mediaRecorderRef.current.start();
    } else {
      setError('Cannot access webcam. Please ensure you have granted camera permission.');
    }
  }, [webcamRef]);

  // Function to handle recording stop
  const handleStopRecording = useCallback(() => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
    setIsRecording(false);
    setAnalyzing(true);

    // Simulate backend analysis delay
    setTimeout(() => {
      setAnalysisResults({
        confidence: 76,
        sentiment: 'Positive',
        keywords: ['teamwork', 'leadership', 'communication', 'problem-solving', 'adaptability'],
        fillerWords: {
          count: 12,
          words: ['um', 'like', 'you know']
        },
        speakingSpeed: {
          wpm: 145,
          assessment: 'Good pace'
        },
        eyeContact: {
          score: 82,
          assessment: 'Strong'
        },
        posture: {
          score: 75,
          assessment: 'Good'
        },
        gestures: {
          score: 68,
          assessment: 'Natural'
        }
      });
      setAnalyzing(false);
    }, 2000);
  }, [mediaRecorderRef]);

  // Function to handle data chunks from recording
  const handleDataAvailable = useCallback(({ data }) => {
    if (data.size > 0) {
      setRecordedChunks(prev => [...prev, data]);
    }
  }, []);

  // Function to create video URL when recording is complete
  useEffect(() => {
    if (recordedChunks.length > 0 && !isRecording) {
      const blob = new Blob(recordedChunks, {
        type: 'video/webm'
      });
      const url = URL.createObjectURL(blob);
      setVideoURL(url);
    }
  }, [recordedChunks, isRecording]);

  // Function to submit video for backend review
  const handleSubmitVideo = async () => {
    if (!recordedChunks.length) {
      setError('No video recorded. Please record a video first.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Success response
      setSubmitSuccess(true);
      setIsSubmitting(false);
    } catch (err) {
      setError('Failed to submit video. Please try again.');
      setIsSubmitting(false);
    }
  };

  // Function to download recorded video
  const handleDownload = () => {
    if (recordedChunks.length) {
      const blob = new Blob(recordedChunks, {
        type: 'video/webm'
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      document.body.appendChild(a);
      a.style = 'display: none';
      a.href = url;
      a.download = `interview-recording-${new Date().toISOString()}.webm`;
      a.click();
      window.URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 bg-gray-50 min-h-screen">
      <header className="mb-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Video Interview Analysis</h1>
        <div className="flex space-x-2 text-sm">
          <button 
            className="flex items-center gap-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-md transition"
            onClick={() => setShowTips(!showTips)}
          >
            <HelpCircle size={16} />
            {showTips ? 'Hide Tips' : 'Show Tips'}
          </button>
        </div>
      </header>

      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 flex items-center">
          <AlertCircle className="mr-2" />
          <p>{error}</p>
          <button className="ml-auto" onClick={() => setError(null)}><X size={16} /></button>
        </div>
      )}

      {showTips && (
        <div className="bg-blue-50 border-l-4 border-blue-500 text-blue-700 p-4 mb-4">
          <h3 className="font-bold mb-2">Tips for a Successful Interview:</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>Maintain good eye contact with the camera</li>
            <li>Speak clearly and at a moderate pace</li>
            <li>Minimize filler words like "um" and "like"</li>
            <li>Sit up straight and maintain good posture</li>
            <li>Use natural hand gestures to emphasize points</li>
          </ul>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Video recording section */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-md overflow-hidden">
          <div className="relative">
            {countdownValue && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
                <span className="text-6xl text-white font-bold">{countdownValue}</span>
              </div>
            )}
            {cameraEnabled ? (
              <div className="relative">
                <Webcam
                  audio={micEnabled}
                  ref={webcamRef}
                  width="100%"
                  height="auto"
                  className={`w-full ${isRecording ? 'border-2 border-red-500' : ''}`}
                />
                {isRecording && (
                  <div className="absolute top-3 left-3 bg-red-500 text-white rounded-full px-3 py-1 flex items-center text-sm font-medium">
                    <span className="animate-pulse mr-2 h-2 w-2 rounded-full bg-white inline-block"></span>
                    REC {formatTime(elapsedTime)}
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-gray-900 w-full h-80 flex items-center justify-center">
                <p className="text-white text-center">
                  <VideoOff size={48} className="mx-auto mb-2" />
                  Camera is turned off
                </p>
              </div>
            )}
          </div>
          
          {videoURL && !isRecording && (
            <div className="p-4 border-t border-gray-200">
              <h3 className="font-medium mb-2">Review Recording</h3>
              <video src={videoURL} controls className="w-full rounded" />
            </div>
          )}

          <div className="p-4 bg-gray-50 border-t border-gray-200">
            <div className="flex flex-wrap gap-2 justify-between items-center">
              <div className="flex gap-2">
                <button 
                  onClick={() => setCameraEnabled(!cameraEnabled)}
                  className={`p-2 rounded-full ${cameraEnabled ? 'bg-gray-200 text-gray-700' : 'bg-red-100 text-red-700'}`}
                  title={cameraEnabled ? "Turn camera off" : "Turn camera on"}
                >
                  {cameraEnabled ? <Video size={20} /> : <VideoOff size={20} />}
                </button>
                <button 
                  onClick={() => setMicEnabled(!micEnabled)}
                  className={`p-2 rounded-full ${micEnabled ? 'bg-gray-200 text-gray-700' : 'bg-red-100 text-red-700'}`}
                  title={micEnabled ? "Mute microphone" : "Unmute microphone"}
                >
                  {micEnabled ? <Mic size={20} /> : <MicOff size={20} />}
                </button>
              </div>
              
              <div className="flex gap-2">
                {!isRecording && !analyzing && (
                  <button 
                    onClick={startCountdown}
                    disabled={!cameraEnabled}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed transition"
                  >
                    <Play size={16} /> Start Recording
                  </button>
                )}
                {isRecording && (
                  <button 
                    onClick={handleStopRecording}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md flex items-center gap-1 transition"
                  >
                    <Square size={16} /> Stop Recording
                  </button>
                )}
                {videoURL && !isRecording && (
                  <button 
                    onClick={handleDownload}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md flex items-center gap-1 transition"
                  >
                    <Download size={16} /> Download
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Real-time analysis section */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-xl font-semibold mb-4">Real-Time Analysis</h2>
          
          {!isRecording && !analyzing && !analysisResults && (
            <div className="text-center py-8 text-gray-500">
              <BarChart2 size={48} className="mx-auto mb-2 text-gray-400" />
              <p>Start recording to see real-time analysis</p>
            </div>
          )}
          
          {isRecording && realTimeData.length > 0 && (
            <>
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-500 mb-1">Speaking Speed</h3>
                <div className="h-32">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={realTimeData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" label={{ value: 'Time (s)', position: 'insideBottomRight', offset: -5 }} />
                      <YAxis label={{ value: 'WPM', angle: -90, position: 'insideLeft' }} />
                      <Tooltip />
                      <Line type="monotone" dataKey="speed" stroke="#3B82F6" dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Confidence Score</h3>
                <div className="h-32">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={realTimeData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" label={{ value: 'Time (s)', position: 'insideBottomRight', offset: -5 }} />
                      <YAxis domain={[0, 100]} label={{ value: 'Score', angle: -90, position: 'insideLeft' }} />
                      <Tooltip />
                      <Line type="monotone" dataKey="confidence" stroke="#10B981" dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </>
          )}

          {analyzing && (
            <div className="flex flex-col items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
              <p className="text-gray-600">Analyzing your interview performance...</p>
            </div>
          )}
        </div>
      </div>

      {/* Analysis results section */}
      {analysisResults && (
        <div className="mt-6 bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-blue-500 text-white p-4 flex justify-between items-center">
            <h2 className="text-xl font-semibold">Analysis Results</h2>
            <button 
              onClick={() => setShowDetailedAnalysis(!showDetailedAnalysis)}
              className="text-white hover:bg-blue-600 p-1 rounded"
            >
              {showDetailedAnalysis ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
          </div>
          
          <div className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-lg font-medium mb-1">Confidence Score</h3>
                <div className="flex items-end">
                  <span className="text-3xl font-bold text-blue-700">{analysisResults.confidence}</span>
                  <span className="text-gray-500 ml-1">/100</span>
                </div>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="text-lg font-medium mb-1">Speaking Pace</h3>
                <div className="flex items-end">
                  <span className="text-3xl font-bold text-green-700">{analysisResults.speakingSpeed.wpm}</span>
                  <span className="text-gray-500 ml-1">WPM</span>
                </div>
                <span className="text-sm text-green-600">{analysisResults.speakingSpeed.assessment}</span>
              </div>
              
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="text-lg font-medium mb-1">Filler Words</h3>
                <div className="flex items-end">
                  <span className="text-3xl font-bold text-purple-700">{analysisResults.fillerWords.count}</span>
                  <span className="text-gray-500 ml-1">detected</span>
                </div>
              </div>
            </div>

            {showDetailedAnalysis && (
              <div className="mt-6 space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-3">Filler Words Analysis</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={fillerWordsData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="count" fill="#8884d8" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-3">Body Language Assessment</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium text-gray-500">Eye Contact</h4>
                      <div className="mt-2">
                        <div className="flex justify-between mb-1">
                          <span>{analysisResults.eyeContact.assessment}</span>
                          <span>{analysisResults.eyeContact.score}/100</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${analysisResults.eyeContact.score}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium text-gray-500">Posture</h4>
                      <div className="mt-2">
                        <div className="flex justify-between mb-1">
                          <span>{analysisResults.posture.assessment}</span>
                          <span>{analysisResults.posture.score}/100</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-600 h-2 rounded-full" 
                            style={{ width: `${analysisResults.posture.score}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium text-gray-500">Gestures</h4>
                      <div className="mt-2">
                        <div className="flex justify-between mb-1">
                          <span>{analysisResults.gestures.assessment}</span>
                          <span>{analysisResults.gestures.score}/100</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-purple-600 h-2 rounded-full" 
                            style={{ width: `${analysisResults.gestures.score}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-3">Keywords Detected</h3>
                  <div className="flex flex-wrap gap-2">
                    {analysisResults.keywords.map((keyword, index) => (
                      <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
            <div className="mt-6 flex justify-end">
              {!isSubmitting && !submitSuccess && (
                <button 
                  onClick={handleSubmitVideo}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md flex items-center gap-2 transition"
                >
                  <Send size={16} /> Submit for Expert Review
                </button>
              )}
              
              {isSubmitting && (
                <button 
                  disabled
                  className="bg-blue-300 text-white px-6 py-2 rounded-md flex items-center gap-2"
                >
                  <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                  Submitting...
                </button>
              )}
              
              {submitSuccess && (
                <div className="bg-green-100 text-green-800 px-4 py-2 rounded-md flex items-center gap-2">
                  <Check size={16} /> Successfully submitted for expert review
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoAnalysis;