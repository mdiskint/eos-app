import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createQuizSession } from '../utils/airtable';
import { ArrowRight, Sparkles, Brain, Zap, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

const LandingPage = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email) return;

        setLoading(true);
        try {
            const recordId = await createQuizSession(email);
            if (recordId) localStorage.setItem('eos_record_id', recordId);
            localStorage.setItem('eos_email', email);
            navigate('/quiz');
        } catch (error) {
            console.error(error);
            navigate('/quiz');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <div className="section section-hero">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center"
                    >
                        {/* Brand Header */}
                        <div className="brand-header mb-8">
                            EOS — Emotional Operating System
                        </div>

                        {/* Main Headline */}
                        <h1 className="hero-title">
                            Your AI Has No Idea<br />Who You Are
                        </h1>

                        {/* Subhead */}
                        <p className="hero-subtitle">
                            Fix that in 5 minutes.
                        </p>

                        <div className="email-card">
                            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                                <div className="text-left">
                                    <label htmlFor="email" className="block text-sm font-bold text-muted mb-2">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        required
                                        placeholder="you@example.com"
                                        className="input"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="btn btn-primary w-full group"
                                >
                                    {loading ? 'Starting...' : 'Build My EOS'}
                                    {!loading && <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />}
                                </button>

                                <p className="text-xs text-muted text-center mt-2">
                                    Free forever. No spam. Just better AI.
                                </p>
                            </form>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* What is EOS Section */}
            <div className="section bg-white/50">
                <div className="container">
                    <div className="split-layout">
                        <div className="space-y-6">
                            <h2 className="section-title">What is an Emotional Operating System?</h2>
                            <p className="text-lg text-muted leading-relaxed">
                                Your EOS is a personalized instruction set that tells AI exactly how to work with you—your communication style, how you like feedback, what kind of support you need, and how you make decisions.
                            </p>
                            <p className="text-lg font-bold text-primary">
                                Instead of generic responses, you get an AI that actually gets you.
                            </p>
                        </div>

                        <div className="feature-grid" style={{ marginTop: 0 }}>
                            <div className="feature-card">
                                <div className="feature-icon-wrapper">
                                    <Brain size={32} />
                                </div>
                                <h3 className="font-bold text-lg mb-2">Decision Making</h3>
                                <p className="text-sm text-muted">How you process choices and risks</p>
                            </div>

                            <div className="feature-card">
                                <div className="feature-icon-wrapper">
                                    <Heart size={32} />
                                </div>
                                <h3 className="font-bold text-lg mb-2">Emotional Support</h3>
                                <p className="text-sm text-muted">How you need to be encouraged</p>
                            </div>

                            <div className="feature-card">
                                <div className="feature-icon-wrapper">
                                    <Zap size={32} />
                                </div>
                                <h3 className="font-bold text-lg mb-2">Work Style</h3>
                                <p className="text-sm text-muted">Your pace, tone, and preferences</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* How It Works Section */}
            <div className="section">
                <div className="container">
                    <h2 className="section-title text-center">How It Works</h2>
                    <div className="step-grid">
                        {[
                            { step: "1", title: "Answer Questions", desc: "20 quick questions about how you prefer to work" },
                            { step: "2", title: "Generate EOS", desc: "We generate your personalized EOS document" },
                            { step: "3", title: "Copy & Paste", desc: "Copy it into any AI's custom instructions" },
                            { step: "4", title: "Experience Magic", desc: "Experience AI that finally feels like it understands you" }
                        ].map((item, i) => (
                            <div key={i} className="step-card">
                                <div className="step-number">{item.step}</div>
                                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                                <p className="text-muted text-sm">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Why It Matters Section */}
            <div className="section" style={{ backgroundColor: 'var(--primary)', color: 'white' }}>
                <div className="container text-center">
                    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                        <h2 className="section-title" style={{ color: 'white' }}>Why It Matters</h2>
                        <p className="text-lg" style={{ opacity: 0.9, marginBottom: '2rem' }}>
                            Every AI interaction today starts from zero. The AI doesn't know if you want to be challenged or encouraged. It doesn't know if you prefer bullet points or prose. It doesn't know if you're a "give me options" person or a "just tell me what to do" person.
                        </p>
                        <p className="text-2xl font-bold" style={{ color: 'var(--accent)', marginBottom: '3rem' }}>
                            Your EOS fixes that—permanently.
                        </p>
                        <button
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                            className="btn btn-white text-lg px-8 py-4 shadow-xl"
                        >
                            Build My EOS Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
