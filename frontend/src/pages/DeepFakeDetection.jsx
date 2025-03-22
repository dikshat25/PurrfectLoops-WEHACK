import React, { useState, useRef, useCallback, useEffect } from 'react';
import Webcam from 'react-webcam';
import { 
  Download, Upload, Camera, Check, X, AlertTriangle, 
  FileText, Clock, ChevronDown, BarChart2, Shield, Info,
  PlayCircle, StopCircle, RefreshCw, Save, Share2
} from 'lucide-react';

const DeepfakeDetection = () => {
  const [mode, setMode] = useState('upload');
  const [isRecording, setIsRecording] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [videoURL, setVideoURL] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const [detectionMode, setDetectionMode] = useState('standard'); // standard, advanced, forensic
  const [historyOpen, setHistoryOpen] = useState(false);
  const [analysisHistory, setAnalysisHistory] = useState([]);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [showTutorial, setShowTutorial] = useState(false);
  const [compareMode, setCompareMode] = useState(false);
  const [comparisonVideo, setComparisonVideo] = useState(null);

  const webcamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const fileInputRef = useRef(null);
  const timerRef = useRef(null);

  // Recording timer
  useEffect(() => {
    if (isRecording) {
      setRecordingDuration(0);
      timerRef.current = setInterval(() => {
        setRecordingDuration(prev => prev + 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isRecording]);

  const handleStartRecording = useCallback(() => {
    setIsRecording(true);
    setError(null);
    setVideoURL(null);
    setRecordedChunks([]);
    setResults(null);
    
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
  }, []);

  const handleStopRecording = useCallback(() => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
    setIsRecording(false);
  }, []);

  const handleDataAvailable = useCallback(({ data }) => {
    if (data.size > 0) {
      setRecordedChunks(prev => [...prev, data]);
    }
  }, []);

  useEffect(() => {
    if (recordedChunks.length > 0 && !isRecording) {
      const blob = new Blob(recordedChunks, { type: 'video/webm' });
      const url = URL.createObjectURL(blob);
      setVideoURL(url);
    }
  }, [recordedChunks, isRecording]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setResults(null);
    setError(null);
    setVideoURL(null);
    if (!file.type.includes('video/')) {
      setError('Please upload a video file.');
      setUploadedFile(null);
      return;
    }
    setUploadedFile(file);
    setVideoURL(URL.createObjectURL(file));
  };

  const handleComparisonUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.includes('video/')) {
      setError('Please upload a video file for comparison.');
      return;
    }
    setComparisonVideo(URL.createObjectURL(file));
  };

  const generateMockDetectionDetails = (isFake) => {
    // Generate more detailed analysis based on detection mode
    if (detectionMode === 'standard') {
      return {
        facialAnalysis: isFake ? 'Abnormal facial features detected' : 'Normal facial features',
        audioAnalysis: isFake ? 'Audio-visual synchronization issues' : 'Audio-visual synchronization normal',
        confidence: isFake ? Math.floor(Math.random() * 30) + 70 : Math.floor(Math.random() * 30) + 5
      };
    } else if (detectionMode === 'advanced') {
      return {
        facialAnalysis: {
          eyeBlinking: isFake ? 'Irregular' : 'Natural',
          faceEdges: isFake ? 'Artifacts detected' : 'Clean',
          expressions: isFake ? 'Unnatural transitions' : 'Natural transitions'
        },
        audioAnalysis: {
          lipSync: isFake ? 'Misaligned' : 'Aligned',
          voicePrint: isFake ? 'Synthetic patterns detected' : 'Natural patterns',
          audioArtifacts: isFake ? 'Present' : 'None detected'
        },
        visualAnalysis: {
          lightingConsistency: isFake ? 'Inconsistent' : 'Consistent',
          backgroundIntegration: isFake ? 'Anomalies detected' : 'Normal',
          videoQuality: isFake ? 'Suspicious quality drops' : 'Consistent quality'
        },
        confidence: isFake ? Math.floor(Math.random() * 30) + 70 : Math.floor(Math.random() * 30) + 5
      };
    } else {
      // Forensic mode
      return {
        facialAnalysis: {
          eyeBlinking: { 
            status: isFake ? 'Irregular' : 'Natural',
            confidence: isFake ? Math.floor(Math.random() * 20) + 80 : Math.floor(Math.random() * 20) + 80,
            details: isFake ? 'Unnatural patterns detected at 0:12, 0:18, and 0:23' : 'Normal blink rate of 15-20 blinks per minute'
          },
          faceEdges: {
            status: isFake ? 'Artifacts detected' : 'Clean',
            confidence: isFake ? Math.floor(Math.random() * 20) + 80 : Math.floor(Math.random() * 20) + 80,
            details: isFake ? 'Digital artifacts detected along jawline and hairline' : 'No visible artifacts along facial boundaries'
          },
          expressions: {
            status: isFake ? 'Unnatural transitions' : 'Natural transitions',
            confidence: isFake ? Math.floor(Math.random() * 20) + 80 : Math.floor(Math.random() * 20) + 80,
            details: isFake ? 'Micro-expression inconsistencies at 0:05-0:07' : 'Consistent emotional expressions throughout'
          }
        },
        audioAnalysis: {
          lipSync: {
            status: isFake ? 'Misaligned' : 'Aligned',
            confidence: isFake ? Math.floor(Math.random() * 20) + 80 : Math.floor(Math.random() * 20) + 80,
            details: isFake ? 'Audio leads visual by 120-180ms in sections 0:15-0:22' : 'Audio-visual alignment within normal parameters'
          },
          voicePrint: {
            status: isFake ? 'Synthetic patterns detected' : 'Natural patterns',
            confidence: isFake ? Math.floor(Math.random() * 20) + 80 : Math.floor(Math.random() * 20) + 80,
            details: isFake ? 'Voice frequency analysis shows synthetic patterns' : 'Voice frequency distribution consistent with human speech'
          }
        },
        metadata: {
          compressionAnalysis: isFake ? 'Multiple compression artifacts detected' : 'Normal compression patterns',
          editingTraces: isFake ? 'Evidence of digital manipulation in frame data' : 'No evidence of manipulation',
          sourceComparison: isFake ? 'Source inconsistencies detected' : 'Consistent source signature'
        },
        confidence: isFake ? Math.floor(Math.random() * 20) + 80 : Math.floor(Math.random() * 20) + 80
      };
    }
  };

  const handleAnalyzeVideo = async () => {
    if (!videoURL) {
      setError('No video available for analysis. Please record or upload a video.');
      return;
    }
    setAnalyzing(true);
    setError(null);
    setResults(null);
    try {
      // Simulate analysis time based on detection mode
      const analysisTime = detectionMode === 'standard' ? 2000 : 
                          detectionMode === 'advanced' ? 4000 : 6000;
      await new Promise(resolve => setTimeout(resolve, analysisTime));
      
      const isFake = Math.random() > 0.5;
      const detectionDetails = generateMockDetectionDetails(isFake);
      
      const newResult = {
        isDeepfake: isFake,
        confidenceScore: detectionDetails.confidence,
        detectedInconsistencies: isFake ? [
          'Unnatural eye blinking patterns',
          'Facial boundary artifacts',
          'Audio-visual sync issues',
          'Inconsistent lighting effects'
        ].slice(0, Math.floor(Math.random() * 3) + 1) : [],
        reportId: 'DF-' + Math.floor(Math.random() * 1000000).toString().padStart(6, '0'),
        analyzedAt: new Date().toISOString(),
        detectionMode: detectionMode,
        detectionDetails: detectionDetails,
        videoSource: mode === 'upload' ? (uploadedFile ? uploadedFile.name : 'Unknown file') : 'Webcam recording',
        duration: mode === 'upload' ? 'Unknown' : `${Math.floor(recordingDuration / 60)}:${(recordingDuration % 60).toString().padStart(2, '0')}`
      };
      
      setResults(newResult);
      setAnalysisHistory(prev => [newResult, ...prev].slice(0, 10));
      setAnalyzing(false);
    } catch (err) {
      setError('Failed to analyze the video. Please try again.');
      setAnalyzing(false);
    }
  };

  const handleDownloadReport = () => {
    if (!results) return;
    const reportData = {
      ...results,
      analyzedAt: new Date().toLocaleString(),
      videoSource: mode === 'upload' ? 'Uploaded file' : 'Webcam recording',
    };
    const reportBlob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const reportUrl = URL.createObjectURL(reportBlob);
    const a = document.createElement('a');
    a.href = reportUrl;
    a.download = `deepfake-analysis-${results.reportId}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const formatTimecode = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const renderResultDetails = () => {
    if (!results) return null;

    if (detectionMode === 'standard') {
      return (
        <div className="bg-white rounded-md p-4 mb-4 shadow-md">
          <div className="mb-2">
            <span className="font-semibold">Facial Analysis:</span> {results.detectionDetails.facialAnalysis}
          </div>
          <div className="mb-2">
            <span className="font-semibold">Audio Analysis:</span> {results.detectionDetails.audioAnalysis}
          </div>
        </div>
      );
    } else if (detectionMode === 'advanced') {
      const details = results.detectionDetails;
      return (
        <div className="bg-white rounded-md p-4 mb-4 shadow-md space-y-4">
          <div>
            <h3 className="font-bold mb-2">Facial Analysis:</h3>
            <div className="ml-4">
              <div><span className="font-semibold">Eye Blinking:</span> {details.facialAnalysis.eyeBlinking}</div>
              <div><span className="font-semibold">Face Edges:</span> {details.facialAnalysis.faceEdges}</div>
              <div><span className="font-semibold">Expressions:</span> {details.facialAnalysis.expressions}</div>
            </div>
          </div>
          
          <div>
            <h3 className="font-bold mb-2">Audio Analysis:</h3>
            <div className="ml-4">
              <div><span className="font-semibold">Lip Sync:</span> {details.audioAnalysis.lipSync}</div>
              <div><span className="font-semibold">Voice Print:</span> {details.audioAnalysis.voicePrint}</div>
              <div><span className="font-semibold">Audio Artifacts:</span> {details.audioAnalysis.audioArtifacts}</div>
            </div>
          </div>
          
          <div>
            <h3 className="font-bold mb-2">Visual Analysis:</h3>
            <div className="ml-4">
              <div><span className="font-semibold">Lighting Consistency:</span> {details.visualAnalysis.lightingConsistency}</div>
              <div><span className="font-semibold">Background Integration:</span> {details.visualAnalysis.backgroundIntegration}</div>
              <div><span className="font-semibold">Video Quality:</span> {details.visualAnalysis.videoQuality}</div>
            </div>
          </div>
        </div>
      );
    } else {
      // Forensic mode
      const details = results.detectionDetails;
      return (
        <div className="bg-white rounded-md p-4 mb-4 shadow-md space-y-4">
          <div>
            <h3 className="font-bold mb-2">Facial Forensics:</h3>
            <div className="ml-4 space-y-2">
              <div>
                <div className="flex justify-between">
                  <span className="font-semibold">Eye Blinking Pattern Analysis:</span>
                  <span className={`font-bold ${details.facialAnalysis.eyeBlinking.status === 'Irregular' ? 'text-red-500' : 'text-green-500'}`}>
                    {details.facialAnalysis.eyeBlinking.status}
                  </span>
                </div>
                <div className="text-sm mt-1">{details.facialAnalysis.eyeBlinking.details}</div>
                <div className="w-full bg-gray-200 rounded-full h-2 my-2">
                  <div 
                    className={`h-2 rounded-full ${details.facialAnalysis.eyeBlinking.status === 'Irregular' ? 'bg-red-500' : 'bg-green-500'}`}
                    style={{ width: `${details.facialAnalysis.eyeBlinking.confidence}%` }}
                  ></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between">
                  <span className="font-semibold">Facial Boundary Analysis:</span>
                  <span className={`font-bold ${details.facialAnalysis.faceEdges.status === 'Artifacts detected' ? 'text-red-500' : 'text-green-500'}`}>
                    {details.facialAnalysis.faceEdges.status}
                  </span>
                </div>
                <div className="text-sm mt-1">{details.facialAnalysis.faceEdges.details}</div>
                <div className="w-full bg-gray-200 rounded-full h-2 my-2">
                  <div 
                    className={`h-2 rounded-full ${details.facialAnalysis.faceEdges.status === 'Artifacts detected' ? 'bg-red-500' : 'bg-green-500'}`}
                    style={{ width: `${details.facialAnalysis.faceEdges.confidence}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-bold mb-2">Audio Forensics:</h3>
            <div className="ml-4 space-y-2">
              <div>
                <div className="flex justify-between">
                  <span className="font-semibold">Audio-Visual Synchronization:</span>
                  <span className={`font-bold ${details.audioAnalysis.lipSync.status === 'Misaligned' ? 'text-red-500' : 'text-green-500'}`}>
                    {details.audioAnalysis.lipSync.status}
                  </span>
                </div>
                <div className="text-sm mt-1">{details.audioAnalysis.lipSync.details}</div>
                <div className="w-full bg-gray-200 rounded-full h-2 my-2">
                  <div 
                    className={`h-2 rounded-full ${details.audioAnalysis.lipSync.status === 'Misaligned' ? 'bg-red-500' : 'bg-green-500'}`}
                    style={{ width: `${details.audioAnalysis.lipSync.confidence}%` }}
                  ></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between">
                  <span className="font-semibold">Voice Frequency Analysis:</span>
                  <span className={`font-bold ${details.audioAnalysis.voicePrint.status === 'Synthetic patterns detected' ? 'text-red-500' : 'text-green-500'}`}>
                    {details.audioAnalysis.voicePrint.status}
                  </span>
                </div>
                <div className="text-sm mt-1">{details.audioAnalysis.voicePrint.details}</div>
                <div className="w-full bg-gray-200 rounded-full h-2 my-2">
                  <div 
                    className={`h-2 rounded-full ${details.audioAnalysis.voicePrint.status === 'Synthetic patterns detected' ? 'bg-red-500' : 'bg-green-500'}`}
                    style={{ width: `${details.audioAnalysis.voicePrint.confidence}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-bold mb-2">Metadata Analysis:</h3>
            <div className="ml-4 space-y-2">
              <div>
                <div className="flex justify-between">
                  <span className="font-semibold">Compression Pattern Analysis:</span>
                  <span className={`font-bold ${details.metadata.compressionAnalysis.includes('artifacts') ? 'text-red-500' : 'text-green-500'}`}>
                    {details.metadata.compressionAnalysis}
                  </span>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between">
                  <span className="font-semibold">Digital Manipulation Traces:</span>
                  <span className={`font-bold ${details.metadata.editingTraces.includes('Evidence') ? 'text-red-500' : 'text-green-500'}`}>
                    {details.metadata.editingTraces}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  };

  const renderTutorial = () => {
    if (!showTutorial) return null;
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <h2 className="text-xl font-bold mb-4">How to Use Deepfake Detection</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg">1. Choose Your Input Method</h3>
              <p>Select either "Upload Video" to analyze an existing video or "Record Video" to capture new footage.</p>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg">2. Select Detection Mode</h3>
              <p>Choose from three detection modes:</p>
              <ul className="list-disc ml-6 mt-2">
                <li><strong>Standard:</strong> Quick basic analysis (2-3 seconds)</li>
                <li><strong>Advanced:</strong> More detailed analysis with greater accuracy (4-5 seconds)</li>
                <li><strong>Forensic:</strong> In-depth analysis with comprehensive metrics (6+ seconds)</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg">3. Record or Upload Video</h3>
              <p>Either record directly from your webcam or upload a video file for analysis.</p>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg">4. Analyze the Video</h3>
              <p>Click "Analyze Video" to begin the detection process.</p>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg">5. Review Results</h3>
              <p>View the analysis results, including confidence score and detected inconsistencies.</p>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg">6. Download or Share Report</h3>
              <p>Save the detailed analysis report or share the results.</p>
            </div>
          </div>
          
          <div className="mt-6 flex justify-end">
            <button 
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              onClick={() => setShowTutorial(false)}
            >
              Close Tutorial
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
      {renderTutorial()}
      
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold flex items-center">
          <Shield className="mr-2" /> Deepfake Detection System
        </h1>
        <div className="flex gap-2">
          <button 
            className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
            onClick={() => setShowTutorial(true)}
            title="Help & Tutorial"
          >
            <Info size={20} />
          </button>
          <button 
            className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
            onClick={() => setHistoryOpen(!historyOpen)}
            title="Analysis History"
          >
            <Clock size={20} />
          </button>
        </div>
      </div>
      
      {historyOpen && (
        <div className="mb-6 bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-3 flex items-center">
            <Clock className="mr-2" size={18} /> Recent Analysis History
          </h2>
          {analysisHistory.length === 0 ? (
            <p className="text-gray-500">No analysis history yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Report ID</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Source</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Result</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Confidence</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {analysisHistory.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-4 py-2 whitespace-nowrap text-sm">{item.reportId}</td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm">{item.videoSource.substring(0, 20)}{item.videoSource.length > 20 ? '...' : ''}</td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${item.isDeepfake ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                          {item.isDeepfake ? 'Potentially Fake' : 'Likely Authentic'}
                        </span>
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm">{item.confidenceScore}%</td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm">{new Date(item.analyzedAt).toLocaleString()}</td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm">
                        <button className="text-blue-600 hover:text-blue-800 mr-2" title="Load this result">
                          <RefreshCw size={16} />
                        </button>
                        <button className="text-blue-600 hover:text-blue-800" title="Download report">
                          <Download size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          {/* Main content area */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            {/* Mode selection */}
            <div className="flex flex-wrap gap-4 mb-6">
              <button 
                className={`flex items-center px-4 py-2 rounded-md ${mode === 'upload' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                onClick={() => setMode('upload')}
              >
                <Upload className="mr-2" size={16} /> Upload Video
              </button>
              <button 
                className={`flex items-center px-4 py-2 rounded-md ${mode === 'record' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                onClick={() => setMode('record')}
              >
                <Camera className="mr-2" size={16} /> Record Video
              </button>
              <div className="ml-auto">
                <select 
                  className="rounded-md border border-gray-300 px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={detectionMode}
                  onChange={(e) => setDetectionMode(e.target.value)}
                >
                  <option value="standard">Standard Detection</option>
                  <option value="advanced">Advanced Detection</option>
                  <option value="forensic">Forensic Analysis</option>
                </select>
              </div>
            </div>
            
            {/* Comparison mode toggle */}
            <div className="flex items-center mb-4">
              <input 
                type="checkbox" 
                id="compareMode" 
                checked={compareMode}
                onChange={() => setCompareMode(!compareMode)}
                className="mr-2"
              />
              <label htmlFor="compareMode" className="text-sm">Enable comparison mode</label>
            </div>
            
            {/* Video input section */}
            <div className={`mb-6 ${compareMode ? 'grid grid-cols-2 gap-4' : ''}`}>
              <div className={compareMode ? 'border-r pr-4' : ''}>
                <h3 className="text-lg font-semibold mb-3">{compareMode ? 'Primary Video' : 'Video Input'}</h3>
                {mode === 'record' ? (
                  <div className="mb-4">
                    <div className="relative rounded-lg overflow-hidden bg-black">
                      <Webcam 
                        ref={webcamRef} 
                        className="w-full aspect-video object-cover" 
                        videoConstraints={{ facingMode: "user" }}
                      />
                      {isRecording && (
                        <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md text-sm flex items-center">
                          <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></div>
                          Recording: {formatTimecode(recordingDuration)}
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2 mt-4">
                      {!isRecording ? (
                        <button
                        className="flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                        onClick={handleStartRecording}
                      >
                        <PlayCircle className="mr-2" size={16} /> Start Recording
                      </button>
                    ) : (
                      <button
                        className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                        onClick={handleStopRecording}
                      >
                        <StopCircle className="mr-2" size={16} /> Stop Recording
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                <div className="mb-4">
                  <div 
                    className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 transition-colors"
                    onClick={() => fileInputRef.current.click()}
                  >
                    <Upload className="mx-auto mb-2" size={24} />
                    <p className="text-gray-600">Click to upload a video file or drag and drop</p>
                    <p className="text-xs text-gray-500 mt-1">Supported formats: MP4, WebM, MOV</p>
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      onChange={handleFileUpload} 
                      accept="video/*" 
                      className="hidden" 
                    />
                  </div>
                </div>
              )}
              
              {videoURL && (
                <div className="mb-4">
                  <h3 className="text-md font-medium mb-2">Preview:</h3>
                  <video 
                    src={videoURL} 
                    controls 
                    className="w-full rounded-lg border border-gray-200"
                  />
                </div>
              )}
            </div>
            
            {compareMode && (
              <div>
                <h3 className="text-lg font-semibold mb-3">Comparison Video</h3>
                <div 
                  className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 transition-colors mb-4"
                  onClick={() => document.getElementById('comparisonFile').click()}
                >
                  <Upload className="mx-auto mb-2" size={24} />
                  <p className="text-gray-600">Upload a reference video for comparison</p>
                  <input 
                    type="file" 
                    id="comparisonFile" 
                    onChange={handleComparisonUpload} 
                    accept="video/*" 
                    className="hidden" 
                  />
                </div>
                
                {comparisonVideo && (
                  <div className="mb-4">
                    <h3 className="text-md font-medium mb-2">Comparison Preview:</h3>
                    <video 
                      src={comparisonVideo} 
                      controls 
                      className="w-full rounded-lg border border-gray-200"
                    />
                  </div>
                )}
              </div>
            )}
          </div>
          
          {/* Analysis buttons */}
          <div className="flex flex-wrap gap-3">
            <button 
              className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
              onClick={handleAnalyzeVideo}
              disabled={analyzing || !videoURL}
            >
              {analyzing ? (
                <>
                  <RefreshCw className="mr-2 animate-spin" size={16} /> Analyzing...
                </>
              ) : (
                <>
                  <BarChart2 className="mr-2" size={16} /> Analyze Video
                </>
              )}
            </button>
            
            {results && (
              <>
                <button 
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  onClick={handleDownloadReport}
                >
                  <Download className="mr-2" size={16} /> Download Report
                </button>
                <button 
                  className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
                >
                  <Share2 className="mr-2" size={16} /> Share Results
                </button>
              </>
            )}
          </div>
        </div>
        
        {/* Error message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6 flex items-start">
            <AlertTriangle className="mr-2 flex-shrink-0 mt-0.5" size={18} />
            <span>{error}</span>
          </div>
        )}
        
        {/* Results section */}
        {results && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <FileText className="mr-2" size={20} /> Analysis Results
            </h2>
            
            <div className="mb-6 flex items-center">
              <div className={`text-xl font-bold px-4 py-2 rounded-lg mr-4 ${results.isDeepfake ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                {results.isDeepfake ? 'Potentially Manipulated' : 'Likely Authentic'}
              </div>
              <div>
                <div className="text-sm text-gray-500">Confidence Score</div>
                <div className="text-2xl font-bold">{results.confidenceScore}%</div>
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="font-semibold mb-2">Result Summary</h3>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div 
                  className={`h-4 rounded-full ${results.isDeepfake ? 'bg-red-500' : 'bg-green-500'}`}
                  style={{ width: `${results.confidenceScore}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-sm mt-1">
                <span>Authentic</span>
                <span>Manipulated</span>
              </div>
            </div>
            
            {results.isDeepfake && results.detectedInconsistencies.length > 0 && (
              <div className="mb-6">
                <h3 className="font-semibold mb-2">Detected Inconsistencies:</h3>
                <ul className="list-disc ml-5 space-y-1">
                  {results.detectedInconsistencies.map((item, index) => (
                    <li key={index} className="text-red-700">{item}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {renderResultDetails()}
            
            <div className="text-sm text-gray-500 mt-6">
              <div>Report ID: {results.reportId}</div>
              <div>Analyzed: {new Date(results.analyzedAt).toLocaleString()}</div>
              <div>Video Source: {results.videoSource}</div>
              <div>Detection Mode: {results.detectionMode.charAt(0).toUpperCase() + results.detectionMode.slice(1)}</div>
            </div>
          </div>
        )}
      </div>
      
      <div>
        {/* Sidebar */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-lg font-semibold mb-4">Detection Information</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-gray-800">What are deepfakes?</h3>
              <p className="text-sm text-gray-600 mt-1">
                Deepfakes are synthetic media where a person's likeness is replaced with someone else's using AI technologies. They can be used to create convincing but fake videos or audio recordings.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-800">Detection modes:</h3>
              <ul className="text-sm text-gray-600 mt-1 space-y-2">
                <li>
                  <span className="font-medium">Standard:</span> Quick analysis focusing on basic facial and audio inconsistencies.
                </li>
                <li>
                  <span className="font-medium">Advanced:</span> More detailed analysis with higher accuracy, examining expressions, lighting, and more.
                </li>
                <li>
                  <span className="font-medium">Forensic:</span> In-depth analysis with comprehensive metrics and detailed explanations.
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-800">Accuracy Information:</h3>
              <p className="text-sm text-gray-600 mt-1">
                Our detection system is continuously improving but may not catch all manipulated media. Higher confidence scores indicate greater certainty in the result.
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Tips for Detection</h2>
          <ul className="space-y-3 text-sm text-gray-600">
            <li className="flex">
              <Check className="text-green-500 mr-2 flex-shrink-0" size={18} />
              <span>Look for unnatural eye blinking patterns</span>
            </li>
            <li className="flex">
              <Check className="text-green-500 mr-2 flex-shrink-0" size={18} />
              <span>Check for inconsistent lighting on the face</span>
            </li>
            <li className="flex">
              <Check className="text-green-500 mr-2 flex-shrink-0" size={18} />
              <span>Watch for unnatural facial movements</span>
            </li>
            <li className="flex">
              <Check className="text-green-500 mr-2 flex-shrink-0" size={18} />
              <span>Listen for audio-visual synchronization issues</span>
            </li>
            <li className="flex">
              <Check className="text-green-500 mr-2 flex-shrink-0" size={18} />
              <span>Check for artifacts around the face edges</span>
            </li>
            <li className="flex">
              <Check className="text-green-500 mr-2 flex-shrink-0" size={18} />
              <span>Be suspicious of unusual facial distortions</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
);
};

export default DeepfakeDetection;