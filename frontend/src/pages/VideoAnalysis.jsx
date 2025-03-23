import React, { useState, useRef, useCallback, useEffect } from 'react';
import Webcam from 'react-webcam';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';
import { AlertCircle, Mic, MicOff, Video, VideoOff, Check, X, Play, Square, Send, Clock, HelpCircle, Download, ChevronRight, ChevronDown, ChevronUp, BarChart2 } from 'lucide-react';
import '../styles/style.css';

// Internal CSS styles
const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '1.5rem',
    backgroundColor: '#f8fafc',
    minHeight: '100vh',
    fontFamily: 'Inter, system-ui, sans-serif',
  },
  header: {
    marginBottom: '1.5rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #e2e8f0',
    paddingBottom: '1rem',
  },
  headerTitle: {
    fontSize: '2rem',
    fontWeight: '700',
    color: '#1e293b',
    background: 'linear-gradient(90deg, #2563eb, #3b82f6)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  button: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.625rem 1rem',
    borderRadius: '0.5rem',
    fontWeight: '500',
    transition: 'all 0.2s ease',
    cursor: 'pointer',
    border: 'none',
    outline: 'none',
  },
  primaryButton: {
    backgroundColor: '#3b82f6',
    color: 'white',
    boxShadow: '0 4px 6px -1px rgba(59, 130, 246, 0.2)',
    '&:hover': {
      backgroundColor: '#2563eb',
      boxShadow: '0 6px 8px -1px rgba(59, 130, 246, 0.3)',
    },
  },
  secondaryButton: {
    backgroundColor: '#f1f5f9',
    color: '#475569',
    '&:hover': {
      backgroundColor: '#e2e8f0',
    },
  },
  dangerButton: {
    backgroundColor: '#ef4444',
    color: 'white',
    '&:hover': {
      backgroundColor: '#dc2626',
    },
  },
  successButton: {
    backgroundColor: '#10b981',
    color: 'white',
    '&:hover': {
      backgroundColor: '#059669',
    },
  },
  webcamContainer: {
    borderRadius: '0.75rem',
    overflow: 'hidden',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    transition: 'transform 0.2s ease',
    '&:hover': {
      transform: 'translateY(-2px)',
    },
  },
  gridContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(1, 1fr)',
    gap: '1.5rem',
    '@media (min-width: 1024px)': {
      gridTemplateColumns: '2fr 1fr',
    },
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '0.75rem',
    overflow: 'hidden',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  },
  cardHeader: {
    padding: '1rem',
    borderBottom: '1px solid #e2e8f0',
    fontWeight: '600',
    fontSize: '1.125rem',
    color: '#1e293b',
  },
  cardBody: {
    padding: '1.5rem',
  },
  alertError: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#fee2e2',
    color: '#b91c1c',
    padding: '0.75rem 1rem',
    borderRadius: '0.5rem',
    marginBottom: '1rem',
    borderLeft: '4px solid #ef4444',
  },
  tipBox: {
    backgroundColor: '#eff6ff',
    color: '#1e40af',
    padding: '1rem',
    borderRadius: '0.5rem',
    marginBottom: '1.5rem',
    borderLeft: '4px solid #3b82f6',
  },
  recIndicator: {
    position: 'absolute',
    top: '0.75rem',
    left: '0.75rem',
    backgroundColor: 'rgba(239, 68, 68, 0.9)',
    color: 'white',
    borderRadius: '9999px',
    padding: '0.375rem 0.75rem',
    display: 'flex',
    alignItems: 'center',
    fontSize: '0.875rem',
    fontWeight: '500',
    backdropFilter: 'blur(4px)',
  },
  pulseDot: {
    display: 'inline-block',
    marginRight: '0.5rem',
    height: '0.5rem',
    width: '0.5rem',
    backgroundColor: 'white',
    borderRadius: '50%',
    animation: 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
  },
  analyticsStat: {
    padding: '1rem',
    borderRadius: '0.5rem',
    transition: 'transform 0.2s ease',
    '&:hover': {
      transform: 'translateY(-2px)',
    },
  },
  statValue: {
    fontSize: '1.875rem',
    fontWeight: '700',
    display: 'flex',
    alignItems: 'baseline',
  },
  statLabel: {
    fontSize: '1.125rem',
    fontWeight: '500',
    marginBottom: '0.375rem',
  },
  keywordTag: {
    backgroundColor: '#dbeafe',
    color: '#1e40af',
    padding: '0.375rem 0.75rem',
    borderRadius: '9999px',
    fontSize: '0.875rem',
    display: 'inline-block',
    margin: '0.25rem',
    transition: 'all 0.2s ease',
    '&:hover': {
      backgroundColor: '#bfdbfe',
      transform: 'translateY(-1px)',
    },
  },
  progressBar: {
    width: '100%',
    backgroundColor: '#e2e8f0',
    borderRadius: '9999px',
    height: '0.5rem',
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: '9999px',
    transition: 'width 1s ease',
  },
  countdownOverlay: {
    position: 'absolute',
    inset: '0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    zIndex: '10',
    backdropFilter: 'blur(4px)',
  },
  countdownText: {
    fontSize: '6rem',
    fontWeight: '700',
    color: 'white',
    textShadow: '0 0 20px rgba(255, 255, 255, 0.5)',
    animation: 'pulse 1s infinite',
  },
  '@keyframes pulse': {
    '0%, 100%': {
      opacity: 1,
    },
    '50%': {
      opacity: 0.5,
    },
  },
};

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

  // Apply inline styles to JSX elements
  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.headerTitle}>Video Interview Analysis</h1>
        <div>
          <button 
            onClick={() => setShowTips(!showTips)}
            style={{...styles.button, ...styles.secondaryButton}}
          >
            <HelpCircle size={16} />
            {showTips ? 'Hide Tips' : 'Show Tips'}
          </button>
        </div>
      </header>

      {error && (
        <div style={styles.alertError}>
          <AlertCircle style={{ marginRight: '0.5rem' }} />
          <p>{error}</p>
          <button 
            onClick={() => setError(null)}
            style={{ marginLeft: 'auto', background: 'none', border: 'none', cursor: 'pointer', color: '#b91c1c' }}
          >
            <X size={16} />
          </button>
        </div>
      )}

      {showTips && (
        <div style={styles.tipBox}>
          <h3 style={{ fontWeight: '600', marginBottom: '0.5rem' }}>Tips for a Successful Interview:</h3>
          <ul style={{ paddingLeft: '1.25rem', marginTop: '0.5rem' }}>
            <li style={{ marginBottom: '0.25rem' }}>Maintain good eye contact with the camera</li>
            <li style={{ marginBottom: '0.25rem' }}>Speak clearly and at a moderate pace</li>
            <li style={{ marginBottom: '0.25rem' }}>Minimize filler words like "um" and "like"</li>
            <li style={{ marginBottom: '0.25rem' }}>Sit up straight and maintain good posture</li>
            <li>Use natural hand gestures to emphasize points</li>
          </ul>
        </div>
      )}

      <div style={styles.gridContainer}>
        {/* Video recording section */}
        <div style={styles.card}>
          <div style={{ position: 'relative' }}>
            {countdownValue && (
              <div style={styles.countdownOverlay}>
                <span style={styles.countdownText}>{countdownValue}</span>
              </div>
            )}
            {cameraEnabled ? (
              <div style={{ position: 'relative' }}>
                <Webcam
                  audio={micEnabled}
                  ref={webcamRef}
                  width="100%"
                  height="auto"
                  style={{ 
                    width: '100%', 
                    borderRadius: isRecording ? '0' : '0.5rem 0.5rem 0 0',
                    border: isRecording ? '3px solid #ef4444' : 'none' 
                  }}
                />
                {isRecording && (
                  <div style={styles.recIndicator}>
                    <span style={{
                      ...styles.pulseDot,
                      animation: 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite'
                    }}></span>
                    REC {formatTime(elapsedTime)}
                  </div>
                )}
              </div>
            ) : (
              <div style={{ 
                backgroundColor: '#111827', 
                width: '100%', 
                height: '320px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                borderRadius: '0.5rem 0.5rem 0 0'
              }}>
                <p style={{ textAlign: 'center', color: 'white' }}>
                  <VideoOff size={48} style={{ margin: '0 auto 0.5rem auto' }} />
                  Camera is turned off
                </p>
              </div>
            )}
          </div>
          
          {videoURL && !isRecording && (
            <div style={{ padding: '1rem', borderTop: '1px solid #e2e8f0' }}>
              <h3 style={{ fontWeight: '500', marginBottom: '0.5rem' }}>Review Recording</h3>
              <video 
                src={videoURL} 
                controls 
                style={{ width: '100%', borderRadius: '0.375rem', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)' }} 
              />
            </div>
          )}

          <div style={{ 
            padding: '1rem', 
            backgroundColor: '#f8fafc', 
            borderTop: '1px solid #e2e8f0',
            borderRadius: '0 0 0.75rem 0.75rem'
          }}>
            <div style={{ 
              display: 'flex', 
              flexWrap: 'wrap', 
              gap: '0.5rem', 
              justifyContent: 'space-between', 
              alignItems: 'center' 
            }}>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button 
                  onClick={() => setCameraEnabled(!cameraEnabled)}
                  style={{ 
                    padding: '0.5rem', 
                    borderRadius: '9999px', 
                    backgroundColor: cameraEnabled ? '#e2e8f0' : '#fee2e2',
                    color: cameraEnabled ? '#475569' : '#b91c1c',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                  title={cameraEnabled ? "Turn camera off" : "Turn camera on"}
                >
                  {cameraEnabled ? <Video size={20} /> : <VideoOff size={20} />}
                </button>
                <button 
                  onClick={() => setMicEnabled(!micEnabled)}
                  style={{ 
                    padding: '0.5rem', 
                    borderRadius: '9999px', 
                    backgroundColor: micEnabled ? '#e2e8f0' : '#fee2e2',
                    color: micEnabled ? '#475569' : '#b91c1c',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                  title={micEnabled ? "Mute microphone" : "Unmute microphone"}
                >
                  {micEnabled ? <Mic size={20} /> : <MicOff size={20} />}
                </button>
              </div>
              
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                {!isRecording && !analyzing && (
                  <button 
                    onClick={startCountdown}
                    disabled={!cameraEnabled}
                    style={{
                      ...styles.button,
                      ...styles.primaryButton,
                      opacity: cameraEnabled ? 1 : 0.5,
                      cursor: cameraEnabled ? 'pointer' : 'not-allowed'
                    }}
                  >
                    <Play size={16} /> Start Recording
                  </button>
                )}
                {isRecording && (
                  <button 
                    onClick={handleStopRecording}
                    style={{
                      ...styles.button,
                      ...styles.dangerButton
                    }}
                  >
                    <Square size={16} /> Stop Recording
                  </button>
                )}
                {videoURL && !isRecording && (
                  <button 
                    onClick={handleDownload}
                    style={{
                      ...styles.button,
                      ...styles.successButton
                    }}
                  >
                    <Download size={16} /> Download
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Real-time analysis section */}
        <div style={styles.card}>
          <div style={styles.cardHeader}>Real-Time Analysis</div>
          
          <div style={{ padding: '1rem' }}>
            {!isRecording && !analyzing && !analysisResults && (
              <div style={{ 
                textAlign: 'center', 
                padding: '2rem 0', 
                color: '#64748b' 
              }}>
                <BarChart2 size={48} style={{ margin: '0 auto 0.5rem auto', color: '#94a3b8' }} />
                <p>Start recording to see real-time analysis</p>
              </div>
            )}
            
            {isRecording && realTimeData.length > 0 && (
              <>
                <div style={{ marginBottom: '1rem' }}>
                  <h3 style={{ 
                    fontSize: '0.875rem', 
                    fontWeight: '500', 
                    color: '#64748b', 
                    marginBottom: '0.25rem' 
                  }}>Speaking Speed</h3>
                  <div style={{ height: '8rem' }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={realTimeData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis 
                          dataKey="time" 
                          label={{ value: 'Time (s)', position: 'insideBottomRight', offset: -5 }}
                          stroke="#64748b"
                          tick={{ fill: '#64748b' }}
                        />
                        <YAxis 
                          label={{ value: 'WPM', angle: -90, position: 'insideLeft' }} 
                          stroke="#64748b"
                          tick={{ fill: '#64748b' }}
                        />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'white', 
                            border: '1px solid #e2e8f0',
                            borderRadius: '0.375rem',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                          }} 
                        />
                        <Line 
                          type="monotone" 
                          dataKey="speed" 
                          stroke="#3b82f6" 
                          strokeWidth={2}
                          dot={false} 
                          activeDot={{ r: 6, fill: '#3b82f6', stroke: 'white', strokeWidth: 2 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                
                <div>
                  <h3 style={{ 
                    fontSize: '0.875rem', 
                    fontWeight: '500', 
                    color: '#64748b', 
                    marginBottom: '0.25rem' 
                  }}>Confidence Score</h3>
                  <div style={{ height: '8rem' }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={realTimeData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis 
                          dataKey="time" 
                          label={{ value: 'Time (s)', position: 'insideBottomRight', offset: -5 }}
                          stroke="#64748b"
                          tick={{ fill: '#64748b' }}
                        />
                        <YAxis 
                          domain={[0, 100]} 
                          label={{ value: 'Score', angle: -90, position: 'insideLeft' }}
                          stroke="#64748b"
                          tick={{ fill: '#64748b' }}
                        />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'white', 
                            border: '1px solid #e2e8f0',
                            borderRadius: '0.375rem',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                          }} 
                        />
                        <Line 
                          type="monotone" 
                          dataKey="confidence" 
                          stroke="#10b981" 
                          strokeWidth={2}
                          dot={false} 
                          activeDot={{ r: 6, fill: '#10b981', stroke: 'white', strokeWidth: 2 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </>
            )}

            {analyzing && (
              <div style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                justifyContent: 'center', 
                height: '16rem' 
              }}>
                <div style={{ 
                  animation: 'spin 1s linear infinite',
                  borderRadius: '50%',
                  height: '3rem',
                  width: '3rem',
                  borderTop: '2px solid #3b82f6',
                  borderRight: '2px solid transparent',
                  borderBottom: '2px solid #3b82f6',
                  borderLeft: '2px solid transparent',
                  marginBottom: '1rem'
                }}></div>
                <p style={{ color: '#64748b', fontSize: '0.875rem' }}>Analyzing your interview performance...</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Analysis results section */}
      {analysisResults && (
        <div style={{
          marginTop: '1.5rem',
          ...styles.card
        }}>
          <div style={{ 
            backgroundColor: '#3b82f6', 
            color: 'white', 
            padding: '1rem', 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            borderRadius: '0.75rem 0.75rem 0 0'
          }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '600' }}>Analysis Results</h2>
            <button 
              onClick={() => setShowDetailedAnalysis(!showDetailedAnalysis)}
              style={{ 
                color: 'white', 
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                borderRadius: '0.25rem',
                padding: '0.25rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.1)'
              }}
            >
              {showDetailedAnalysis ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
          </div>
          
          <div style={{ padding: '1.5rem' }}>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(1, 1fr)', 
              gap: '1rem',
              marginBottom: '1rem',
              '@media (min-width: 768px)': {
                gridTemplateColumns: 'repeat(3, 1fr)',
              }
            }}>
              <div style={{ 
                backgroundColor: '#eff6ff', 
                padding: '1rem', 
                borderRadius: '0.5rem',
                transition: 'transform 0.2s ease',
                transform: 'translateY(0)',
                ':hover': {
                  transform: 'translateY(-2px)'
                }
              }}>
                <h3 style={{ 
                  fontSize: '1.125rem', 
                  fontWeight: '500', 
                  marginBottom: '0.25rem' 
                }}>Confidence Score</h3>
                <div style={{fontSize: '1.875rem', 
                  fontWeight: '700', 
                  color: '#1e40af'
                }}>
                  {analysisResults.confidence}%
                </div>
                <div style={{ marginTop: '0.5rem' }}>
                  <div style={styles.progressBar}>
                    <div style={{
                      ...styles.progressBarFill,
                      width: `${analysisResults.confidence}%`,
                      backgroundColor: '#3b82f6'
                    }}></div>
                  </div>
                </div>
              </div>
              
              <div style={{ 
                backgroundColor: '#f0fdf4', 
                padding: '1rem', 
                borderRadius: '0.5rem' 
              }}>
                <h3 style={{ 
                  fontSize: '1.125rem', 
                  fontWeight: '500', 
                  marginBottom: '0.25rem' 
                }}>Speaking Pace</h3>
                <div style={{ 
                  fontSize: '1.875rem', 
                  fontWeight: '700', 
                  color: '#166534'
                }}>
                  {analysisResults.speakingSpeed.wpm} <span style={{ fontSize: '1rem', fontWeight: '400' }}>WPM</span>
                </div>
                <div style={{ marginTop: '0.5rem', color: '#166534' }}>
                  {analysisResults.speakingSpeed.assessment}
                </div>
              </div>
              
              <div style={{ 
                backgroundColor: '#fff7ed', 
                padding: '1rem', 
                borderRadius: '0.5rem' 
              }}>
                <h3 style={{ 
                  fontSize: '1.125rem', 
                  fontWeight: '500', 
                  marginBottom: '0.25rem' 
                }}>Filler Words</h3>
                <div style={{ 
                  fontSize: '1.875rem', 
                  fontWeight: '700', 
                  color: '#9a3412'
                }}>
                  {analysisResults.fillerWords.count}
                </div>
                <div style={{ marginTop: '0.5rem', color: '#9a3412' }}>
                  {analysisResults.fillerWords.count < 5 ? 'Excellent!' : analysisResults.fillerWords.count < 10 ? 'Good' : 'Needs improvement'}
                </div>
              </div>
            </div>
            
            <div style={{ marginTop: '1rem' }}>
              <h3 style={{ fontSize: '1.125rem', fontWeight: '500', marginBottom: '0.5rem' }}>Detected Keywords</h3>
              <div>
                {analysisResults.keywords.map((keyword, index) => (
                  <span key={index} style={styles.keywordTag}>{keyword}</span>
                ))}
              </div>
            </div>
            
            {showDetailedAnalysis && (
              <div style={{ 
                marginTop: '2rem',
                backgroundColor: '#f8fafc',
                padding: '1.5rem',
                borderRadius: '0.5rem'
              }}>
                <h3 style={{ 
                  fontSize: '1.25rem', 
                  fontWeight: '600', 
                  marginBottom: '1rem',
                  borderBottom: '1px solid #e2e8f0',
                  paddingBottom: '0.5rem'
                }}>Detailed Analysis</h3>
                
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(1, 1fr)', 
                  gap: '1.5rem',
                  '@media (min-width: 768px)': {
                    gridTemplateColumns: 'repeat(2, 1fr)',
                  }
                }}>
                  <div>
                    <h4 style={{ fontWeight: '500', marginBottom: '0.75rem' }}>Body Language</h4>
                    <div style={{ marginBottom: '1rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                        <span>Eye Contact</span>
                        <span style={{ fontWeight: '500' }}>{analysisResults.eyeContact.score}%</span>
                      </div>
                      <div style={styles.progressBar}>
                        <div style={{
                          ...styles.progressBarFill,
                          width: `${analysisResults.eyeContact.score}%`,
                          backgroundColor: analysisResults.eyeContact.score > 80 ? '#10b981' : analysisResults.eyeContact.score > 60 ? '#f59e0b' : '#ef4444'
                        }}></div>
                      </div>
                      <div style={{ 
                        fontSize: '0.875rem', 
                        color: '#64748b', 
                        marginTop: '0.25rem' 
                      }}>
                        {analysisResults.eyeContact.assessment}
                      </div>
                    </div>
                    
                    <div style={{ marginBottom: '1rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                        <span>Posture</span>
                        <span style={{ fontWeight: '500' }}>{analysisResults.posture.score}%</span>
                      </div>
                      <div style={styles.progressBar}>
                        <div style={{
                          ...styles.progressBarFill,
                          width: `${analysisResults.posture.score}%`,
                          backgroundColor: analysisResults.posture.score > 80 ? '#10b981' : analysisResults.posture.score > 60 ? '#f59e0b' : '#ef4444'
                        }}></div>
                      </div>
                      <div style={{ 
                        fontSize: '0.875rem', 
                        color: '#64748b', 
                        marginTop: '0.25rem' 
                      }}>
                        {analysisResults.posture.assessment}
                      </div>
                    </div>
                    
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                        <span>Gestures</span>
                        <span style={{ fontWeight: '500' }}>{analysisResults.gestures.score}%</span>
                      </div>
                      <div style={styles.progressBar}>
                        <div style={{
                          ...styles.progressBarFill,
                          width: `${analysisResults.gestures.score}%`,
                          backgroundColor: analysisResults.gestures.score > 80 ? '#10b981' : analysisResults.gestures.score > 60 ? '#f59e0b' : '#ef4444'
                        }}></div>
                      </div>
                      <div style={{ 
                        fontSize: '0.875rem', 
                        color: '#64748b', 
                        marginTop: '0.25rem' 
                      }}>
                        {analysisResults.gestures.assessment}
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 style={{ fontWeight: '500', marginBottom: '0.75rem' }}>Speech Analysis</h4>
                    <div style={{ height: '15rem' }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={fillerWordsData}
                          margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                          <XAxis dataKey="name" stroke="#64748b" />
                          <YAxis stroke="#64748b" />
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: 'white', 
                              border: '1px solid #e2e8f0',
                              borderRadius: '0.375rem',
                              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                            }} 
                          />
                          <Legend />
                          <Bar dataKey="count" fill="#f97316" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
                
                <div style={{ marginTop: '2rem' }}>
                  <h4 style={{ fontWeight: '500', marginBottom: '0.75rem' }}>Overall Sentiment</h4>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    backgroundColor: analysisResults.sentiment === 'Positive' ? '#f0fdf4' : analysisResults.sentiment === 'Neutral' ? '#f8fafc' : '#fef2f2',
                    padding: '1rem',
                    borderRadius: '0.5rem',
                    borderLeft: `4px solid ${analysisResults.sentiment === 'Positive' ? '#22c55e' : analysisResults.sentiment === 'Neutral' ? '#64748b' : '#ef4444'}`
                  }}>
                    {analysisResults.sentiment === 'Positive' && <Check size={24} style={{ color: '#16a34a', marginRight: '0.75rem' }} />}
                    {analysisResults.sentiment === 'Neutral' && <Clock size={24} style={{ color: '#64748b', marginRight: '0.75rem' }} />}
                    {analysisResults.sentiment === 'Negative' && <AlertCircle size={24} style={{ color: '#dc2626', marginRight: '0.75rem' }} />}
                    <div>
                      <p style={{ fontWeight: '500' }}>{analysisResults.sentiment} Impression</p>
                      <p style={{ 
                        fontSize: '0.875rem', 
                        color: '#64748b', 
                        marginTop: '0.25rem' 
                      }}>
                        {analysisResults.sentiment === 'Positive' 
                          ? 'Your interview created a positive impression. Great job!' 
                          : analysisResults.sentiment === 'Neutral' 
                          ? 'Your interview created a neutral impression. There\'s room for improvement.' 
                          : 'Your interview may have created a negative impression. Focus on improving the highlighted areas.'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div style={{ 
              marginTop: '1.5rem', 
              display: 'flex', 
              justifyContent: 'flex-end',
              gap: '0.5rem'
            }}>
              {!isSubmitting && !submitSuccess && (
                <button 
                  onClick={handleSubmitVideo}
                  style={{
                    ...styles.button,
                    ...styles.primaryButton
                  }}
                >
                  <Send size={16} /> Submit for Expert Review
                </button>
              )}
              
              {isSubmitting && (
                <button 
                  disabled
                  style={{
                    ...styles.button,
                    ...styles.primaryButton,
                    opacity: 0.7,
                    cursor: 'not-allowed'
                  }}
                >
                  <div style={{ 
                    animation: 'spin 1s linear infinite',
                    borderRadius: '50%',
                    height: '1rem',
                    width: '1rem',
                    borderTop: '2px solid white',
                    borderRight: '2px solid transparent',
                    borderBottom: '2px solid white',
                    borderLeft: '2px solid transparent',
                    marginRight: '0.5rem'
                  }}></div>
                  Submitting...
                </button>
              )}
              
              {submitSuccess && (
                <div style={{ 
                  backgroundColor: '#f0fdf4', 
                  color: '#16a34a', 
                  padding: '0.625rem 1rem',
                  borderRadius: '0.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontWeight: '500'
                }}>
                  <Check size={16} />
                  Submitted successfully! We'll email you feedback.
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