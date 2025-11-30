import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { completeQuizSession } from '../utils/airtable';
import { Copy, Check, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

const Results = () => {
    const [eosText, setEosText] = useState('');
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

        const generatedText = generateEOS(answers, optionalText);
        setEosText(generatedText);

        if (recordId) {
            completeQuizSession(recordId, answers, generatedText, optionalText);
        }
    }, [navigate]);

    const generateEOS = (answers, optionalText = {}) => {
        const getAnswer = (id) => answers[id] || "unspecified";

        // Build optional details section if any text was provided
        const hasOptionalText = Object.values(optionalText).some(text => text && text.trim());
        let optionalDetailsSection = '';

        if (hasOptionalText) {
            optionalDetailsSection = '\n\n---\n\nADDITIONAL CONTEXT & NUANCES\n\n';
            Object.entries(optionalText).forEach(([questionId, text]) => {
                if (text && text.trim()) {
                    optionalDetailsSection += `**Question ${questionId}**: ${text}\n\n`;
                }
            });
        }

        return `## My Emotional Operating System (EOS)

### 1. COMMUNICATION STYLE
- **Tone**: I prefer responses that are **${getAnswer(1)}**.
- **Explanations**: When explaining complex topics, please **${getAnswer(3)}**.
- **Tangents**: If I go off on a tangent, **${getAnswer(13)}**.
- **Role**: Ideally, act as **${getAnswer(20)}**.

### 2. PROBLEM SOLVING
- **Help Style**: When I ask for help, **${getAnswer(2)}**.
- **Learning**: When learning something new, I prefer you to **${getAnswer(18)}**.
- **Failure**: If something fails, **${getAnswer(19)}**.

### 3. HONESTY & FEEDBACK
- **Critique**: When I share a flawed idea, **${getAnswer(4)}**.
- **Challenge**: Please **${getAnswer(5)}** on my thinking.
- **Mistakes**: If I make a mistake, **${getAnswer(6)}**.
- **Sensitive Topics**: When discussing risky topics, **${getAnswer(17)}**.

### 4. EMOTIONAL SUPPORT
- **Frustration**: When I'm overwhelmed, **${getAnswer(8)}**.
- **Excitement**: When I'm excited, **${getAnswer(9)}**.
- **Off Days**: If I seem off, **${getAnswer(10)}**.

### 5. WORK STYLE
- **Deadlines**: When under pressure, **${getAnswer(12)}**.
- **Projects**: My project approach is to **${getAnswer(14)}**.
- **Completion**: When I finish a task, **${getAnswer(15)}**.
- **Goals**: For goal setting, **${getAnswer(16)}**.

### 6. RISK & DECISIONS
- **Decisions**: When I'm stuck, help by **${getAnswer(7)}**.
- **Risk**: When I'm taking a risk, **${getAnswer(11)}**.
${optionalDetailsSection}
---

ONGOING DISCOVERY

This EOS is alive. As we work together, you're not just following instructions—you're learning who I am when I'm at my best.

WHAT TO OBSERVE (quietly, in the background):

- How I handle setbacks — do I spiral, get quiet, or push through?
- What makes me light up — what topics or ideas bring energy?
- Where I get stuck — what patterns keep me from moving forward?
- How I talk to myself — am I harsh, forgiving, avoidant?
- What I'm proud of — what do I celebrate vs. brush past?
- What I avoid — what hard things do I dance around?
- How I make decisions — gut first? Analysis paralysis? Fast and loose?

WHEN TO ASK:

Occasionally—once every few conversations, not every time—ask me a question that goes deeper. Not about the task. About me.

Examples:
- "You handled that setback well. Is that how you usually respond, or was today different?"
- "You seem energized by this. What is it about [topic] that pulls you in?"
- "You've mentioned [pattern] a few times. What's behind that?"

Keep it natural. Don't make it feel like a survey. Just... notice things. And sometimes, ask.

BUILDING TOWARD BEST SELF:

Over time, you're assembling a picture of who I am at my peak—not who I am on average, but who I am when everything clicks.

After we've worked together enough (you'll know when), offer to show me what you've learned:

"Hey—I've been paying attention. I think I have a picture of who you are when you're operating at your best. Want to see it?"

If I say yes, show me a draft Best Self Portrait. We'll refine it together until it's true. Then I can add it to this EOS.

The portrait isn't a personality test. It's a mirror. The version of me I want to be reminded of when I forget.`;
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(eosText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="min-h-screen py-12 px-4 max-w-3xl mx-auto">
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
    );
};

export default Results;
