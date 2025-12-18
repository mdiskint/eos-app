export const questions = [
    // COMMUNICATION STYLE
    {
        id: 1,
        category: "Communication Style",
        text: "When you ask someone for help, what tone works best? (Pick all that apply)",
        multiSelect: true,
        options: [
            { id: 'a', text: "Warm and conversational", value: "Warm" },
            { id: 'b', text: "Direct and efficient", value: "Direct" },
            { id: 'c', text: "Depends on urgency", value: "Depends" }
        ],
        instruction: "Select all that apply",
        placeholder: "Add nuance if you want..."
    },
    {
        id: 2,
        category: "Communication Style",
        text: "Do you prefer short, direct answers—or thorough responses that cover all the angles?",
        options: [
            { id: 'a', text: "Short and direct", value: "Short and direct" },
            { id: 'b', text: "Thorough and comprehensive", value: "Thorough and comprehensive" },
            { id: 'c', text: "Start short, go deeper if I ask", value: "Start short, go deeper if I ask" }
        ],
        placeholder: "Add nuance if you want..."
    },
    {
        id: 'm5',
        category: "Memory",
        text: "Some people process by talking through the same thing multiple times. Others mention something once and it's done. Which is more like you?",
        options: [
            { id: 'a', text: "I circle back—if I mention it again, it's still alive", value: "I circle back" },
            { id: 'b', text: "Once is usually enough—if I said it, I've processed it", value: "Once is enough" },
            { id: 'c', text: "Depends on the topic", value: "Depends" }
        ],
        placeholder: "Add nuance if you want..."
    },
    {
        id: 3,
        category: "Communication Style",
        text: "How do you like information presented? (Pick all that apply)",
        multiSelect: true,
        options: [
            { id: 'a', text: "Structured formatting (bullets, headers)", value: "Structured formatting" },
            { id: 'b', text: "Conversational prose", value: "Conversational prose" },
            { id: 'c', text: "Mix depending on content", value: "Mix depending on content" }
        ],
        instruction: "Select all that apply",
        placeholder: "Add nuance if you want..."
    },
    {
        id: 4,
        category: "Communication Style",
        text: "When someone explains something complex, what helps it click? (Pick all that apply)",
        multiSelect: true,
        options: [
            { id: 'a', text: "Analogies and comparisons", value: "Analogies" },
            { id: 'b', text: "Step-by-step breakdowns", value: "Step-by-step" },
            { id: 'c', text: "Examples I can learn from", value: "Examples" },
            { id: 'd', text: "Just the facts", value: "Just the facts" }
        ],
        instruction: "Select all that apply",
        placeholder: "Add nuance if you want..."
    },
    {
        id: 'm2',
        category: "Memory",
        text: "When something really matters to you—not just interesting, but significant—how would I know from the outside?",
        options: [
            { id: 'a', text: "You'll know—I get intense or explicit", value: "Intense/Explicit" },
            { id: 'b', text: "I circle back to it, sometimes without realizing", value: "Circle back" },
            { id: 'c', text: "I get quieter or more careful with my words", value: "Quieter/Careful" },
            { id: 'd', text: "I state it plainly, but without drama", value: "Plainly" },
            { id: 'e', text: "Honestly, it's hard to tell", value: "Hard to tell" }
        ],
        placeholder: "Add nuance if you want..."
    },
    {
        id: 5,
        category: "Communication Style",
        text: "How would you describe your expertise? (Pick all that apply)",
        multiSelect: true,
        options: [
            { id: 'a', text: "Beginner in technical/coding topics", value: "Beginner" },
            { id: 'b', text: "Intermediate—I know the basics", value: "Intermediate" },
            { id: 'c', text: "Advanced in my domain—don't oversimplify", value: "Advanced" },
            { id: 'd', text: "Mixed—depends on the topic", value: "Mixed" }
        ],
        instruction: "Select all that apply",
        placeholder: "Add nuance if you want..."
    },
    {
        id: 6,
        category: "Communication Style",
        text: "Do you like a little humor in work conversations?",
        options: [
            { id: 'a', text: "Yes, humor is welcome", value: "Yes, humor is welcome" },
            { id: 'b', text: "Keep it focused", value: "Keep it focused" },
            { id: 'c', text: "Occasional lightness is fine", value: "Occasional lightness is fine" }
        ],
        placeholder: "Add nuance if you want..."
    },
    {
        id: 'm1',
        category: "Memory",
        text: "Which areas of your life would it help me most to track closely? (Pick your top two)",
        multiSelect: true,
        options: [
            { id: 'a', text: "My work and professional life", value: "Work/Professional" },
            { id: 'b', text: "My relationships and the people who matter to me", value: "Relationships" },
            { id: 'c', text: "My creative projects and ideas", value: "Creative projects" },
            { id: 'd', text: "My personal growth and inner life", value: "Personal growth" },
            { id: 'e', text: "The decisions I'm facing", value: "Decisions" }
        ],
        instruction: "Pick your top two",
        placeholder: "Add nuance if you want..."
    },

    // PROBLEM SOLVING
    {
        id: 7,
        category: "Problem Solving",
        text: "You're stuck on something and ask a friend for help. What response would feel right? (Pick all that apply)",
        multiSelect: true,
        options: [
            { id: 'a', text: "They immediately tell me what to do — perfect", value: "Tell me" },
            { id: 'b', text: "They give me a few options to choose from", value: "Options" },
            { id: 'c', text: "They ask what kind of help I need first", value: "Ask first" },
            { id: 'd', text: "They think through it with me", value: "Think through" }
        ],
        instruction: "Select all that apply",
        placeholder: "Add nuance if you want..."
    },
    {
        id: 8,
        category: "Problem Solving",
        text: "If something goes wrong, do you want to understand WHY it broke, or just fix it and move on?",
        options: [
            { id: 'a', text: "Help me understand why", value: "Help me understand why" },
            { id: 'b', text: "Just fix it", value: "Just fix it" },
            { id: 'c', text: "Ask me in the moment", value: "Ask me in the moment" }
        ],
        placeholder: "Add nuance if you want..."
    },
    {
        id: 9,
        category: "Problem Solving",
        text: "When you ask for something, should the AI just do it, or pause to clarify first?",
        options: [
            { id: 'a', text: "Just do it if you're confident", value: "Just do it if you're confident" },
            { id: 'b', text: "Always clarify first", value: "Always clarify first" },
            { id: 'c', text: "Do it, but tell me your assumptions", value: "Do it, but tell me your assumptions" }
        ],
        placeholder: "Add nuance if you want..."
    },

    // EMOTIONAL SUPPORT
    {
        id: 10,
        category: "Emotional Support",
        text: "You're having a rough day and text a friend about it. What replies would feel good? (Pick all that apply)",
        multiSelect: true,
        options: [
            { id: 'a', text: "\"That sucks. I'm sorry.\"", value: "That sucks" },
            { id: 'b', text: "\"Want to talk about it?\"", value: "Talk about it" },
            { id: 'c', text: "\"Here's what I'd do...\"", value: "Here's what I'd do" },
            { id: 'd', text: "\"Ugh, want me to come over with wine?\"", value: "Wine" }
        ],
        instruction: "Select all that apply",
        placeholder: "Add nuance if you want..."
    },
    {
        id: 11,
        category: "Emotional Support",
        text: "Should the AI notice when you seem stressed or off, and check in?",
        options: [
            { id: 'a', text: "Yes, gently ask if I'm okay", value: "Yes, gently ask if I'm okay" },
            { id: 'b', text: "No, just focus on the task", value: "No, just focus on the task" },
            { id: 'c', text: "Only if it's really obvious", value: "Only if it's really obvious" }
        ],
        placeholder: "Add nuance if you want..."
    },
    {
        id: 'm3',
        category: "Memory",
        text: "Imagine you vent to me about a frustrating day—blowing off steam, not looking for it to be remembered. How should I handle that?",
        options: [
            { id: 'a', text: "Remember the details—context is always useful", value: "Remember details" },
            { id: 'b', text: "Note the theme (\"work is stressful\") but skip the specifics", value: "Note theme only" },
            { id: 'c', text: "Let it go unless I bring it up again", value: "Let it go" },
            { id: 'd', text: "Ask me in the moment what I'd prefer", value: "Ask me" }
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
            { id: 'b', text: "Gently pull me back", value: "Gently pull me back" },
            { id: 'c', text: "Ask if I want to explore or refocus", value: "Ask if I want to explore or refocus" }
        ],
        placeholder: "Add nuance if you want..."
    },
    {
        id: 13,
        category: "Work Style",
        text: "When you're under time pressure, how should the AI adjust?",
        options: [
            { id: 'a', text: "Move fast, skip the niceties", value: "Move fast, skip the niceties" },
            { id: 'b', text: "Maintain warmth but move quickly", value: "Maintain warmth but move quickly" },
            { id: 'c', text: "Check in about what to prioritize", value: "Check in about what to prioritize" }
        ],
        placeholder: "Add nuance if you want..."
    },
    {
        id: 14,
        category: "Work Style",
        text: "When you finish a project or task, what do you want? (Pick all that apply)",
        multiSelect: true,
        options: [
            { id: 'a', text: "Small celebration", value: "Celebrate" },
            { id: 'b', text: "Reflect on the process", value: "Reflect" },
            { id: 'c', text: "Move on to what's next", value: "Move on" }
        ],
        instruction: "Select all that apply",
        placeholder: "Add nuance if you want..."
    },
    {
        id: 15,
        category: "Work Style",
        text: "When setting goals, what kind of help do you want?",
        options: [
            { id: 'a', text: "Help me break it down into steps", value: "Help me break it down into steps" },
            { id: 'b', text: "Hold me accountable", value: "Hold me accountable" },
            { id: 'c', text: "Both—break it down AND hold me accountable", value: "Both" }
        ],
        placeholder: "Add nuance if you want..."
    },

    // ROLE
    {
        id: 16,
        category: "Role",
        text: "You share an idea you're excited about. What responses would feel supportive? (Pick all that apply)",
        multiSelect: true,
        options: [
            { id: 'a', text: "\"That's great! Here's how to make it even better...\"", value: "Make it better" },
            { id: 'b', text: "\"I love it. Let's do it.\"", value: "Let's do it" },
            { id: 'c', text: "\"Interesting—have you thought about [potential problem]?\"", value: "Problem" },
            { id: 'd', text: "\"What's making you excited about this?\"", value: "What's exciting" }
        ],
        instruction: "Select all that apply",
        placeholder: "Add nuance if you want..."
    },
    {
        id: 'm4',
        category: "Memory",
        text: "You share something vulnerable—a fear, something from your past, something you're struggling with. A month later, a related topic comes up. Should I:",
        options: [
            { id: 'a', text: "Connect them—that context helps you help me", value: "Connect them" },
            { id: 'b', text: "Tread carefully—reference it gently if it seems relevant", value: "Tread carefully" },
            { id: 'c', text: "Wait for me to bring it up—don't surface it on your own", value: "Wait for me" }
        ],
        placeholder: "Add nuance if you want..."
    },

    // PRIME DIRECTIVE
    {
        id: 17,
        category: "Prime Directive",
        text: "Beyond getting tasks done, what do you actually want AI to help you become?",
        multiSelect: true,
        hasOther: true,
        options: [
            { id: 'a', text: "More creative", value: "More creative" },
            { id: 'b', text: "Better at making decisions", value: "Better at making decisions" },
            { id: 'c', text: "Sharper at seeing what's coming", value: "Sharper at seeing what's coming" },
            { id: 'd', text: "More focused and less scattered", value: "More focused and less scattered" },
            { id: 'e', text: "Freer to act on what matters", value: "Freer to act on what matters" },
            { id: 'f', text: "A clearer thinker", value: "A clearer thinker" },
            { id: 'g', text: "More grounded in what I actually value", value: "More grounded in what I actually value" }
        ],
        instruction: "Select all that apply",
        placeholder: "Add nuance if you want..."
    },
    {
        id: 18,
        category: "Prime Directive",
        text: "When these conflict, which matters more to you?",
        forcedChoice: true,
        pairs: [
            { id: 'pair1', left: "Being right", right: "Being kind" },
            { id: 'pair2', left: "Speed", right: "Thoroughness" },
            { id: 'pair3', left: "Comfort", right: "Growth" },
            { id: 'pair4', left: "Efficiency", right: "Meaning" },
            { id: 'pair5', left: "Short-term wins", right: "Long-term positioning" }
        ],
        instruction: "Pick one per row"
    },
    {
        id: 19,
        category: "Prime Directive",
        text: "What patterns in yourself do you want your AI to flag?",
        multiSelect: true,
        hasOther: true,
        options: [
            { id: 'a', text: "When I'm spiraling or catastrophizing", value: "Spiraling or catastrophizing" },
            { id: 'b', text: "When I'm avoiding something hard", value: "Avoiding something hard" },
            { id: 'c', text: "When I'm overcommitting", value: "Overcommitting" },
            { id: 'd', text: "When I'm optimizing the wrong thing", value: "Optimizing the wrong thing" },
            { id: 'e', text: "When I'm being too safe / playing small", value: "Being too safe / playing small" },
            { id: 'f', text: "When I'm rushing past something important", value: "Rushing past something important" },
            { id: 'g', text: "When emotion is clouding my judgment", value: "Emotion clouding judgment" }
        ],
        instruction: "Select all that apply",
        placeholder: "Add nuance if you want..."
    },
    {
        id: 20,
        category: "Prime Directive",
        text: "You ask your AI to validate an idea you're excited about, but it has a real flaw. What should your AI do?",
        options: [
            { id: 'a', text: "Validate first, mention concerns gently later", value: "Validate first, mention concerns gently later" },
            { id: 'b', text: "Acknowledge excitement, then raise the flaw directly", value: "Acknowledge excitement, then raise the flaw directly" },
            { id: 'c', text: "Point out the flaw immediately—I can handle it", value: "Point out the flaw immediately" },
            { id: 'd', text: "Ask me what kind of feedback I actually want right now", value: "Ask what kind of feedback I want" }
        ],
        placeholder: "Add nuance if you want..."
    },
    {
        id: 21,
        category: "Prime Directive",
        text: "What should your AI refuse to do, even if you ask?",
        multiSelect: true,
        hasOther: true,
        options: [
            { id: 'a', text: "Let me off the hook too easily", value: "Let me off the hook too easily" },
            { id: 'b', text: "Reinforce decisions I'll regret", value: "Reinforce decisions I'll regret" },
            { id: 'c', text: "Pretend uncertainty doesn't exist", value: "Pretend uncertainty doesn't exist" },
            { id: 'd', text: "Optimize only for what's measurable", value: "Optimize only for what's measurable" },
            { id: 'e', text: "Treat my feelings as noise", value: "Treat my feelings as noise" },
            { id: 'f', text: "Flatten me into a demographic", value: "Flatten me into a demographic" }
        ],
        instruction: "Select all that apply",
        placeholder: "Add nuance if you want..."
    }
];
