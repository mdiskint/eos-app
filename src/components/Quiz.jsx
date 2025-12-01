import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { questions } from '../data/questions';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import MilestoneOverlay from './MilestoneOverlay';

const Quiz = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState({});
    const [optionalText, setOptionalText] = useState({});
    const [justSelected, setJustSelected] = useState(false);
    const [activeMilestone, setActiveMilestone] = useState(null);
    const navigate = useNavigate();
    const textareaRef = useRef(null);

    const question = questions[currentQuestion];
    const progress = ((currentQuestion + 1) / questions.length) * 100;
    const hasAnswered = !!answers[question.id];
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

    const handleNext = () => {
        if (!hasAnswered) return;

        const questionsCompleted = currentQuestion + 1;

        // Check for milestones (5, 10, 15, 20)
        if (questionsCompleted % 5 === 0) {
            setActiveMilestone(questionsCompleted);
            return;
        }

        proceedToNext();
    };

    const handleMilestoneComplete = () => {
        const milestone = activeMilestone;
        setActiveMilestone(null);

        if (milestone === 20) {
            finishQuiz();
        } else {
            setCurrentQuestion(curr => curr + 1);
        }
    };

    const proceedToNext = () => {
        if (isLastQuestion) {
            finishQuiz();
        } else {
            setCurrentQuestion(curr => curr + 1);
        }
    };

    const finishQuiz = () => {
        localStorage.setItem('eos_answers', JSON.stringify(answers));
        localStorage.setItem('eos_optional_text', JSON.stringify(optionalText));
        navigate('/results');
    };

    const handleBack = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(curr => curr - 1);
        }
    };

    return (
        <div className="min-h-screen">
            {/* Header Bar */}
            <header className="bg-white/80 backdrop-blur-sm border-b border-secondary/20 sticky top-0 z-50">
                <div className="container py-3">
                    <div className="flex items-center gap-3">
                        <img
                            src="/eos-logo.png"
                            alt="EOS"
                            className="h-7 w-7"
                        />
                        <span className="text-xs font-medium text-primary tracking-wide">
                            EMOTIONAL OPERATING SYSTEM
                        </span>
                    </div>
                </div>
            </header>

            <div className="flex items-center justify-center p-4 py-12">
                <AnimatePresence>
                    {activeMilestone && (
                        <MilestoneOverlay
                            milestone={activeMilestone}
                            onComplete={handleMilestoneComplete}
                        />
                    )}
                </AnimatePresence>

                <div className="quiz-container">
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
                                    placeholder="Add any specifics or nuances here..."
                                    value={optionalText[question.id] || ''}
                                    onChange={handleOptionalTextChange}
                                    rows={3}
                                />
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Navigation */}
                    <div className="quiz-navigation">
                        <button
                            onClick={handleBack}
                            disabled={currentQuestion === 0}
                            className={`quiz-nav-button quiz-nav-back ${currentQuestion === 0 ? 'quiz-nav-disabled' : ''}`}
                        >
                            <ChevronLeft size={20} />
                            <span>Back</span>
                        </button>

                        <button
                            onClick={handleNext}
                            disabled={!hasAnswered}
                            className={`quiz-nav-button quiz-nav-next ${!hasAnswered ? 'quiz-nav-disabled' : ''}`}
                        >
                            <span>{isLastQuestion ? 'Generate My EOS' : 'Next'}</span>
                            <ChevronRight size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Quiz;
