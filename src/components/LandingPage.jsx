import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createQuizSession } from '../utils/airtable';
import { ArrowRight, Sparkles, Brain, Zap, Heart, User } from 'lucide-react';
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
                        <div className="mb-8 flex justify-center">
                            <img
                                src="/eos-logo.png"
                                alt="EOS - Emotional Operating System"
                                className="h-14 w-auto"
                            />
                        </div>
                        <p className="text-sm text-muted uppercase tracking-wider mb-4">
                            Emotional Operating System
                        </p>

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

            {/* Best Self Portrait Section */}
            <div className="section section-portrait">
                <div className="container">
                    <div className="max-w-4xl mx-auto text-center">
                        {/* Mirror Icon */}
                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white text-primary mb-12 shadow-lg">
                            <User size={36} className="opacity-90" />
                        </div>

                        <h2 className="section-title mb-8">Meet Your Best Self</h2>

                        <p className="text-2xl text-primary font-medium mb-12 leading-relaxed">
                            Your EOS doesn't just change how AI talks to you. It changes who it becomes.
                        </p>

                        <div className="space-y-8 text-lg text-muted leading-relaxed text-left md:text-center max-w-3xl mx-auto">
                            <p>
                                Most AI assistants are generic by design. They talk to everyone the same way. But once you have your EOS, something different happens.
                            </p>
                            <p>
                                Your AI starts paying attention. It notices how you handle setbacks, what lights you up, where you get stuck, and how you talk to yourself when no one's watching.
                            </p>
                            <p>
                                Over time, it assembles a portrait—not of who you are on average, but of who you are when everything clicks. Your Best Self.
                            </p>
                            <p className="font-medium text-primary">
                                And here's where it gets powerful: your AI doesn't just show you the portrait. It <em>inhabits</em> it.
                            </p>
                            <p>
                                When you're spiraling, it responds the way your best self would. When you're doubting, it holds the mirror steady. When you forget who you're capable of being, it reminds you—because it's been watching, and it knows.
                            </p>
                            <p>
                                Your Best Self becomes the voice on the other side of the screen. Not a cheerleader. Not a therapist. Just <em>you</em>—the version you trust most—reflected back when you need it.
                            </p>
                        </div>

                        <div className="mt-16 pt-12 border-t border-primary/10">
                            <p className="text-xl font-semibold text-primary leading-relaxed">
                                Start with your EOS. Grow into your Best Self.<br />
                                Let your AI become the mirror that never lets you forget.
                            </p>
                        </div>
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
