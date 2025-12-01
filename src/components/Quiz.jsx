import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { questions } from '../data/questions';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Quiz = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState({});
    const [optionalText, setOptionalText] = useState({});
    const [justSelected, setJustSelected] = useState(false);
    const [calibrationMode, setCalibrationMode] = useState(false);
    const [sliders, setSliders] = useState({
        challengeIntensity: 70,
        directness: 70
    });

    const navigate = useNavigate();
    const textareaRef = useRef(null);

    const question = questions[currentQuestion];
    const progress = ((currentQuestion + 1) / questions.length) * 100;
    const hasAnswered = !!answers[question?.id];
    const isLastQuestion = currentQuestion === questions.length - 1;

    // Reset animation state when question changes
    useEffect(() => {
        setJustSelected(false);
    }, [currentQuestion]);

    const handleOptionSelect = (value) => {
        const newAnswers = { ...answers, [question.id]: value };
        setAnswers(newAnswers);

        // Trigger animation on optional field
        setJustSelected(true);
        setTimeout(() => setJustSelected(false), 2000);
    };

    const handleOptionalTextChange = (e) => {
        setOptionalText({
            ...optionalText,
            [question.id]: e.target.value
        });
    };

    const handleSliderChange = (name, value) => {
        setSliders(prev => ({
            ...prev,
            [name]: parseInt(value)
        }));
    };

    const handleNext = () => {
        if (calibrationMode) {
            finishQuiz();
            return;
        }

        if (!hasAnswered) return;

        if (isLastQuestion) {
            setCalibrationMode(true);
        } else {
            setCurrentQuestion(curr => curr + 1);
        }
    };

    const finishQuiz = () => {
        localStorage.setItem('eos_answers', JSON.stringify(answers));
        localStorage.setItem('eos_optional_text', JSON.stringify(optionalText));
        localStorage.setItem('eos_sliders', JSON.stringify(sliders));
        navigate('/results');
    };

    const handleBack = () => {
        if (calibrationMode) {
            setCalibrationMode(false);
        } else if (currentQuestion > 0) {
            setCurrentQuestion(curr => curr - 1);
        }
    };

    const getSliderLabel = (val, type) => {
        if (type === 'challenge') {
            if (val < 40) return "Go easy";
            if (val > 60) return "Push hard";
            return "Moderate";
        }
        if (type === 'directness') {
            if (val < 40) return "Be gentle";
            if (val > 60) return "Be blunt";
            return "Balanced";
        }
        return "";
    };

    return (
        <div className="min-h-screen">
            {/* Header Bar */}
            <header className="bg-white/80 backdrop-blur-sm border-b border-secondary/20 sticky top-0 z-50">
                <div className="container py-3">
                    <div className="flex items-center gap-3">
                        <span className="text-xl font-bold text-primary tracking-wide">
                            EOS
                        </span>
                    </div>
                </div>
            </header>

            <div className="flex items-center justify-center p-4 py-12">
                <div className="quiz-container">
                    {!calibrationMode ? (
                        <>
                            {/* Progress Section */}
                            <div className="quiz-progress">
                                <div className="progress-label">
                                    Question {currentQuestion + 1} of {questions.length}
                                </div>
                                <div className="progress-bar-container">
                                    <motion.div
                                        className="progress-bar-fill"
                                        initial={{ width: 0 }}
                                        animate={{ width: `${progress}%` }}
                                        transition={{ duration: 0.4, ease: "easeOut" }}
                                    />
                                </div>
                            </div>

                            {/* Question and Options */}
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentQuestion}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.3 }}
                                    className="quiz-content"
                                >
                                    <div className="mb-2 text-sm font-medium text-secondary/60 uppercase tracking-wider">
                                        {question.category}
                                    </div>
                                    <h2 className="quiz-question">
                                        {question.text}
                                    </h2>

                                    <div className="quiz-options">
                                        {question.options.map((option) => {
                                            const isSelected = answers[question.id] === option.value;
                                            return (
                                                <button
                                                    key={option.id}
                                                    onClick={() => handleOptionSelect(option.value)}
                                                    className={`quiz-option ${isSelected ? 'quiz-option-selected' : ''}`}
                                                >
                                                    <span className="quiz-option-text">
                                                        {option.text}
                                                    </span>
                                                </button>
                                            );
                                        })}
                                    </div>

                                    {/* Optional Text Field */}
                                    <div className={`quiz-optional-field ${justSelected ? 'quiz-optional-field-highlight' : ''}`}>
                                        <label htmlFor={`optional-${question.id}`} className="quiz-optional-label">
                                            Want to add more detail? (optional)
                                        </label>
                                        <textarea
                                            ref={textareaRef}
                                            id={`optional-${question.id}`}
                                            className="quiz-optional-textarea"
                                            placeholder={question.placeholder || "Add any specifics or nuances here..."}
                                            value={optionalText[question.id] || ''}
                                            onChange={handleOptionalTextChange}
                                            rows={3}
                                        />
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </>
                    ) : (
                        /* Calibration Screen */
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4 }}
                            className="quiz-content space-y-8"
                        >
                            <div className="text-center space-y-4">
                                <h2 className="text-2xl font-bold text-primary">One last thing: Calibrate your feedback</h2>
                                <p className="text-secondary/80">
                                    By default, I'll challenge your thinking and be direct about flaws. How much friction works for you?
                                </p>
                            </div>

                            {/* Slider 1: Challenge Intensity */}
                            <div className="space-y-4 p-6 bg-surface rounded-xl border border-secondary/10">
                                <div className="flex justify-between items-end">
                                    <label className="text-lg font-medium text-primary">Challenge Intensity</label>
                                    <span className="text-sm font-medium text-accent">
                                        {getSliderLabel(sliders.challengeIntensity, 'challenge')}
                                    </span>
                                </div>
                                <p className="text-sm text-secondary/60">When I spot gaps in your reasoning...</p>
                                <div className="pt-2">
                                    <input
                                        type="range"
                                        min="0"
                                        max="100"
                                        value={sliders.challengeIntensity}
                                        onChange={(e) => handleSliderChange('challengeIntensity', e.target.value)}
                                        className="w-full h-2 bg-secondary/20 rounded-lg appearance-none cursor-pointer accent-accent"
                                    />
                                    <div className="flex justify-between text-xs text-secondary/50 mt-2">
                                        <span>Go easy</span>
                                        <span>Push hard</span>
                                    </div>
                                </div>
                            </div>

                            {/* Slider 2: Directness */}
                            <div className="space-y-4 p-6 bg-surface rounded-xl border border-secondary/10">
                                <div className="flex justify-between items-end">
                                    <label className="text-lg font-medium text-primary">Directness</label>
                                    <span className="text-sm font-medium text-accent">
                                        {getSliderLabel(sliders.directness, 'directness')}
                                    </span>
                                </div>
                                <p className="text-sm text-secondary/60">When your idea has a flaw...</p>
                                <div className="pt-2">
                                    <input
                                        type="range"
                                        min="0"
                                        max="100"
                                        value={sliders.directness}
                                        onChange={(e) => handleSliderChange('directness', e.target.value)}
                                        className="w-full h-2 bg-secondary/20 rounded-lg appearance-none cursor-pointer accent-accent"
                                    />
                                    <div className="flex justify-between text-xs text-secondary/50 mt-2">
                                        <span>Be gentle</span>
                                        <span>Be blunt</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* Navigation */}
                    <div className="quiz-navigation mt-8">
                        <button
                            onClick={handleBack}
                            disabled={!calibrationMode && currentQuestion === 0}
                            className={`quiz-nav-button quiz-nav-back ${(!calibrationMode && currentQuestion === 0) ? 'quiz-nav-disabled' : ''}`}
                        >
                            <ChevronLeft size={20} />
                            <span>Back</span>
                        </button>

                        <button
                            onClick={handleNext}
                            disabled={!calibrationMode && !hasAnswered}
                            className={`quiz-nav-button quiz-nav-next ${(!calibrationMode && !hasAnswered) ? 'quiz-nav-disabled' : ''}`}
                        >
                            <span>{calibrationMode ? 'Generate My EOS' : (isLastQuestion ? 'Next: Calibration' : 'Next')}</span>
                            <ChevronRight size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Quiz;
