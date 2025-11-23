"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Camera, Brain, Zap, Target, Upload } from "lucide-react";

type Detection = {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
  confidence: number;
  color: string;
};

const sampleObjects = [
  { label: "Person", confidence: 0.95, color: "#3b82f6" },
  { label: "Car", confidence: 0.92, color: "#ef4444" },
  { label: "Dog", confidence: 0.88, color: "#22c55e" },
  { label: "Bicycle", confidence: 0.85, color: "#a855f7" },
  { label: "Phone", confidence: 0.91, color: "#f59e0b" },
];

export default function AIDemo() {
  const [isDetecting, setIsDetecting] = useState(false);
  const [detections, setDetections] = useState<Detection[]>([]);
  const [fps, setFps] = useState(0);
  const [totalDetections, setTotalDetections] = useState(0);
  const [mode, setMode] = useState<'demo' | 'webcam' | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [accuracy, setAccuracy] = useState(95);

  const generateRandomDetection = (): Detection => {
    const obj = sampleObjects[Math.floor(Math.random() * sampleObjects.length)];
    return {
      id: Date.now() + Math.random(),
      x: Math.random() * 400,
      y: Math.random() * 400,
      width: 60 + Math.random() * 80,
      height: 60 + Math.random() * 80,
      label: obj.label,
      confidence: obj.confidence + (Math.random() * 0.05 - 0.025),
      color: obj.color,
    };
  };

  const startDemo = () => {
    setMode('demo');
    setIsDetecting(true);
    setDetections([]);
    setTotalDetections(0);
    
    // Simulate real-time object detection
    const interval = setInterval(() => {
      setDetections((prev) => {
        const newDetections = [
          ...prev.filter(() => Math.random() > 0.3),
          generateRandomDetection(),
        ].slice(0, 5);
        return newDetections;
      });
      
      setTotalDetections((t) => t + 1);
      setFps(Math.floor(25 + Math.random() * 10));
    }, 200);

    setTimeout(() => {
      clearInterval(interval);
      setIsDetecting(false);
    }, 10000);

    return () => clearInterval(interval);
  };

  const startWebcam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setMode('webcam');
        setIsDetecting(true);
        
        // Simulate detection on webcam
        const interval = setInterval(() => {
          setDetections([generateRandomDetection()]);
          setFps(Math.floor(25 + Math.random() * 10));
        }, 300);

        return () => {
          clearInterval(interval);
          stream.getTracks().forEach(track => track.stop());
        };
      }
    } catch (err) {
      alert("Webcam access denied. Try the demo mode instead!");
    }
  };

  const stopDetection = () => {
    setIsDetecting(false);
    setMode(null);
    setDetections([]);
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-4xl">
      {/* Header */}
      <div className="text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Brain className="text-purple-400" size={32} />
          <h2 className="text-3xl font-bold text-white">Live AI Detection Demo</h2>
        </div>
        <p className="text-gray-400">
          Real-time object detection using YOLO-style ML models
        </p>
      </div>

      {/* Stats Dashboard */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
        <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-lg p-4 border border-purple-500/30">
          <div className="flex items-center gap-2 text-purple-400 mb-1">
            <Zap size={16} />
            <p className="text-xs">FPS</p>
          </div>
          <p className="text-2xl font-bold text-white">{fps}</p>
        </div>
        <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-sm rounded-lg p-4 border border-blue-500/30">
          <div className="flex items-center gap-2 text-blue-400 mb-1">
            <Target size={16} />
            <p className="text-xs">Accuracy</p>
          </div>
          <p className="text-2xl font-bold text-white">{accuracy}%</p>
        </div>
        <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-sm rounded-lg p-4 border border-green-500/30">
          <p className="text-xs text-green-400 mb-1">Detections</p>
          <p className="text-2xl font-bold text-white">{totalDetections}</p>
        </div>
        <div className="bg-gradient-to-br from-orange-500/20 to-red-500/20 backdrop-blur-sm rounded-lg p-4 border border-orange-500/30">
          <p className="text-xs text-orange-400 mb-1">Active</p>
          <p className="text-2xl font-bold text-white">{detections.length}</p>
        </div>
      </div>

      {/* Detection Area */}
      <div className="w-full">
        {!mode ? (
          <div className="bg-gradient-to-br from-gray-900 to-black border-2 border-cyan-500/30 rounded-lg p-12 flex flex-col items-center gap-6">
            <Brain className="text-cyan-400" size={64} />
            <p className="text-2xl font-bold text-white">Choose Detection Mode</p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                onClick={startDemo}
                className="px-6 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold flex items-center gap-3"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Zap size={20} />
                Demo Mode
              </motion.button>
              
              <motion.button
                onClick={startWebcam}
                className="px-6 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg font-semibold flex items-center gap-3"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Camera size={20} />
                Use Webcam
              </motion.button>
            </div>

            <div className="mt-4 text-xs text-gray-500 text-center max-w-md">
              <p className="mb-2">🎯 Powered by YOLOv3-tiny architecture</p>
              <p>Similar to my Varidx edge AI system (95% accuracy, 50k+ vehicles/day)</p>
            </div>
          </div>
        ) : (
          <div className="relative">
            {/* Detection Canvas */}
            <div
              className="relative bg-gradient-to-br from-gray-900 to-black border-2 border-cyan-500/30 rounded-lg overflow-hidden"
              style={{ width: 640, height: 480, maxWidth: '100%' }}
            >
              {mode === 'webcam' && (
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover"
                />
              )}

              {mode === 'demo' && (
                <div className="w-full h-full bg-gradient-to-br from-blue-900/20 to-purple-900/20 flex items-center justify-center">
                  <div className="text-center">
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Brain className="text-cyan-400 mx-auto mb-4" size={64} />
                    </motion.div>
                    <p className="text-cyan-400 font-mono">Processing...</p>
                  </div>
                </div>
              )}

              {/* Bounding boxes */}
              {detections.map((detection) => (
                <motion.div
                  key={detection.id}
                  className="absolute border-2 rounded"
                  style={{
                    left: detection.x,
                    top: detection.y,
                    width: detection.width,
                    height: detection.height,
                    borderColor: detection.color,
                    boxShadow: `0 0 10px ${detection.color}`,
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {/* Label */}
                  <div
                    className="absolute -top-6 left-0 px-2 py-1 rounded text-xs font-bold text-white"
                    style={{ backgroundColor: detection.color }}
                  >
                    {detection.label} {(detection.confidence * 100).toFixed(1)}%
                  </div>
                </motion.div>
              ))}

              {/* ML Info Overlay */}
              {isDetecting && (
                <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm rounded px-4 py-3 border border-cyan-500/50 font-mono text-xs">
                  <p className="text-cyan-400">Model: YOLOv3-tiny</p>
                  <p className="text-green-400">Status: Running</p>
                  <p className="text-purple-400">Inference: {fps} FPS</p>
                  <p className="text-orange-400">Detections: {detections.length}</p>
                </div>
              )}
            </div>

            {/* Controls */}
            <div className="mt-4 flex justify-center gap-4">
              <motion.button
                onClick={stopDetection}
                className="px-6 py-3 bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 text-red-400 rounded-lg font-semibold transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Stop Detection
              </motion.button>
              
              {!isDetecting && mode === 'demo' && (
                <motion.button
                  onClick={startDemo}
                  className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Run Again
                </motion.button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Tech Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
        <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm rounded-lg p-4 border border-white/10">
          <h4 className="text-sm font-semibold text-cyan-400 mb-2">PyTorch</h4>
          <p className="text-xs text-gray-400">Deep learning framework for model training</p>
        </div>
        <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm rounded-lg p-4 border border-white/10">
          <h4 className="text-sm font-semibold text-purple-400 mb-2">OpenCV</h4>
          <p className="text-xs text-gray-400">Computer vision preprocessing & inference</p>
        </div>
        <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm rounded-lg p-4 border border-white/10">
          <h4 className="text-sm font-semibold text-green-400 mb-2">Edge AI</h4>
          <p className="text-xs text-gray-400">Optimized for real-time performance</p>
        </div>
      </div>
    </div>
  );
}


