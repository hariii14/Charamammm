import React, { useState, useRef, useEffect } from "react";
import { Category, Memorial, ObjectStats } from "../types";
import {
  X,
  Camera,
  Upload,
  RefreshCw,
  Wand2,
  Sparkles,
  Zap,
  Eye,
  CheckCircle2,
  ScanLine,
} from "lucide-react";
import { MemorialEmblem } from "./MemorialEmblem";
import { getFallbackEngraving, handleImageError } from "../utils/imageFallback";
import {
  analyzeImageSpecimen,
  generateClientAnalysisFallback,
  FAMOUS_SUPERHEROES,
} from "../utils/visionService";

interface CreateMemorialModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveMemorial: (memorial: Memorial) => void;
}

export const CreateMemorialModal: React.FC<CreateMemorialModalProps> = ({
  isOpen,
  onClose,
  onSaveMemorial,
}) => {
  const [photoMode, setPhotoMode] = useState<"upload" | "camera">("camera");
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);

  // Vision Analysis State
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisNotice, setAnalysisNotice] = useState<{
    isHuman: boolean;
    title: string;
    subtitle: string;
    heroName?: string;
  } | null>(null);
  const [analyzedStats, setAnalyzedStats] = useState<ObjectStats | null>(null);
  const [liveScannerTick, setLiveScannerTick] = useState(0);

  // Form fields
  const [name, setName] = useState("");
  const [category, setCategory] = useState<Category>("Electronics");
  const [causeOfDeath, setCauseOfDeath] = useState("");
  const [story, setStory] = useState("");
  const [bornYear, setBornYear] = useState("2021");
  const [departedYear, setDepartedYear] = useState("2026");
  const [aiObituaryEnabled, setAiObituaryEnabled] = useState(true);
  const [obituaryText, setObituaryText] = useState("");
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);

  // Theatrical creation state
  const [creationStep, setCreationStep] = useState<"form" | "theatrical">("form");
  const [theatricalStage, setTheatricalStage] = useState<number>(0);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!isOpen) {
      stopCamera();
    } else if (photoMode === "camera" && !capturedImage) {
      startCamera();
    }
  }, [isOpen, photoMode, capturedImage]);

  // Dynamic live camera scanner tick
  useEffect(() => {
    if (!isCameraActive) return;
    const interval = setInterval(() => {
      setLiveScannerTick((prev) => (prev + 1) % 4);
    }, 2200);
    return () => clearInterval(interval);
  }, [isCameraActive]);

  const startCamera = async () => {
    setCameraError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "environment",
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      });
      mediaStreamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      setIsCameraActive(true);
    } catch (err) {
      console.error("Camera access error:", err);
      setCameraError(
        "Unable to access device camera. Please check permissions or upload a photographic plate.",
      );
      setIsCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null;
    }
    setIsCameraActive(false);
  };

  /**
   * Automatically analyze the captured or uploaded photo using Gemini Vision,
   * detecting all objects or elevating humans to Marvel/DC Superheroes!
   */
  const runAnalysis = async (imageData: string, forceHero?: boolean) => {
    setIsAnalyzing(true);
    setAnalysisNotice(null);

    try {
      let result;
      if (forceHero) {
        result = generateClientAnalysisFallback(imageData, true);
      } else {
        result = await analyzeImageSpecimen(imageData);
      }

      // Populate form fields automatically
      setName(result.name);
      setCategory(result.category);
      if (result.bornYear) setBornYear(result.bornYear);
      if (result.departedYear) setDepartedYear(result.departedYear);
      if (result.causeOfDeath) setCauseOfDeath(result.causeOfDeath);
      if (result.story) setStory(result.story);
      if (result.obituaryText) setObituaryText(result.obituaryText);
      if (result.stats) setAnalyzedStats(result.stats);

      if (result.isHuman) {
        setAnalysisNotice({
          isHuman: true,
          heroName: result.heroName || result.name,
          title: `HUMAN DETECTED • ELEVATED TO: ${result.name.toUpperCase()}`,
          subtitle: `A mortal human was identified in the photographic plate. Under Gazette Rule 409, they have been honored as a Marvel/DC Superhero who met an ordinary domestic demise.`,
        });
      } else {
        setAnalysisNotice({
          isHuman: false,
          title: `SPECIMEN IDENTIFIED: ${result.name.toUpperCase()}`,
          subtitle: `Forensic classification: ${result.category}. Broadsheet fields, chronology, and cause of demise have been automatically completed.`,
        });
      }
    } catch (err) {
      console.error("Analysis failure, applying fallback:", err);
      const fallback = generateClientAnalysisFallback(imageData, forceHero);
      setName(fallback.name);
      setCategory(fallback.category);
      setBornYear(fallback.bornYear);
      setDepartedYear(fallback.departedYear);
      setCauseOfDeath(fallback.causeOfDeath);
      setStory(fallback.story);
      setObituaryText(fallback.obituaryText);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleCapturePhoto = () => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current || document.createElement("canvas");
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL("image/jpeg", 0.85);
      setCapturedImage(dataUrl);
      stopCamera();
      // Instantly trigger AI recognition and auto-fill!
      runAnalysis(dataUrl);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          const dataUrl = event.target.result as string;
          setCapturedImage(dataUrl);
          // Instantly trigger AI recognition and auto-fill!
          runAnalysis(dataUrl);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          const dataUrl = event.target.result as string;
          setCapturedImage(dataUrl);
          // Instantly trigger AI recognition and auto-fill!
          runAnalysis(dataUrl);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerateObituary = () => {
    setIsGeneratingAi(true);
    setTimeout(() => {
      const objectName = name || "This noble object";
      const reason = causeOfDeath || "sudden cessation of physical purpose";

      const templates = [
        `It spent ${Math.max(1, parseInt(departedYear || "2026") - parseInt(bornYear || "2021"))} years searching for purpose and loyalty. It never found it. Survived by confused bystanders and a legacy of ${reason.toLowerCase()}.`,
        `A stalwart companion of modern inconvenience. It faithfully pretended to function right up until the critical second when everything depended upon it.`,
        `Born in a distant factory, destined for an unremarkable desk. It leaves behind no descendants, only a faint scratch on the wooden floor and memories of quiet disappointment.`,
        `It came into this world wrapped in bubble wrap; it left wrapped in tragedy. The tragedy of ${reason.toLowerCase()}.`,
        `Remembered fondly by those who repeatedly swore at it before gently tossing it onto a pile of discarded receipts.`,
      ];

      const chosen = templates[Math.floor(Math.random() * templates.length)];
      setObituaryText(chosen);
      setIsGeneratingAi(false);
    }, 600);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const fallbackImg = getFallbackEngraving(name || "OBJECT", category);

    const finalObituary =
      obituaryText.trim() ||
      `Departed after long and largely unacknowledged service. Cause of demise recorded officially as: ${
        causeOfDeath || "general exhaustion"
      }. May it rest undisturbed.`;

    // Trigger theatrical newspaper sequence
    setCreationStep("theatrical");
    setTheatricalStage(0);

    setTimeout(() => setTheatricalStage(1), 500);
    setTimeout(() => setTheatricalStage(2), 1400);
    setTimeout(() => setTheatricalStage(3), 2000);

    setTimeout(() => {
      const newMemorial: Memorial = {
        id: `user-${Date.now()}`,
        name: name.trim(),
        category,
        bornYear: bornYear.trim() || "2021",
        departedYear: departedYear.trim() || "2026",
        causeOfDeath: causeOfDeath.trim(),
        obituary: finalObituary,
        story: story.trim() || undefined,
        imageUrl: capturedImage || fallbackImg,
        candleCount: 1,
        rotationDeg: Math.random() * 2.6 - 1.3,
        stats: analyzedStats || {
          yearsServed: Math.max(1, parseInt(departedYear || "2026") - parseInt(bornYear || "2021")),
          knownOwners: 1,
          majorIncidents: Math.floor(Math.random() * 20) + 2,
          successfulRepairs: 0,
          lastKnownLocation: "In memoriam on the desk",
          historicalImportance: "Immense to its registrant",
        },
        comments: [
          {
            id: `c-${Date.now()}`,
            author: "Broadsheet Registrar",
            text: "Your classified obituary has been inscribed into the gazette.",
            createdAt: "Just now",
          },
        ],
        createdAt: Date.now(),
      };

      onSaveMemorial(newMemorial);
      handleReset();
      onClose();
    }, 2400);
  };

  const handleReset = () => {
    setCapturedImage(null);
    setName("");
    setCategory("Electronics");
    setCauseOfDeath("");
    setStory("");
    setBornYear("2021");
    setDepartedYear("2026");
    setObituaryText("");
    setIsAnalyzing(false);
    setAnalysisNotice(null);
    setAnalyzedStats(null);
    setCreationStep("form");
    setTheatricalStage(0);
    stopCamera();
  };

  const scannerMessages = [
    "👁️ ALIGN SPECIMEN • DETECTING FOOD, STATIONERY, TECH, OR HUMAN FORM",
    "🔍 OPTICAL SENSOR ACTIVE • EXAMINING GEOMETRY AND WEAR PATTERNS",
    "🦸 HUMAN RECOGNITION ENGAGED: ANY PERSON WILL BE ELEVATED TO SUPERHERO",
    "⚡ SHUTTER CALIBRATED • CLICK 'TAKE PHOTOGRAPH & AUTO-FILL' TO POPULATE",
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl crisp-newsprint border-4 border-[#1A1815] shadow-[8px_8px_0px_#1A1815] overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Newspaper Submission Masthead */}
        <div className="bg-[#EFE8D8] border-b-2 border-stone-900 px-5 py-3.5 flex items-center justify-between">
          <div>
            <h2 className="font-headline text-base sm:text-lg font-black text-[#1A1815] uppercase tracking-wide flex items-center gap-2">
              <span>SUBMIT CLASSIFIED OBITUARY</span>
              <span className="text-[10px] font-mono bg-stone-900 text-stone-100 px-2 py-0.5 font-normal tracking-normal">
                AI SPECIMEN SCANNER
              </span>
            </h2>
            <p className="font-typewriter text-[11px] text-stone-600">
              Broadsheet Department of Ceased Commodities • Entry Form 409
            </p>
          </div>
          {creationStep === "form" && (
            <button
              onClick={() => {
                handleReset();
                onClose();
              }}
              className="p-1 text-stone-700 hover:text-black rounded hover:bg-stone-200"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Theatrical Transition Overlay */}
        {creationStep === "theatrical" ? (
          <div className="p-10 sm:p-16 flex flex-col items-center justify-center text-center space-y-6 min-h-[420px] animate-in fade-in">
            {theatricalStage >= 1 && (
              <div className="p-3 bg-white border-2 border-stone-900 shadow-md transform -rotate-1 animate-in zoom-in-95 duration-500 max-w-[220px]">
                <img
                  src={capturedImage || getFallbackEngraving(name || "OBJECT", category)}
                  alt="Departed Object"
                  onError={(e) => handleImageError(e, name || "OBJECT", category)}
                  className="w-full aspect-[4/3] object-cover grayscale"
                />
                <p className="font-headline text-stone-900 text-lg font-bold uppercase mt-1.5 text-center truncate">
                  {name || "The Departed"}
                </p>
              </div>
            )}

            {theatricalStage >= 1 && theatricalStage < 2 && (
              <div className="space-y-2">
                <p className="font-typewriter text-xs uppercase tracking-widest text-stone-600 animate-pulse">
                  Typesetting the obituary into the printing press…
                </p>
              </div>
            )}

            {theatricalStage >= 2 && (
              <div className="space-y-3 animate-in fade-in duration-300">
                <div className="w-12 h-12 mx-auto rounded-full bg-[#EAE2CE] border-2 border-stone-900 flex items-center justify-center">
                  <MemorialEmblem size={24} glow />
                </div>
                <p className="font-newspaper text-xl italic text-stone-900">
                  “A candle of remembrance has been lit across the columns.”
                </p>
              </div>
            )}

            {theatricalStage >= 3 && (
              <div className="animate-in fade-in duration-300 space-y-1">
                <h3 className="font-headline text-3xl sm:text-4xl text-red-950 font-black uppercase ink-stamp">
                  They will be remembered.
                </h3>
                <p className="font-typewriter text-xs text-stone-600">
                  Broadside edition printed and recorded in history.
                </p>
              </div>
            )}
          </div>
        ) : (
          /* Main Form */
          <form onSubmit={handleSubmit} className="overflow-y-auto p-5 sm:p-7 space-y-6 flex-1">
            {/* Step 1: Image Capture / Upload */}
            <div className="space-y-3">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <label className="font-typewriter text-xs uppercase tracking-wider text-stone-800 font-bold">
                    1. Archival Photographic Plate *
                  </label>
                  <span className="text-[10px] font-typewriter bg-amber-200 text-stone-900 px-1.5 py-0.5 border border-amber-400 font-medium">
                    Auto-Identifies Objects & Humans
                  </span>
                </div>

                <div className="flex items-center gap-1 bg-[#EFE8D8] p-0.5 border border-stone-400">
                  <button
                    type="button"
                    onClick={() => {
                      setPhotoMode("camera");
                      if (!capturedImage) startCamera();
                    }}
                    className={`px-2.5 py-1 text-xs font-headline uppercase flex items-center gap-1 ${
                      photoMode === "camera"
                        ? "bg-stone-900 text-stone-100 font-bold"
                        : "text-stone-700 hover:text-stone-950"
                    }`}
                  >
                    <Camera className="w-3 h-3" />
                    <span>Live Shutter</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setPhotoMode("upload");
                      stopCamera();
                    }}
                    className={`px-2.5 py-1 text-xs font-headline uppercase flex items-center gap-1 ${
                      photoMode === "upload"
                        ? "bg-stone-900 text-stone-100 font-bold"
                        : "text-stone-700 hover:text-stone-950"
                    }`}
                  >
                    <Upload className="w-3 h-3" />
                    <span>Upload Plate</span>
                  </button>
                </div>
              </div>

              {/* Photo Area */}
              {capturedImage ? (
                <div className="border-2 border-stone-800 p-4 bg-[#F2EFE8] text-center space-y-3">
                  <div className="relative inline-block max-w-xs shadow-md border-2 border-stone-900 bg-white p-2">
                    <img
                      src={capturedImage}
                      alt="Preview"
                      className="w-full max-h-56 object-cover grayscale"
                    />
                    <div className="mt-1 text-xs font-typewriter text-stone-700">
                      Archival Plate Specimen
                    </div>
                  </div>

                  {/* AI Analysis in progress */}
                  {isAnalyzing && (
                    <div className="max-w-md mx-auto p-3 bg-amber-50 border-2 border-stone-900 flex items-center gap-3 text-left animate-pulse">
                      <Wand2 className="w-5 h-5 text-amber-900 shrink-0 animate-spin" />
                      <div>
                        <p className="font-headline text-xs font-bold text-stone-950 uppercase">
                          Gazette Coroner Examining Specimen...
                        </p>
                        <p className="font-typewriter text-[11px] text-stone-700">
                          Forensically inspecting object characteristics, and checking for human
                          superhero presence.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* AI Analysis Notice Result */}
                  {analysisNotice && !isAnalyzing && (
                    <div
                      className={`max-w-md mx-auto p-3 border-2 text-left space-y-1 ${
                        analysisNotice.isHuman
                          ? "bg-red-50 border-red-900 text-red-950 shadow-[2px_2px_0px_#7f1d1d]"
                          : "bg-[#FAF7EE] border-stone-900 text-stone-950 shadow-[2px_2px_0px_#1c1917]"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span
                          className={`px-1.5 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider ${
                            analysisNotice.isHuman
                              ? "bg-red-900 text-white"
                              : "bg-stone-900 text-stone-100"
                          }`}
                        >
                          {analysisNotice.isHuman
                            ? "⚡ SUPERHERO ELEVATION"
                            : "🔬 SPECIMEN RECOGNIZED"}
                        </span>
                        <span className="text-[10px] font-typewriter text-stone-600">
                          Auto-filled into broadsheet below
                        </span>
                      </div>
                      <p className="font-headline text-sm font-black uppercase tracking-wide">
                        {analysisNotice.title}
                      </p>
                      <p className="font-newspaper text-xs italic text-stone-700">
                        {analysisNotice.subtitle}
                      </p>
                    </div>
                  )}

                  {/* Quick Controls below photo */}
                  <div className="flex flex-wrap justify-center gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => {
                        setCapturedImage(null);
                        setAnalysisNotice(null);
                        if (photoMode === "camera") startCamera();
                      }}
                      className="inline-flex items-center gap-1 px-3 py-1.5 bg-stone-300 hover:bg-stone-400 text-stone-900 text-xs font-headline font-bold uppercase"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Retake Plate</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => capturedImage && runAnalysis(capturedImage)}
                      disabled={isAnalyzing}
                      className="inline-flex items-center gap-1 px-3 py-1.5 bg-stone-900 hover:bg-black text-stone-100 text-xs font-headline font-bold uppercase disabled:opacity-50"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                      <span>{isAnalyzing ? "Analyzing..." : "Re-Scan Specimen"}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => capturedImage && runAnalysis(capturedImage, true)}
                      disabled={isAnalyzing}
                      className="inline-flex items-center gap-1 px-3 py-1.5 bg-red-900 hover:bg-red-950 text-white text-xs font-headline font-bold uppercase disabled:opacity-50"
                      title="Name as Marvel or DC Superhero"
                    >
                      <Zap className="w-3.5 h-3.5 text-yellow-300" />
                      <span>Elevate as Superhero</span>
                    </button>
                  </div>
                </div>
              ) : photoMode === "camera" ? (
                <div className="border-2 border-stone-900 bg-stone-950 rounded-none text-center space-y-3 p-3">
                  {cameraError ? (
                    <div className="py-8 text-stone-300 text-xs font-newspaper space-y-3">
                      <p className="text-red-400 font-bold">{cameraError}</p>
                      <button
                        type="button"
                        onClick={startCamera}
                        className="px-4 py-2 bg-stone-100 hover:bg-white text-stone-950 text-xs font-headline font-bold uppercase"
                      >
                        Retry Camera
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {/* Live Camera Viewfinder with Archival HUD */}
                      <div className="relative aspect-video max-h-72 bg-black overflow-hidden mx-auto flex items-center justify-center border border-stone-700">
                        <video
                          ref={videoRef}
                          autoPlay
                          playsInline
                          muted
                          className="w-full h-full object-cover"
                        />

                        {/* Retro Gazette Coroner Viewfinder Overlay */}
                        <div className="absolute inset-2 pointer-events-none border border-amber-300/40 border-dashed flex flex-col justify-between p-2">
                          {/* Top HUD info */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1.5 bg-stone-950/80 text-amber-300 text-[10px] font-mono px-2 py-0.5 border border-amber-400/30">
                              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping inline-block"></span>
                              <span className="font-bold">LIVE SPECIMEN SHUTTER</span>
                            </div>
                            <div className="bg-stone-950/80 text-stone-300 text-[10px] font-mono px-2 py-0.5 border border-stone-600">
                              [AI VISION ACTIVE]
                            </div>
                          </div>

                          {/* Center Optical Crosshair */}
                          <div className="self-center flex flex-col items-center justify-center">
                            <div className="w-20 h-20 border-2 border-amber-300/60 rounded-full flex items-center justify-center relative">
                              <div className="w-1 h-3 bg-amber-400/80 absolute top-0"></div>
                              <div className="w-1 h-3 bg-amber-400/80 absolute bottom-0"></div>
                              <div className="h-1 w-3 bg-amber-400/80 absolute left-0"></div>
                              <div className="h-1 w-3 bg-amber-400/80 absolute right-0"></div>
                              <div className="w-2.5 h-2.5 bg-red-500/90 rounded-full animate-pulse"></div>
                            </div>
                            <span className="text-[9px] font-mono text-amber-200/90 tracking-widest uppercase mt-1 bg-black/60 px-1">
                              CORONER RETICLE
                            </span>
                          </div>

                          {/* Bottom ticker banner */}
                          <div className="bg-stone-950/90 text-amber-200 text-[10px] font-typewriter py-1 px-2 border border-amber-400/20 text-center truncate">
                            {scannerMessages[liveScannerTick]}
                          </div>
                        </div>
                      </div>

                      {/* Camera Control Action Buttons */}
                      <div className="flex items-center justify-center gap-2 pt-1 flex-wrap">
                        <button
                          type="button"
                          onClick={handleCapturePhoto}
                          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#EAE2CE] hover:bg-white text-stone-950 font-headline font-bold text-xs uppercase tracking-wider shadow-[2px_2px_0px_#000] border-2 border-stone-900 active:translate-y-0.5"
                        >
                          <Camera className="w-4 h-4 text-stone-900" />
                          <span>Take Photograph & Auto-Fill Details</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            if (!videoRef.current) return;
                            const video = videoRef.current;
                            const canvas = canvasRef.current || document.createElement("canvas");
                            canvas.width = video.videoWidth || 640;
                            canvas.height = video.videoHeight || 480;
                            const ctx = canvas.getContext("2d");
                            if (ctx) {
                              ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                              const dataUrl = canvas.toDataURL("image/jpeg", 0.85);
                              setCapturedImage(dataUrl);
                              stopCamera();
                              runAnalysis(dataUrl, true);
                            }
                          }}
                          className="inline-flex items-center gap-1.5 px-3 py-2 bg-red-950 hover:bg-red-900 text-amber-200 font-headline font-bold text-xs uppercase tracking-wider border-2 border-red-800 shadow-[2px_2px_0px_#000]"
                          title="Detect human subject and name as Marvel/DC superhero"
                        >
                          <Zap className="w-3.5 h-3.5 text-yellow-400" />
                          <span>Elevate as Superhero</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                /* Drag & Drop Paper Area */
                <div
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-stone-600 hover:border-stone-950 p-6 sm:p-8 bg-[#FDFBF7] hover:bg-[#F5EFE3] text-center cursor-pointer transition-colors"
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <div className="w-12 h-12 mx-auto rounded-full bg-stone-200 flex items-center justify-center text-stone-700 mb-2 border border-stone-400">
                    <Upload className="w-5 h-5" />
                  </div>
                  <p className="font-headline text-xl sm:text-2xl font-bold text-stone-900 uppercase">
                    Place photographic evidence here.
                  </p>
                  <p className="font-typewriter text-xs text-stone-600 mt-1">
                    Upload any object (food, stationery, tech, clothing) or photo with people to
                    auto-fill details!
                  </p>
                </div>
              )}
            </div>

            {/* Step 2: Object Details in Newspaper Fieldset */}
            <div className="space-y-4 pt-2 border-t-2 border-stone-900">
              <div className="flex items-center justify-between">
                <span className="font-typewriter text-xs uppercase tracking-wider text-stone-800 font-bold">
                  2. Deceased Commodity Registry (Auto-Filled by Camera)
                </span>
                {isAnalyzing && (
                  <span className="text-[10px] font-mono text-amber-900 bg-amber-200 px-2 py-0.5 border border-amber-400 animate-pulse font-bold">
                    CORONER AUTO-FILLING...
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-typewriter text-xs uppercase tracking-wider text-stone-800 block font-bold mb-1">
                    Name of Deceased Object / Superhero *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g., Tony Stark (Iron Man), Chewed Ballpoint Pen"
                    className="w-full px-3 py-2 bg-[#FDFBF7] border border-stone-400 text-sm font-newspaper text-stone-900 focus:outline-none focus:border-stone-900"
                  />
                </div>

                <div>
                  <label className="font-typewriter text-xs uppercase tracking-wider text-stone-800 block font-bold mb-1">
                    Commodity Category *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as Category)}
                    className="w-full px-3 py-2 bg-[#FDFBF7] border border-stone-400 text-sm font-newspaper text-stone-900 focus:outline-none focus:border-stone-900"
                  >
                    <option value="Electronics">Electronics</option>
                    <option value="Stationery">Stationery</option>
                    <option value="Clothing">Clothing</option>
                    <option value="Furniture">Furniture</option>
                    <option value="Toys">Toys</option>
                    <option value="Household">Household</option>
                    <option value="Miscellaneous">Miscellaneous (Superheroes / Oddities)</option>
                  </select>
                </div>
              </div>

              {/* Chronological Span */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-typewriter text-xs uppercase tracking-wider text-stone-800 block font-bold mb-1">
                    Year Incepted (Born)
                  </label>
                  <input
                    type="text"
                    value={bornYear}
                    onChange={(e) => setBornYear(e.target.value)}
                    placeholder="2021"
                    className="w-full px-3 py-2 bg-[#FDFBF7] border border-stone-400 text-sm font-newspaper text-stone-900 focus:outline-none focus:border-stone-900"
                  />
                </div>
                <div>
                  <label className="font-typewriter text-xs uppercase tracking-wider text-stone-800 block font-bold mb-1">
                    Year of Cessation (Departed)
                  </label>
                  <input
                    type="text"
                    value={departedYear}
                    onChange={(e) => setDepartedYear(e.target.value)}
                    placeholder="2026"
                    className="w-full px-3 py-2 bg-[#FDFBF7] border border-stone-400 text-sm font-newspaper text-stone-900 focus:outline-none focus:border-stone-900"
                  />
                </div>
              </div>

              {/* Cause of death */}
              <div>
                <label className="font-typewriter text-xs uppercase tracking-wider text-stone-800 block font-bold mb-1">
                  Official Cause of Demise *
                </label>
                <input
                  type="text"
                  required
                  value={causeOfDeath}
                  onChange={(e) => setCauseOfDeath(e.target.value)}
                  placeholder="e.g., Defeated by back pain from sitting on an office chair for 12 hours"
                  className="w-full px-3 py-2 bg-[#FDFBF7] border border-stone-400 text-sm font-newspaper text-stone-900 focus:outline-none focus:border-stone-900"
                />
              </div>

              {/* Eyewitness account */}
              <div>
                <label className="font-typewriter text-xs uppercase tracking-wider text-stone-800 block font-bold mb-1">
                  Eyewitness Account / Final Story (Optional)
                </label>
                <textarea
                  rows={2}
                  value={story}
                  onChange={(e) => setStory(e.target.value)}
                  placeholder="Write something poignant regarding its noble daily struggle..."
                  className="w-full px-3 py-2 bg-[#FDFBF7] border border-stone-400 text-sm font-newspaper text-stone-900 focus:outline-none focus:border-stone-900"
                />
              </div>

              {/* Broadside Eulogy */}
              <div className="bg-[#EFE8D8] border border-stone-400 p-3.5 space-y-2">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={aiObituaryEnabled}
                      onChange={(e) => setAiObituaryEnabled(e.target.checked)}
                      className="rounded-none border-stone-600 text-stone-900 focus:ring-stone-900"
                    />
                    <span className="font-typewriter text-xs text-stone-900 font-bold">
                      Automated Dramatic Eulogy Drafting
                    </span>
                  </label>
                  <button
                    type="button"
                    onClick={handleGenerateObituary}
                    disabled={isGeneratingAi}
                    className="inline-flex items-center gap-1 px-2.5 py-1 bg-stone-900 hover:bg-black text-stone-100 text-xs font-headline font-bold disabled:opacity-50"
                  >
                    <Wand2 className="w-3 h-3 text-red-300" />
                    <span>{isGeneratingAi ? "Composing..." : "Re-Compose Eulogy"}</span>
                  </button>
                </div>

                <textarea
                  rows={2}
                  value={obituaryText}
                  onChange={(e) => setObituaryText(e.target.value)}
                  placeholder="The camera or Compose button will craft an absurdly serious obituary..."
                  className="w-full px-3 py-2 bg-white border border-stone-400 text-xs font-newspaper text-stone-900 focus:outline-none focus:border-stone-900"
                />
              </div>
            </div>

            {/* Submit button */}
            <div className="pt-3 border-t-2 border-stone-900 flex items-center justify-between">
              <span className="font-typewriter text-[11px] text-stone-600 italic">
                Official Certification of Demise
              </span>
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#1A1815] text-[#F7F3E8] hover:bg-black active:scale-95 transition-all font-headline font-bold text-sm shadow-[2px_2px_0px_#000] uppercase tracking-wider"
              >
                <MemorialEmblem size={16} glow />
                <span>Publish Obituary</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
