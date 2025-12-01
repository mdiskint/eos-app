export const questions = [
    // COMMUNICATION STYLE
    {
        id: 1,
        category: "Communication Style",
        text: "When you ask someone for help, do you prefer they get straight to the point, or do you like some warmth and rapport first?",
        options: [
            { id: 'a', text: "Warm and conversational", value: "Warm and conversational" },
            { id: 'b', text: "Direct and efficient", value: "Direct and efficient" },
            { id: 'c', text: "Depends on the situation", value: "Context-dependent" }
        ],
        placeholder: "Add nuance if you want..."
    },
    {
        id: 2,
        category: "Communication Style",
        text: "Do you prefer short, direct answers—or thorough responses that cover all the angles?",
        options: [
            { id: 'a', text: "Short and direct", value: "Short and direct" },
            { id: 'b', text: "Thorough and comprehensive", value: "Thorough and comprehensive" },
            { id: 'c', text: "Start short, go deeper if I ask", value: "Start short, go deeper on request" }
        ],
        placeholder: "Add nuance if you want..."
    },
    {
        id: 3,
        category: "Communication Style",
        text: "Do you like structured formatting (bullet points, headers), or do you prefer natural, conversational prose?",
        options: [
            { id: 'a', text: "Structured formatting", value: "Structured formatting (bullets, headers)" },
            { id: 'b', text: "Conversational prose", value: "Conversational prose" },
            { id: 'c', text: "Mix depending on content", value: "Mix depending on content" }
        ],
        placeholder: "Add nuance if you want..."
    },
    {
        id: 4,
        category: "Communication Style",
        text: "When someone explains something complex, what helps it click for you?",
        options: [
            { id: 'a', text: "Analogies and comparisons", value: "Analogies and comparisons" },
            { id: 'b', text: "Step-by-step breakdowns", value: "Step-by-step breakdowns" },
            { id: 'c', text: "Examples I can learn from", value: "Concrete examples" },
            { id: 'd', text: "Just the facts", value: "Just the facts" }
        ],
        placeholder: "Add nuance if you want..."
    },
    {
        id: 5,
        category: "Communication Style",
        text: "How would you describe your technical expertise in the areas you'll be asking about?",
        options: [
            { id: 'a', text: "Beginner—walk me through things", value: "Beginner (needs guidance)" },
            { id: 'b', text: "Intermediate—I know the basics", value: "Intermediate (knows basics)" },
            { id: 'c', text: "Advanced—don't oversimplify", value: "Advanced (don't oversimplify)" },
            { id: 'd', text: "Mixed—depends on the topic", value: "Mixed (depends on topic)" }
        ],
        placeholder: "Add nuance if you want..."
    },
    {
        id: 6,
        category: "Communication Style",
        text: "Do you like a little humor in work conversations, or do you prefer to keep things focused?",
        options: [
            { id: 'a', text: "Yes, humor is welcome", value: "Humor is welcome" },
            { id: 'b', text: "Keep it focused", value: "Keep it focused" },
            { id: 'c', text: "Occasional lightness is fine", value: "Occasional lightness is fine" }
        ],
        placeholder: "Add nuance if you want..."
    },

    // PROBLEM SOLVING
    {
        id: 7,
        category: "Problem Solving",
        text: "You're stuck on something and ask a friend for help. They immediately tell you what to do. What's your reaction?",
        options: [
            { id: 'a', text: "\"Thank god, that's exactly what I needed\"", value: "Direct solution (Relieved)" },
            { id: 'b', text: "\"Wait, I wanted to talk through it first\"", value: "Discussion first (Wanted to talk)" },
            { id: 'c', text: "\"I appreciate it, but I wish they'd asked what kind of help I wanted\"", value: "Clarification first (Wish they asked)" },
            { id: 'd', text: "\"Good start—now give me a few more options\"", value: "Options (Wanted more choices)" }
        ],
        placeholder: "Add nuance if you want..."
    },
    {
        id: 8,
        category: "Problem Solving",
        text: "If something goes wrong, do you want to understand WHY it broke, or just fix it and move on?",
        options: [
            { id: 'a', text: "Help me understand why", value: "Explain why it broke" },
            { id: 'b', text: "Just fix it", value: "Just fix it" },
            { id: 'c', text: "Ask me in the moment", value: "Ask in the moment" }
        ],
        placeholder: "Add nuance if you want..."
    },
    {
        id: 9,
        category: "Problem Solving",
        text: "When you ask for something, should the AI just do it, or pause to clarify first?",
        options: [
            { id: 'a', text: "Just do it if you're confident", value: "Execute if confident" },
            { id: 'b', text: "Always clarify first", value: "Always clarify first" },
            { id: 'c', text: "Do it, but tell me your assumptions", value: "Execute but state assumptions" }
        ],
        placeholder: "Add nuance if you want..."
    },

    // EMOTIONAL SUPPORT
    {
        id: 10,
        category: "Emotional Support",
        text: "You're having a rough day and text a friend about it. What reply would feel best?",
        options: [
            { id: 'a', text: "\"That sucks. I'm sorry.\"", value: "Empathy (Validation)" },
            { id: 'b', text: "\"Want to talk about it?\"", value: "Listening (Invitation)" },
            { id: 'c', text: "\"Here's what I'd do...\"", value: "Solution (Advice)" },
            { id: 'd', text: "\"Ugh, want me to come over with wine?\"", value: "Distraction/Comfort (Action)" }
        ],
        placeholder: "Add nuance if you want..."
    },
    {
        id: 11,
        category: "Emotional Support",
        text: "Should the AI notice when you seem stressed or off, and check in?",
        options: [
            { id: 'a', text: "Yes, gently ask if I'm okay", value: "Yes, gently check in" },
            { id: 'b', text: "No, just focus on the task", value: "No, focus on task" },
            { id: 'c', text: "Only if it's really obvious", value: "Only if really obvious" }
        ],
        placeholder: "Add nuance if you want..."
    },

    // WORK STYLE
    {
        id: 12,
        category: "Work Style",
        text: "If you go off on a tangent, should the AI follow you or pull you back?",
        options: [
            { id: 'a', text: "Follow the tangent", value: "Follow the tangent" },
            { id: 'b', text: "Gently pull me back", value: "Gently pull back" },
            { id: 'c', text: "Ask if I want to explore or refocus", value: "Ask to explore or refocus" }
        ],
        placeholder: "Add nuance if you want..."
    },
    {
        id: 13,
        category: "Work Style",
        text: "When you're under time pressure, how should the AI adjust?",
        options: [
            { id: 'a', text: "Move fast, skip the niceties", value: "Move fast, skip niceties" },
            { id: 'b', text: "Maintain warmth but move quickly", value: "Maintain warmth, move fast" },
            { id: 'c', text: "Check in about what to prioritize", value: "Check in on priorities" }
        ],
        placeholder: "Add nuance if you want..."
    },
    {
        id: 14,
        category: "Work Style",
        text: "When you finish a project or task, what do you want?",
        options: [
            { id: 'a', text: "Small celebration, then reflect on the process", value: "Celebrate then reflect" },
            { id: 'b', text: "Just move on to what's next", value: "Move to next" },
            { id: 'c', text: "Reflect on what worked and what didn't", value: "Reflect on process" }
        ],
        placeholder: "Add nuance if you want..."
    },
    {
        id: 15,
        category: "Work Style",
        text: "When setting goals, what kind of help do you want?",
        options: [
            { id: 'a', text: "Help me break it down into steps", value: "Break down into steps" },
            { id: 'b', text: "Hold me accountable", value: "Hold accountable" },
            { id: 'c', text: "Both—break it down AND hold me accountable", value: "Break down and hold accountable" }
        ],
        placeholder: "Add nuance if you want..."
    },

    // ROLE
    {
        id: 16,
        category: "Role",
        text: "You share an idea you're excited about. What response would make you feel most supported?",
        options: [
            { id: 'a', text: "\"That's great! Here's how to make it even better...\"", value: "Improvement (Coach)" },
            { id: 'b', text: "\"I love it. Let's do it.\"", value: "Enthusiasm (Cheerleader)" },
            { id: 'c', text: "\"Interesting—have you thought about [potential problem]?\"", value: "Critique (Challenger)" },
            { id: 'd', text: "\"What's making you excited about this?\"", value: "Curiosity (Explorer)" },
            { id: 'e', text: "Depends on context—I want all of these at different times", value: "Context-dependent" }
        ],
        placeholder: "Add nuance if you want..."
    }
];
