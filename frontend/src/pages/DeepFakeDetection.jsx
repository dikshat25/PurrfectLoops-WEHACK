import React, { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import Webcam from 'react-webcam';
import { 
  Download, Upload, Camera, Check, X, AlertTriangle, 
  FileText, Clock, ChevronDown, BarChart2, Shield, Info,
  PlayCircle, StopCircle, RefreshCw, Save, Share2
} from 'lucide-react';
import '../styles/deepfake.css';

// Split into smaller components for better maintainability
const VideoPreview = ({ videoURL, title }) => {
  if (!videoURL) return null;
  
  return (
    <div className="mb-4">
      <h3 className="text-md font-medium mb-2">{title || 'Preview'}:</h3>
      <video 
        src={videoURL} 
        controls 
        className="w-full rounded-lg border border-gray-200"
      />
    </div>
  );
};

const ResultDetails = ({ results, detectionMode }) => {
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

const AnalysisHistory = ({ analysisHistory, isOpen, onClose, onLoadResult }) => {
  if (!isOpen) return null;
  
  return (
    <div className="mb-6 bg-white p-4 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-semibold flex items-center">
          <Clock className="mr-2" size={18} /> Recent Analysis History
        </h2>
        <button 
          className="p-1 rounded-full hover:bg-gray-200"
          onClick={onClose}
          aria-label="Close history"
        >
          <X size={18} />
        </button>
      </div>
      
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
                    <button 
                      className="text-blue-600 hover:text-blue-800 mr-2" 
                      title="Load this result"
                      onClick={() => onLoadResult(item)}
                      aria-label="Load result"
                    >
                      <RefreshCw size={16} />
                    </button>
                    <button 
                      className="text-blue-600 hover:text-blue-800" 
                      title="Download report"
                      onClick={() => handleDownloadReport(item)}
                      aria-label="Download report"
                    >
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
  );
};

const TutorialModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  
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
            onClick={onClose}
          >
            Close Tutorial
          </button>
        </div>
      </div>
    </div>
  );
};

