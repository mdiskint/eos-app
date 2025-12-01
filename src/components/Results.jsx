import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { completeQuizSession } from '../utils/airtable';
import { Copy, Check, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';
import { questionsV2 } from '../data/questionsV2';
import { inferSubstrates, getSubstrateSummary } from '../utils/substrateInference';
import { generateEOS } from '../utils/eosGenerator';

const Results = () => {
    const [eosText, setEosText] = useState('');
    const [substrateProfile, setSubstrateProfile] = useState(null);
    const [copied, setCopied] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const answers = JSON.parse(localStorage.getItem('eos_answers') || '{}');
        const optionalText = JSON.parse(localStorage.getItem('eos_optional_text') || '{}');
        const recordId = localStorage.getItem('eos_record_id');

        if (Object.keys(answers).length === 0) {
            navigate('/');
            return;
        }

        // Infer substrate profile from answers
        const profile = inferSubstrates(answers, questionsV2);
        setSubstrateProfile(profile);

        // Generate EOS from substrate profile
        const generatedText = generateEOS(profile, optionalText);
        setEosText(generatedText);

        // Save to Airtable with substrate data
        if (recordId) {
            completeQuizSession(recordId, answers, generatedText, optionalText, profile);
        }
    }, [navigate]);

    const handleCopy = () => {
        navigator.clipboard.writeText(eosText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
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

            <div className="py-12 px-4 max-w-3xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-8"
                >
                    <div className="text-center space-y-4">
                        <h1 className="text-4xl font-bold text-primary">Your EOS is Ready</h1>
                        <p className="text-muted text-lg">
                            Here is your personal operating manual. Copy this into your AI tools (ChatGPT, Claude, Gemini) as a custom instruction or system prompt.
                        </p>
                    </div>

                    <div className="relative">
                        <div className="absolute top-4 right-4 z-10">
                            <button
                                onClick={handleCopy}
                                className="btn btn-primary text-sm py-2 px-4 shadow-lg flex items-center gap-2"
                            >
                                {copied ? <Check size={16} /> : <Copy size={16} />}
                                {copied ? 'Copied!' : 'Copy to Clipboard'}
                            </button>
                        </div>

                        <div className="bg-white rounded-xl shadow-lg p-8 pt-16 border border-secondary/20 font-mono text-sm md:text-base overflow-x-auto whitespace-pre-wrap leading-relaxed text-text-main">
                            {eosText}
                        </div>
                    </div>

                    <div className="bg-white/50 rounded-xl p-6 border border-white/50">
                        <h3 className="font-bold text-primary mb-2">How to use this:</h3>
                        <ol className="list-decimal list-inside space-y-2 text-muted">
                            <li>Click "Copy to Clipboard" above.</li>
                            <li>Open your preferred AI tool settings (e.g., ChatGPT "Custom Instructions").</li>
                            <li>Paste this text into the "How would you like ChatGPT to respond?" section.</li>
                            <li>Save and enjoy personalized responses!</li>
                        </ol>
                    </div>

                    <div className="text-center pt-8">
                        <button
                            onClick={() => navigate('/')}
                            className="text-muted hover:text-primary flex items-center justify-center gap-2 mx-auto transition-colors"
                        >
                            <RefreshCw size={16} />
                            Start Over
                        </button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Results;
