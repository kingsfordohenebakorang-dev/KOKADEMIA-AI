"use client"

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { FileText, Sliders, Zap, CheckCircle2, Clock, Lock, FileUp, Download } from 'lucide-react';
import { cn } from '@/lib/utils';
import { MOCK_SYLLABUS } from '@/lib/syllabus';
import { MathBlock } from '@/components/MathBlock';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';

interface Question {
    id: string;
    text: string;
    marks: number;
    solution: string;
    marking_scheme: { step: string; marks: number }[];
}

interface ExamData {
    examTitle: string;
    durationMinutes: number;
    questions: Question[];
}

export default function ExamEnginePage() {
    const [phase, setPhase] = useState<'upload' | 'generate' | 'exam' | 'review'>('upload');

    // Upload & Context State
    const [isUploading, setIsUploading] = useState(false);
    const [contextText, setContextText] = useState<string>('');
    const [pastExamsUploaded, setPastExamsUploaded] = useState(false);

    // Exam Config
    const [difficulty, setDifficulty] = useState(50);
    const [numQuestions, setNumQuestions] = useState(3);

    // Live Exam State
    const [examData, setExamData] = useState<ExamData | null>(null);
    const [timeLeft, setTimeLeft] = useState(0);
    const [isGenerating, setIsGenerating] = useState(false);

    // File Input Ref
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Timer Logic
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (phase === 'exam' && timeLeft > 0) {
            interval = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
        } else if (phase === 'exam' && timeLeft === 0) {
            setPhase('review'); // Auto submit when time is up
        }
        return () => clearInterval(interval);
    }, [phase, timeLeft]);

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;
        setIsUploading(true);
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await fetch('/api/ingest', { method: 'POST', body: formData });
            const data = await res.json();
            if (data.snippet || data.textContent) {
                setContextText(data.snippet || data.textContent);
                setPastExamsUploaded(true);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setIsUploading(false);
        }
    };

    const handleGenerate = async () => {
        setIsGenerating(true);
        try {
            const res = await fetch('/api/exams/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    difficulty,
                    numQuestions,
                    contextText
                })
            });
            const data = await res.json();
            if (data.exam) {
                setExamData(data.exam);
                // Set timer based on generated duration (fallback to 60 mins)
                setTimeLeft((data.exam.durationMinutes || 60) * 60);
                setPhase('exam');
            } else {
                alert("Failed to generate exam.");
            }
        } catch (err) {
            console.error(err);
            alert("Error: Please try again later if there is a problem fetching out the answer.");
        } finally {
            setIsGenerating(false);
        }
    };

    const downloadPDF = async (elementId: string, filename: string) => {
        // @ts-ignore
        const html2pdf = (await import('html2pdf.js')).default;
        const element = document.getElementById(elementId);
        if (!element) return;

        const opt = {
            margin: 0.5,
            filename: filename,
            image: { type: 'jpeg' as const, quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in' as const, format: 'letter' as const, orientation: 'portrait' as const }
        };
        html2pdf().set(opt).from(element).save();
    };

    const formatTime = (seconds: number) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        if (h > 0) return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
        return `${m}:${s.toString().padStart(2, '0')}`;
    };

    return (
        <div className="min-h-screen bg-black text-white selection:bg-indigo-500/30">
            <Navbar />

            <main className="pt-24 px-6 md:px-12 max-w-5xl mx-auto pb-20">
                <div className="mb-12">
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
                        Exam Intelligence Engine
                    </h1>
                    <div className="flex items-center gap-4 mt-4 text-sm text-gray-400">
                        <div className={cn("flex items-center gap-2", phase === 'upload' ? "text-white font-bold" : "text-green-500")}>
                            <div className="w-6 h-6 rounded-full border border-current flex items-center justify-center">1</div>
                            Ingest Data
                        </div>
                        <div className="w-8 h-[1px] bg-white/10" />
                        <div className={cn("flex items-center gap-2", phase === 'generate' ? "text-white font-bold" : phase === 'upload' ? "opacity-50" : "text-green-500")}>
                            <div className="w-6 h-6 rounded-full border border-current flex items-center justify-center">2</div>
                            Configure
                        </div>
                        <div className="w-8 h-[1px] bg-white/10" />
                        <div className={cn("flex items-center gap-2", phase === 'exam' || phase === 'review' ? "text-white font-bold" : "opacity-50")}>
                            <div className="w-6 h-6 rounded-full border border-current flex items-center justify-center">3</div>
                            Exam Mode
                        </div>
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    {/* PHASE 1: UPLOAD */}
                    {phase === 'upload' && (
                        <motion.div
                            key="upload"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="bg-white/5 border border-white/10 rounded-2xl p-12 text-center"
                        >
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileUpload}
                                className="hidden"
                                accept=".pdf,.png,.jpg,.txt"
                            />

                            {isUploading ? (
                                <div className="flex flex-col items-center">
                                    <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4" />
                                    <p className="text-indigo-400 font-medium">Analyzing document with Gemini OCR & PDF Parser...</p>
                                </div>
                            ) : pastExamsUploaded ? (
                                <div className="flex flex-col items-center">
                                    <CheckCircle2 className="w-16 h-16 text-green-500 mb-4" />
                                    <h3 className="text-2xl font-bold text-white mb-2">Context Extracted!</h3>
                                    <p className="text-gray-400 mb-6">We've generated structural and topical context from your upload.</p>
                                    <button
                                        onClick={() => setPhase('generate')}
                                        className="py-3 px-8 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-all"
                                    >
                                        Configure Exam Parameters
                                    </button>
                                </div>
                            ) : (
                                <div
                                    onClick={() => fileInputRef.current?.click()}
                                    className="cursor-pointer group flex flex-col items-center"
                                >
                                    <div className="w-20 h-20 rounded-full bg-indigo-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                        <FileUp className="w-10 h-10 text-indigo-400" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-2">Upload Past Exams or Syllabus</h3>
                                    <p className="text-gray-400 max-w-md mx-auto">
                                        Provide a PDF of your past actuarial questions. Our AI will analyze the format and difficulty to generate an entirely new, identical-format exam.
                                    </p>
                                    <button className="mt-8 py-3 px-6 border border-white/20 rounded-xl hover:bg-white/10 transition-colors">
                                        Select File
                                    </button>
                                </div>
                            )}
                            {/* Option to skip upload */}
                            {!isUploading && !pastExamsUploaded && (
                                <button className="mt-8 text-sm text-gray-500 hover:text-white underline" onClick={() => setPhase('generate')}>
                                    Skip & generate a general exam
                                </button>
                            )}
                        </motion.div>
                    )}

                    {/* PHASE 2: CONFIGURE */}
                    {phase === 'generate' && (
                        <motion.div
                            key="generate"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="max-w-2xl mx-auto space-y-8"
                        >
                            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
                                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                                    <Sliders className="w-5 h-5 text-indigo-400" /> Exam Configuration
                                </h3>

                                <div className="space-y-6">
                                    <div>
                                        <label className="text-sm text-gray-400 block mb-3">Predicted Difficulty</label>
                                        <input
                                            type="range"
                                            min="0" max="100"
                                            value={difficulty}
                                            onChange={(e) => setDifficulty(Number(e.target.value))}
                                            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                                        />
                                        <div className="flex justify-between text-xs text-gray-500 mt-2">
                                            <span>Easier</span>
                                            <span>Adaptive (Rec.)</span>
                                            <span>Harder</span>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="text-sm text-gray-400 block mb-3">Number of Questions</label>
                                        <input
                                            type="number"
                                            value={numQuestions}
                                            onChange={e => setNumQuestions(Number(e.target.value))}
                                            className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-indigo-500"
                                        />
                                    </div>

                                    {pastExamsUploaded && (
                                        <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 flex items-start gap-3">
                                            <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5" />
                                            <div>
                                                <p className="text-sm text-green-400 font-medium">Format Learning Active</p>
                                                <p className="text-xs text-green-400/70 mt-1">The AI will strictly mimic the styling, markup, and structural patterns found in your uploaded file.</p>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <button
                                    onClick={handleGenerate}
                                    disabled={isGenerating}
                                    className="w-full mt-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:scale-[1.02] active:scale-[0.98] text-white font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                                >
                                    {isGenerating ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            Generating Full Mock Exam via Gemini...
                                        </>
                                    ) : (
                                        <>
                                            <Zap className="w-5 h-5 fill-white" /> Start Generation
                                        </>
                                    )}
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {/* PHASE 3 & 4: EXAM & REVIEW */}
                    {(phase === 'exam' || phase === 'review') && examData && (
                        <motion.div
                            key="exam"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-white text-black rounded-2xl shadow-2xl overflow-hidden font-serif relative"
                        >
                            {/* Toolbar */}
                            <div className="bg-gray-100 border-b border-gray-200 p-4 flex justify-between items-center font-sans sticky top-0 z-50">
                                <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                                    <Clock className={cn("w-4 h-4", timeLeft < 300 && phase === 'exam' ? "text-red-500 animate-pulse" : "text-gray-500")} />
                                    {phase === 'exam' ? (
                                        <span>Time Remaining: <span className="font-mono text-lg">{formatTime(timeLeft)}</span></span>
                                    ) : (
                                        <span className="text-red-600">Exam Concluded</span>
                                    )}
                                </div>

                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => downloadPDF('pdf-exam-content', `${examData.examTitle.replace(/\s+/g, '_')}_Exam.pdf`)}
                                        className="text-xs bg-indigo-50 text-indigo-700 border border-indigo-200 px-3 py-1.5 rounded hover:bg-indigo-100 flex items-center gap-1.5 transition-colors font-medium"
                                    >
                                        <Download className="w-3.5 h-3.5" /> Exam PDF
                                    </button>

                                    {phase === 'review' && (
                                        <button
                                            onClick={() => downloadPDF('pdf-solutions-content', `${examData.examTitle.replace(/\s+/g, '_')}_Solutions.pdf`)}
                                            className="text-xs bg-green-50 text-green-700 border border-green-200 px-3 py-1.5 rounded hover:bg-green-100 flex items-center gap-1.5 transition-colors font-medium"
                                        >
                                            <Download className="w-3.5 h-3.5" /> Solutions PDF
                                        </button>
                                    )}

                                    {phase === 'exam' && (
                                        <button
                                            onClick={() => setPhase('review')}
                                            className="text-xs bg-black text-white px-4 py-1.5 rounded hover:bg-gray-800 transition-colors font-medium ml-2"
                                        >
                                            Submit Early
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* EXAM PDF CONTENT WRAPPER */}
                            <div id="pdf-exam-content" className="p-8 md:p-14 bg-white">
                                <div className="text-center border-b-2 border-black/20 pb-6 mb-10">
                                    <h1 className="text-3xl font-bold font-serif uppercase tracking-wider">{examData.examTitle}</h1>
                                    <p className="text-lg font-serif mt-2 italic text-gray-600">Duration: {examData.durationMinutes} Minutes</p>
                                    <p className="text-sm font-sans mt-4 text-gray-500">KOK TRUST AI Generated Mock Examination</p>
                                </div>

                                <div className="space-y-16">
                                    {examData.questions.map((q, idx) => (
                                        <div key={q.id} className="relative">
                                            <div className="flex justify-between items-start mb-4">
                                                <h3 className="text-xl font-bold font-serif">Question {idx + 1}</h3>
                                                <span className="text-lg font-bold">[{q.marks} marks]</span>
                                            </div>
                                            <div className="text-lg leading-relaxed prose prose-lg prose-p:my-2 prose-headings:my-3 text-black font-serif max-w-none">
                                                <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
                                                    {q.text}
                                                </ReactMarkdown>
                                            </div>

                                            {/* VISIBLE BLANK SPACE IN EXAM PDF IF NEEDED FOR WORKING */}
                                            <div className="mt-8 mb-4 border-t border-dashed border-gray-300 w-full" />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* SOLUTIONS PDF CONTENT WRAPPER (Hidden from Exam view initially, but rendered for PDF or Review phase) */}
                            <AnimatePresence>
                                {phase === 'review' && (
                                    <motion.div
                                        id="pdf-solutions-content"
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        className="p-8 md:p-14 bg-gray-50 border-t-4 border-gray-900"
                                    >
                                        <div className="text-center border-b border-gray-300 pb-4 mb-10">
                                            <h2 className="text-2xl font-bold font-serif uppercase">Official Solutions & Marking Scheme</h2>
                                            <p className="text-sm font-sans mt-2 text-gray-500">{examData.examTitle}</p>
                                        </div>

                                        <div className="space-y-12">
                                            {examData.questions.map((q, idx) => (
                                                <div key={'sol-' + q.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                                                    <h3 className="text-lg font-bold font-serif mb-4 text-indigo-900 border-b pb-2">Solution to Question {idx + 1}</h3>

                                                    <div className="mb-6 space-y-2">
                                                        <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 font-sans">Marking Scheme</h4>
                                                        {q.marking_scheme?.map((step: any, sIdx: number) => (
                                                            <div key={sIdx} className="flex justify-between text-sm font-sans bg-gray-50 px-3 py-2 rounded">
                                                                <span className="text-gray-700">{step.step}</span>
                                                                <span className="font-bold text-green-600 bg-green-100 px-2 py-0.5 rounded">+{step.marks}</span>
                                                            </div>
                                                        ))}
                                                    </div>

                                                    <div className="prose prose-md max-w-none font-serif text-gray-800 bg-blue-50/30 p-4 rounded-lg">
                                                        <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
                                                            {q.solution}
                                                        </ReactMarkdown>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* LOCKED SOLUTIONS BANNER IN EXAM PHASE */}
                            {phase === 'exam' && (
                                <div className="p-8 text-center bg-gray-50 border-t border-gray-200">
                                    <Lock className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                                    <p className="text-sm text-gray-500 font-medium">Solutions hidden during exam.</p>
                                    <p className="text-xs text-gray-400">Time remaining: {formatTime(timeLeft)}</p>
                                </div>
                            )}

                        </motion.div>
                    )}
                </AnimatePresence>
            </main>
        </div>
    );
}
