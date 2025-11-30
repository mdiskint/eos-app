import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

const milestones = {
    5: {
        title: "5 down, 15 to go!",
        subtitle: "You're off to a great start. Keep going!",
        emoji: "🎉"
    },
    10: {
        title: "Halfway there!",
        subtitle: "You're doing great. The finish line is in sight.",
        emoji: "🙌"
    },
    15: {
        title: "Only 5 more questions!",
        subtitle: "Almost done. Don't stop now!",
        emoji: "⭐"
    },
    20: {
        title: "You did it!",
        subtitle: "Your EOS is ready.",
        emoji: "🎊"
    }
};

const MilestoneOverlay = ({ milestone, onComplete }) => {
    useEffect(() => {
        // Fire confetti
        const duration = 2000;
        const end = Date.now() + duration;

        const colors = ['#881337', '#fb7185', '#fecdd3', '#ffffff']; // Burgundy, Rose, Accent, White

        (function frame() {
            confetti({
                particleCount: 3,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: colors
            });
            confetti({
                particleCount: 3,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: colors
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        }());

        // Auto-advance after 2.5 seconds
        const timer = setTimeout(() => {
            onComplete();
        }, 2500);

        return () => clearTimeout(timer);
    }, [onComplete]);

    const content = milestones[milestone] || milestones[5];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm p-4"
            onClick={onComplete} // Allow click to skip
        >
            <motion.div
                initial={{ scale: 0.8, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.8, y: -20 }}
                className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center border-2 border-accent"
            >
                <div className="text-6xl mb-4 animate-bounce">
                    {content.emoji}
                </div>
                <h2 className="text-3xl font-bold text-primary mb-2">
                    {content.title}
                </h2>
                <p className="text-xl text-text-main/80">
                    {content.subtitle}
                </p>
            </motion.div>
        </motion.div>
    );
};

export default MilestoneOverlay;