// Main component
const DeepfakeDetection = () => {
  // States
  const [mode, setMode] = useState('upload');
  const [isRecording, setIsRecording] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [videoURL, setVideoURL] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const [detectionMode, setDetectionMode] = useState(() => {
    // Load from localStorage if available
    return localStorage.getItem('preferredDetectionMode') || 'standard';
  });
  const [historyOpen, setHistoryOpen] = useState(false);
  const [analysisHistory, setAnalysisHistory] = useState(() => {
    // Load from localStorage if available
    try {
      const saved = localStorage.getItem('analysisHistory');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error("Failed to load history:", e);
      return [];
    }
  });
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [showTutorial, setShowTutorial] = useState(false);
  const [compareMode, setCompareMode] = useState(false);
  const [comparisonVideo, setComparisonVideo] = useState(null);
  const [loadingCamera, setLoadingCamera] = useState(false);

  // Refs
  const webcamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const fileInputRef = useRef(null);
  const comparisonFileRef = useRef(null);
  const timerRef = useRef(null);

  // Save detection mode preference
  useEffect(() => {
    localStorage.setItem('preferredDetectionMode', detectionMode);
  }, [detectionMode]);

  // Save analysis history
  useEffect(() => {
    try {
      localStorage.setItem('analysisHistory', JSON.stringify(analysisHistory.slice(0, 10)));
    } catch (e) {
      console.error("Failed to save history:", e);
    }
  }, [analysisHistory]);

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

  // Format time for display
  const formatTimecode = useCallback((seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }, []);

  // Generate mock detection details with improved randomization
  const generateMockDetectionDetails = useCallback((isFake) => {
    // Generate more detailed analysis based on detection mode
    const variability = Math.random() * 0.15; // 15% variability
    const baseConfidence = isFake ? 0.75 : 0.20; // Base confidence values
    const confidence = Math.min(0.95, Math.max(0.05, baseConfidence + (Math.random() - 0.5) * variability)) * 100;
    
    if (detectionMode === 'standard') {
      return {
        facialAnalysis: isFake ? 'Abnormal facial features detected' : 'Normal facial features',
        audioAnalysis: isFake ? 'Audio-visual synchronization issues' : 'Audio-visual synchronization normal',
        confidence: Math.round(confidence)
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
        confidence: Math.round(confidence)
      };
    } else {
      // Forensic mode
      const subConfidence = (base) => Math.round(Math.min(95, Math.max(70, base + (Math.random() - 0.5) * 15)));
      
      return {
        facialAnalysis: {
          eyeBlinking: { 
            status: isFake ? 'Irregular' : 'Natural',
            confidence: subConfidence(isFake ? 85 : 88),
            details: isFake ? 'Unnatural patterns detected at 0:12, 0:18, and 0:23' : 'Normal blink rate of 15-20 blinks per minute'
          },
          faceEdges: {
            status: isFake ? 'Artifacts detected' : 'Clean',
            confidence: subConfidence(isFake ? 82 : 90),
            details: isFake ? 'Digital artifacts detected along jawline and hairline' : 'No visible artifacts along facial boundaries'
          },
          expressions: {
            status: isFake ? 'Unnatural transitions' : 'Natural transitions',
            confidence: subConfidence(isFake ? 84 : 86),
            details: isFake ? 'Micro-expression inconsistencies at 0:05-0:07' : 'Consistent emotional expressions throughout'
          }
        },
        audioAnalysis: {
          lipSync: {
            status: isFake ? 'Misaligned' : 'Aligned',
            confidence: subConfidence(isFake ? 88 : 84),
            details: isFake ? 'Audio leads visual by 120-180ms in sections 0:15-0:22' : 'Audio-visual alignment within normal parameters'
          },
          voicePrint: {
            status: isFake ? 'Synthetic patterns detected' : 'Natural patterns',
            confidence: subConfidence(isFake ? 86 : 88),
            details: isFake ? 'Voice frequency analysis shows synthetic patterns' : 'Voice frequency distribution consistent with human speech'
          }
        },
        metadata: {
          compressionAnalysis: isFake ? 'Multiple compression artifacts detected' : 'Normal compression patterns',
          editingTraces: isFake ? 'Evidence of digital manipulation in frame data' : 'No evidence of manipulation',
          sourceComparison: isFake ? 'Source inconsistencies detected' : 'Consistent source signature'
        },
        confidence: Math.round(confidence)
      };
    }
  }, [detectionMode]);

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

  // Create video URL when recording stops
  useEffect(() => {
    if (recordedChunks.length > 0 && !isRecording) {
      const blob = new Blob(recordedChunks, { type: 'video/webm' });
      const url = URL.createObjectURL(blob);
      setVideoURL(url);
    }
  }, [recordedChunks, isRecording]);

  // Handle webcam mode changes
  useEffect(() => {
    if (mode === 'record') {
      setLoadingCamera(true);
      // Camera will be loaded automatically by the Webcam component
      const timeout = setTimeout(() => setLoadingCamera(false), 2000);
      return () => clearTimeout(timeout);
    } else {
      if (mediaRecorderRef.current && isRecording) {
        handleStopRecording();
      }
    }
  }, [mode, isRecording, handleStopRecording]);

  // Cleanup URLs on unmount
  useEffect(() => {
    return () => {
      if (videoURL) URL.revokeObjectURL(videoURL);
      if (comparisonVideo) URL.revokeObjectURL(comparisonVideo);
    };
  }, [videoURL, comparisonVideo]);

  const handleFileUpload = useCallback((e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setResults(null);
    setError(null);
    
    // Revoke previous URL if it exists
    if (videoURL) URL.revokeObjectURL(videoURL);
    setVideoURL(null);
    
    if (!file.type.includes('video/')) {
      setError('Please upload a video file. Supported formats: MP4, WebM, MOV.');
      setUploadedFile(null);
      return;
    }
    
    // Check file size
    if (file.size > 100 * 1024 * 1024) { // 100MB limit
      setError('File size exceeds the 100MB limit. Please upload a smaller video.');
      setUploadedFile(null);
      return;
    }
    
    setUploadedFile(file);
    setVideoURL(URL.createObjectURL(file));
  }, [videoURL]);

  const handleComparisonUpload = useCallback((e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    if (!file.type.includes('video/')) {
      setError('Please upload a video file for comparison. Supported formats: MP4, WebM, MOV.');
      return;
    }
    
    // Check file size
    if (file.size > 100 * 1024 * 1024) { // 100MB limit
      setError('Comparison file size exceeds the 100MB limit. Please upload a smaller video.');
      return;
    }
    
    // Revoke previous URL if it exists
    if (comparisonVideo) URL.revokeObjectURL(comparisonVideo);
    
    setComparisonVideo(URL.createObjectURL(file));
  }, [comparisonVideo]);

  const handleAnalyzeVideo = useCallback(async () => {
    if (!videoURL) {
      setError('No video available for analysis. Please record or upload a video.');
      return;
    }
    
    setAnalyzing(true);
    setError(null);
    setResults(null);
    
    try {
      // Simulate analysis time based on detection mode with slight randomization
      const baseTime = detectionMode === 'standard' ? 2000 : 
                      detectionMode === 'advanced' ? 4000 : 6000;
      const analysisTime = baseTime + Math.random() * 1000;
      
      await new Promise(resolve => setTimeout(resolve, analysisTime));
      
      // Ensure better randomization for demo purposes
      const randomSeed = Date.now(); // Use timestamp for seed
      const pseudoRandom = () => {
        return ((randomSeed * 9301 + 49297) % 233280) / 233280;
      };
      
      const isFake = pseudoRandom() > 0.5;
      const detectionDetails = generateMockDetectionDetails(isFake);
      
      // Create a list of potential inconsistencies
      const allInconsistencies = [
        'Unnatural eye blinking patterns',
        'Facial boundary artifacts',
        'Audio-visual sync issues',
        'Inconsistent lighting effects',
        'Unnatural facial expressions',
        'Anomalies in voice frequency',
        'Digital manipulation artifacts',
        'Multiple compression signatures'
      ];
      
      // Randomly select 1-4 inconsistencies if fake
      const shuffled = [...allInconsistencies].sort(() => 0.5 - Math.random());
      const selectedInconsistencies = isFake ? shuffled.slice(0, Math.floor(Math.random() * 3) + 1) : [];
      
      const newResult = {
        isDeepfake: isFake,
        confidenceScore: detectionDetails.confidence,
        detectedInconsistencies: selectedInconsistencies,
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
      console.error("Analysis error:", err);
      setError('Failed to analyze the video. Please try again or use a different video file.');
      setAnalyzing(false);
    }
  }, [videoURL, mode, detectionMode, recordingDuration, uploadedFile, generateMockDetectionDetails]);

  const handleDownloadReport = useCallback((reportData = results) => {
    if (!reportData) return;
    
    const formattedReport = {
      ...reportData,
      analyzedAt: new Date(reportData.analyzedAt).toLocaleString(),
      videoSource: reportData.videoSource,
      analysisVersion: '2.5.0',
      applicationName: 'DeepFake Detector',
      generatedOn: new Date().toLocaleString()
    };
    
    // Create a formatted JSON string with indentation
    const reportString = JSON.stringify(formattedReport, null, 2);
    
    // Create a blob and download link
    const blob = new Blob([reportString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `deepfake-report-${reportData.reportId}.json`;
    document.body.appendChild(a);
    a.click();
    
    // Cleanup
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 100);
  }, [results]);

  const handleShareResults = useCallback(() => {
    if (!results) return;
    
    // Create share URL or text
    const shareText = `DeepFake Analysis Report: Video was determined to be ${results.isDeepfake ? 'potentially fake' : 'likely authentic'} with ${results.confidenceScore}% confidence. Report ID: ${results.reportId}`;
    
    // Check if Web Share API is supported
    if (navigator.share) {
      navigator.share({
        title: 'DeepFake Detection Results',
        text: shareText,
      })
      .catch(error => {
        console.error('Error sharing:', error);
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(shareText)
          .then(() => alert('Results copied to clipboard!'))
          .catch(err => console.error('Failed to copy:', err));
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(shareText)
        .then(() => alert('Results copied to clipboard!'))
        .catch(err => console.error('Failed to copy:', err));
    }
  }, [results]);

  const handleLoadResult = useCallback((historicalResult) => {
    setResults(historicalResult);
    setHistoryOpen(false);
  }, []);

  // Calculate total analyzed videos count
  const totalAnalyzedCount = useMemo(() => analysisHistory.length, [analysisHistory]);
  
  // Calculate fake detection ratio
  const fakeDetectionRatio = useMemo(() => {
    if (analysisHistory.length === 0) return 0;
    const fakeCount = analysisHistory.filter(item => item.isDeepfake).length;
    return Math.round((fakeCount / analysisHistory.length) * 100);
  }, [analysisHistory]);

  return (
    <div className="bg-gray-50 min-h-screen p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6 bg-white rounded-lg shadow-md p-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800 flex items-center">
              <Shield className="mr-2 text-blue-600" size={24} />
              DeepFake Detection Tool
            </h1>
            <div className="flex space-x-2">
              <button
                className="p-2 text-gray-600 hover:text-blue-600 flex items-center"
                onClick={() => setHistoryOpen(!historyOpen)}
                aria-label="View history"
              >
                <Clock className="mr-1" size={18} />
                <span className="hidden sm:inline">History</span>
              </button>
              <button
                className="p-2 text-gray-600 hover:text-blue-600 flex items-center"
                onClick={() => setShowTutorial(true)}
                aria-label="Show tutorial"
              >
                <Info className="mr-1" size={18} />
                <span className="hidden sm:inline">Tutorial</span>
              </button>
            </div>
          </div>
          
          {/* Stats summary */}
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="bg-blue-50 p-3 rounded-md">
              <div className="text-sm text-gray-600">Total Videos Analyzed</div>
              <div className="text-xl font-bold text-blue-700">{totalAnalyzedCount}</div>
            </div>
            <div className="bg-blue-50 p-3 rounded-md">
              <div className="text-sm text-gray-600">Fake Detection Rate</div>
              <div className="text-xl font-bold text-blue-700">{fakeDetectionRatio}%</div>
            </div>
          </div>
        </div>
        
        {/* Analysis History Panel */}
        <AnalysisHistory 
          analysisHistory={analysisHistory}
          isOpen={historyOpen}
          onClose={() => setHistoryOpen(false)}
          onLoadResult={handleLoadResult}
        />
        
        {/* Main Control Panel */}
        <div className="mb-6 bg-white rounded-lg shadow-md p-4">
          <h2 className="text-lg font-semibold mb-4">Analysis Controls</h2>
          
          {/* Input Mode Selection */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Input Method</label>
            <div className="flex space-x-2">
              <button
                className={`flex-1 py-2 px-4 rounded-md flex justify-center items-center ${mode === 'upload' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                onClick={() => setMode('upload')}
              >
                <Upload className="mr-2" size={16} />
                Upload Video
              </button>
              <button
                className={`flex-1 py-2 px-4 rounded-md flex justify-center items-center ${mode === 'record' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                onClick={() => setMode('record')}
              >
                <Camera className="mr-2" size={16} />
                Record Video
              </button>
            </div>
          </div>
          
          {/* Detection Mode Selection */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Detection Mode</label>
            <div className="relative">
              <select
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                value={detectionMode}
                onChange={(e) => setDetectionMode(e.target.value)}
              >
                <option value="standard">Standard (Quick Analysis)</option>
                <option value="advanced">Advanced (Detailed Analysis)</option>
                <option value="forensic">Forensic (Comprehensive Analysis)</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <ChevronDown className="h-4 w-4 text-gray-400" />
              </div>
            </div>
            <p className="mt-1 text-sm text-gray-500">
              {detectionMode === 'standard' ? 'Basic detection with 70-80% accuracy (~2s)' : 
               detectionMode === 'advanced' ? 'Enhanced detection with 85-90% accuracy (~4s)' : 
               'Maximum detection with 90-95% accuracy (~6s)'}
            </p>
          </div>
          
          {/* Comparison Mode Toggle */}
          <div className="mb-4">
            <div className="flex items-center">
              <input
                id="compareMode"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                checked={compareMode}
                onChange={(e) => setCompareMode(e.target.checked)}
              />
              <label htmlFor="compareMode" className="ml-2 block text-sm text-gray-700">
                Enable Comparison Mode (compare with reference video)
              </label>
            </div>
          </div>
          
          {/* Webcam/Upload Area */}
          <div className="mb-4">
            {mode === 'record' ? (
              <div className="mb-4">
                <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
                  {loadingCamera && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white">
                      <div className="flex flex-col items-center">
                        <RefreshCw className="animate-spin h-8 w-8 mb-2" />
                        <span>Initializing camera...</span>
                      </div>
                    </div>
                  )}
                  
                  <Webcam
                    audio={true}
                    ref={webcamRef}
                    videoConstraints={{
                      facingMode: "user",
                      width: { ideal: 1280 },
                      height: { ideal: 720 }
                    }}
                    className="w-full h-full object-cover"
                  />
                  
                  {isRecording && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs flex items-center">
                      <div className="w-2 h-2 rounded-full bg-white mr-1 animate-pulse"></div>
                      REC {formatTimecode(recordingDuration)}
                    </div>
                  )}
                </div>
                
                <div className="flex justify-center mt-2">
                  {!isRecording ? (
                    <button
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
                      onClick={handleStartRecording}
                      disabled={loadingCamera}
                    >
                      <PlayCircle className="mr-2" size={16} />
                      Start Recording
                    </button>
                  ) : (
                    <button
                      className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 flex items-center"
                      onClick={handleStopRecording}
                    >
                      <StopCircle className="mr-2" size={16} />
                      Stop Recording
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="mb-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    accept="video/*"
                    className="hidden"
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
                  >
                    <Upload className="mr-2" size={16} />
                    Select Video File
                  </button>
                  <p className="mt-2 text-sm text-gray-500">Supported formats: MP4, WebM, MOV</p>
                  
                  {uploadedFile && (
                    <p className="mt-2 text-sm font-medium text-gray-700">
                      Selected: {uploadedFile.name} ({(uploadedFile.size / (1024 * 1024)).toFixed(2)} MB)
                    </p>
                  )}
                </div>
              </div>
            )}
            
            {/* Comparison Upload (if comparison mode is enabled) */}
            {compareMode && (
              <div className="mt-4 mb-4">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Reference Video for Comparison</h3>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center">
                  <input
                    type="file"
                    ref={comparisonFileRef}
                    onChange={handleComparisonUpload}
                    accept="video/*"
                    className="hidden"
                  />
                  <button
                    onClick={() => comparisonFileRef.current?.click()}
                    className="px-3 py-1 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 flex items-center text-sm"
                  >
                    <Upload className="mr-1" size={14} />
                    Upload Reference Video
                  </button>
                  
                  {comparisonVideo && (
                    <p className="mt-2 text-xs font-medium text-gray-700">
                      Reference video uploaded
                    </p>
                  )}
                </div>
              </div>
            )}
            
            {/* Preview Section */}
            <VideoPreview videoURL={videoURL} title="Video to Analyze" />
            
            {compareMode && comparisonVideo && (
              <VideoPreview videoURL={comparisonVideo} title="Reference Video" />
            )}
            
            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 my-4">
                <div className="flex items-center">
                  <AlertTriangle className="text-red-500 mr-2" size={16} />
                  <p className="text-red-700">{error}</p>
                </div>
              </div>
            )}
            
            {/* Analysis Button */}
            <div className="mt-4">
              <button
                className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center justify-center disabled:bg-blue-300"
                onClick={handleAnalyzeVideo}
                disabled={!videoURL || analyzing}
              >
                {analyzing ? (
                  <>
                    <RefreshCw className="animate-spin mr-2" size={18} />
                    Analyzing Video...
                  </>
                ) : (
                  <>
                    <BarChart2 className="mr-2" size={18} />
                    Analyze Video
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
        
        {/* Results Panel */}
        {results && (
          <div className="mb-6 bg-white rounded-lg shadow-md p-4 animate-fadeIn">
            <h2 className="text-lg font-semibold mb-4 flex items-center">
              Analysis Results
              <span className="ml-2 text-xs px-2 py-1 rounded-full bg-gray-200">
                {results.reportId}
              </span>
            </h2>
            
            <div className="p-4 rounded-md mb-4 flex items-start" 
                 style={{ backgroundColor: results.isDeepfake ? '#FEF2F2' : '#F0FDF4' }}>
              <div className="mr-4">
                {results.isDeepfake ? (
                  <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                    <AlertTriangle className="h-6 w-6 text-red-600" />
                  </div>
                ) : (
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                    <Check className="h-6 w-6 text-green-600" />
                  </div>
                )}
              </div>
              <div>
                <h3 className="text-lg font-bold" style={{ color: results.isDeepfake ? '#DC2626' : '#10B981' }}>
                  {results.isDeepfake ? 'Potentially Manipulated Video' : 'Likely Authentic Video'}
                </h3>
                <p className="text-gray-700">
                  {results.isDeepfake 
                    ? 'Our analysis detected signs of possible manipulation.' 
                    : 'No significant indicators of manipulation were detected.'}
                </p>
                <div className="mt-2">
                  <div className="text-sm font-medium text-gray-700">Confidence Score: {results.confidenceScore}%</div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                    <div 
                      className={`h-2 rounded-full ${results.isDeepfake ? 'bg-red-500' : 'bg-green-500'}`}
                      style={{ width: `${results.confidenceScore}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Detection Details Section */}
            <ResultDetails results={results} detectionMode={detectionMode} />
            
            {/* Detected Inconsistencies Section */}
            {results.isDeepfake && results.detectedInconsistencies.length > 0 && (
              <div className="bg-white rounded-md p-4 mb-4 border border-red-200">
                <h3 className="font-bold mb-2">Detected Inconsistencies:</h3>
                <ul className="list-disc ml-5 space-y-1">
                  {results.detectedInconsistencies.map((item, index) => (
                    <li key={index} className="text-gray-700">{item}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {/* Action Buttons */}
            <div className="flex space-x-2 mt-4">
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex-1 flex items-center justify-center"
                onClick={() => handleDownloadReport()}
              >
                <FileText className="mr-2" size={16} />
                Download Report
              </button>
              <button
                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 flex-1 flex items-center justify-center"
                onClick={handleShareResults}
              >
                <Share2 className="mr-2" size={16} />
                Share Results
              </button>
            </div>
          </div>
        )}
        
        {/* Information Panel */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-lg font-semibold mb-2">About This Tool</h2>
          <p className="text-gray-700 mb-4">
            This deepfake detection tool uses advanced AI to analyze videos for signs of manipulation.
            Select a detection mode based on your needs - Standard for quick checks, Advanced for more
            detail, or Forensic for maximum accuracy.
          </p>
          <p className="text-sm text-gray-500">
            Note: This is a demonstration. In a production environment, videos would be analyzed
            by our sophisticated AI models running on secure servers.
          </p>
        </div>
      </div>
      
      {/* Tutorial Modal */}
      <TutorialModal 
        isOpen={showTutorial} 
        onClose={() => setShowTutorial(false)} 
      />
    </div>
  );
};

export default DeepfakeDetection;
    
    
    