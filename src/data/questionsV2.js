// EOS v2 Questions - 21 questions mapping to 7 emotional substrates
// Each question includes substrate mappings for inference

export const questionsV2 = [
    {
        id: 1,
        text: "You're mid-sentence, explaining something, and you realize you're wrong. In the next three seconds, you...",
        options: [
            {
                id: 'a',
                text: "Pivot and argue a slightly different point without missing a beat",
                value: "pivot_argue",
                substrates: { threat: 'fight' }
            },
            {
                id: 'b',
                text: "Make a joke and change the subject",
                value: "joke_redirect",
                substrates: { threat: 'flight' }
            },
            {
                id: 'c',
                text: "Go quiet while your brain scrambles to recalibrate",
                value: "quiet_recalibrate",
                substrates: { threat: 'freeze' }
            },
            {
                id: 'd',
                text: "Immediately say \"wait, no, you're right, sorry\"",
                value: "immediate_apologize",
                substrates: { threat: 'fawn' }
            },
            {
                id: 'e',
                text: "Say \"oh interesting, actually I think I'm wrong\" and get curious about why",
                value: "curious_correction",
                substrates: { threat: 'secure' }
            }
        ]
    },
    {
        id: 2,
        text: "Something's been bugging you all day. It finally clicks. How did that happen?",
        options: [
            {
                id: 'a',
                text: "I was talking it through with someone and heard myself say the answer",
                value: "talking_through",
                substrates: { processing: 'external' }
            },
            {
                id: 'b',
                text: "I was alone, doing something unrelated, and it just surfaced",
                value: "alone_surfaced",
                substrates: { processing: 'internal' }
            },
            {
                id: 'c',
                text: "I wrote it out or sketched it until I could see it",
                value: "wrote_sketched",
                substrates: { processing: 'visual' }
            },
            {
                id: 'd',
                text: "Honestly, I'm not sure—it just eventually made sense",
                value: "eventually_sense",
                substrates: { processing: 'mixed' }
            }
        ]
    },
    {
        id: 3,
        text: "Years from now, the projects you'll still remember are the ones where...",
        options: [
            {
                id: 'a',
                text: "You became noticeably better at something",
                value: "became_better",
                substrates: { drive: 'mastery' }
            },
            {
                id: 'b',
                text: "You actually changed something that mattered",
                value: "changed_something",
                substrates: { drive: 'agency' }
            },
            {
                id: 'c',
                text: "You were part of a team that really worked",
                value: "team_worked",
                substrates: { drive: 'connection' }
            },
            {
                id: 'd',
                text: "You built something that's still standing",
                value: "still_standing",
                substrates: { drive: 'security' }
            }
        ]
    },
    {
        id: 4,
        text: "It's 1am and you're not tired. You're in it. What are you doing?",
        options: [
            {
                id: 'a',
                text: "Deep in something—learning how it works, why it works",
                value: "deep_learning",
                substrates: { energy: 'intellectual' }
            },
            {
                id: 'b',
                text: "Making something—building, writing, combining ideas",
                value: "making_building",
                substrates: { energy: 'creative' }
            },
            {
                id: 'c',
                text: "Competing or chasing something—a goal, a game, a challenge",
                value: "competing_chasing",
                substrates: { energy: 'competitive' }
            },
            {
                id: 'd',
                text: "Wandering—no destination, just following whatever's interesting",
                value: "wandering_following",
                substrates: { energy: 'exploratory' }
            }
        ]
    },
    {
        id: 5,
        text: "You're learning something new from someone who's really good. What makes it click?",
        options: [
            {
                id: 'a',
                text: "They give me context and options, and let me figure it out",
                value: "context_options",
                substrates: { agencyOrientation: 'driver' }
            },
            {
                id: 'b',
                text: "We think through it together, like collaborators",
                value: "think_together",
                substrates: { agencyOrientation: 'collaborator' }
            },
            {
                id: 'c',
                text: "They just show me what to do—I'll understand why later",
                value: "show_me",
                substrates: { agencyOrientation: 'passenger' }
            },
            {
                id: 'd',
                text: "Honestly, I'd rather go figure it out myself and come back with questions",
                value: "figure_myself",
                substrates: { agencyOrientation: 'independent' }
            }
        ]
    },
    {
        id: 6,
        text: "Someone you care about did something that bothered you. It's been a week. Have you said something?",
        options: [
            {
                id: 'a',
                text: "Yes—probably the same day",
                value: "same_day",
                substrates: { threat: 'fight' }
            },
            {
                id: 'b',
                text: "No—I've kind of let it go, or convinced myself it wasn't a big deal",
                value: "let_go",
                substrates: { threat: 'flight' }
            },
            {
                id: 'c',
                text: "No—I'm still figuring out what I even want to say",
                value: "still_figuring",
                substrates: { threat: 'freeze' }
            },
            {
                id: 'd',
                text: "Sort of—I hinted at it or made a joke about it",
                value: "hinted_joke",
                substrates: { threat: 'fawn' }
            },
            {
                id: 'e',
                text: "Yes—I waited until I understood what I actually felt, then brought it up",
                value: "waited_understood",
                substrates: { threat: 'secure' }
            }
        ]
    },
    {
        id: 7,
        text: "You bombed something that mattered. It's the next morning. What does your brain sound like?",
        options: [
            {
                id: 'a',
                text: "\"Okay, what went wrong and how do I fix it for next time\"",
                value: "what_fix",
                substrates: { selfConcept: 'guilt' }
            },
            {
                id: 'b',
                text: "Quiet—still processing, not ready to analyze yet",
                value: "quiet_processing",
                substrates: { selfConcept: 'mixed' }
            },
            {
                id: 'c',
                text: "Some version of \"what is wrong with me\" on repeat",
                value: "wrong_with_me",
                substrates: { selfConcept: 'shame' }
            },
            {
                id: 'd',
                text: "Already focused on the next thing—I don't dwell",
                value: "next_thing",
                substrates: { selfConcept: 'secure' }
            }
        ]
    },
    {
        id: 8,
        text: "You're about to start something and you can't see the whole path. Does that feel more like...",
        options: [
            {
                id: 'a',
                text: "An open door—exciting, full of possibility",
                value: "open_door",
                substrates: { uncertainty: 'curious' }
            },
            {
                id: 'b',
                text: "A fog—I want to see further before I step in",
                value: "fog_cautious",
                substrates: { uncertainty: 'cautious' }
            },
            {
                id: 'c',
                text: "A puzzle—I start mapping it immediately",
                value: "puzzle_mapping",
                substrates: { uncertainty: 'controlling' }
            },
            {
                id: 'd',
                text: "A cliff—my stomach tightens until I know more",
                value: "cliff_tightens",
                substrates: { uncertainty: 'anxious' }
            }
        ]
    },
    {
        id: 9,
        text: "When I spot a gap in your reasoning, I'll point it out. How much friction do you want?",
        options: [
            {
                id: 'a',
                text: "Push hard—I can take it",
                value: "challenge_hard",
                substrates: { selfConcept: 'secure', threat: 'fight' }
            },
            {
                id: 'b',
                text: "Push, but be warm about it",
                value: "challenge_warm",
                substrates: { agencyOrientation: 'collaborator' }
            },
            {
                id: 'c',
                text: "Go easy—I'm sensitive to criticism",
                value: "challenge_gentle",
                substrates: { selfConcept: 'shame', threat: 'freeze' }
            }
        ],
        allowText: true,
        placeholder: "e.g., I need directness, but tone matters more than I'd like to admit..."
    },
    {
        id: 10,
        text: "Terrible day. You just walked in the door. What do you need in the next 30 minutes?",
        options: [
            {
                id: 'a',
                text: "Someone to listen while I vent",
                value: "listen_vent",
                substrates: { processing: 'external' }
            },
            {
                id: 'b',
                text: "To be alone and not talk to anyone yet",
                value: "alone_quiet",
                substrates: { processing: 'internal' }
            },
            {
                id: 'c',
                text: "To do something completely unrelated—move, cook, scroll",
                value: "unrelated_reset",
                substrates: { processing: 'reset' }
            },
            {
                id: 'd',
                text: "A hug and then maybe we can talk",
                value: "hug_talk",
                substrates: { drive: 'connection', processing: 'external' }
            }
        ]
    },
    {
        id: 11,
        text: "What's the work feeling that actually ruins your day?",
        options: [
            {
                id: 'a',
                text: "Realizing you're out of your depth",
                value: "out_depth",
                substrates: { drive: 'mastery' }
            },
            {
                id: 'b',
                text: "Feeling like nothing you do matters",
                value: "nothing_matters",
                substrates: { drive: 'agency' }
            },
            {
                id: 'c',
                text: "Working hard and no one noticing",
                value: "no_noticing",
                substrates: { drive: 'connection' }
            },
            {
                id: 'd',
                text: "The ground shifting—goals changing, plans falling through",
                value: "ground_shifting",
                substrates: { drive: 'security' }
            }
        ]
    },
    {
        id: 12,
        text: "You just had one of those conversations. The kind you'll think about later. What made it that?",
        options: [
            {
                id: 'a',
                text: "I understand something I didn't before",
                value: "understand_new",
                substrates: { energy: 'intellectual' }
            },
            {
                id: 'b',
                text: "I want to go make something",
                value: "want_make",
                substrates: { energy: 'creative' }
            },
            {
                id: 'c',
                text: "I feel like I won something, or we solved something together",
                value: "won_solved",
                substrates: { energy: 'competitive' }
            },
            {
                id: 'd',
                text: "I have three new rabbit holes I want to explore",
                value: "rabbit_holes",
                substrates: { energy: 'exploratory' }
            }
        ]
    },
    {
        id: 13,
        text: "It's 4pm. The thing is due at 6pm. It's not working. What's happening?",
        options: [
            {
                id: 'a',
                text: "I go harder—more focus, more intensity, I'll force it",
                value: "go_harder",
                substrates: { threat: 'fight' }
            },
            {
                id: 'b',
                text: "I start looking for a workaround or a shortcut",
                value: "workaround_shortcut",
                substrates: { threat: 'flight' }
            },
            {
                id: 'c',
                text: "My brain is starting to freeze—I don't know where to start",
                value: "brain_freeze",
                substrates: { threat: 'freeze' }
            },
            {
                id: 'd',
                text: "I'm already reaching out to someone who can help",
                value: "reaching_help",
                substrates: { threat: 'fawn', drive: 'connection' }
            }
        ]
    },
    {
        id: 14,
        text: "There's a whiteboard, five people, and a problem. Where are you?",
        options: [
            {
                id: 'a',
                text: "At the board, organizing or leading the conversation",
                value: "leading_organizing",
                substrates: { agencyOrientation: 'driver', drive: 'agency' }
            },
            {
                id: 'b',
                text: "In the mix, actively debating and building on ideas",
                value: "debating_building",
                substrates: { agencyOrientation: 'collaborator' }
            },
            {
                id: 'c',
                text: "Listening, adding when I have something useful",
                value: "listening_adding",
                substrates: { agencyOrientation: 'passenger' }
            },
            {
                id: 'd',
                text: "Thinking quietly, I'll share when I've got something solid",
                value: "thinking_quietly",
                substrates: { agencyOrientation: 'independent', processing: 'internal' }
            }
        ]
    },
    {
        id: 15,
        text: "Someone whose opinion you actually respect just said your work is excellent. First internal reaction?",
        options: [
            {
                id: 'a',
                text: "Genuine pleasure—I feel it and take it in",
                value: "genuine_pleasure",
                substrates: { selfConcept: 'secure' }
            },
            {
                id: 'b',
                text: "A quick scan: do they mean it? are they just being nice?",
                value: "quick_scan",
                substrates: { selfConcept: 'shame' }
            },
            {
                id: 'c',
                text: "Deflection reflex—\"oh it's not that good\" or \"I got lucky\"",
                value: "deflection_reflex",
                substrates: { selfConcept: 'shame' }
            },
            {
                id: 'd',
                text: "Fuel—I want to do more, go further",
                value: "fuel_more",
                substrates: { drive: 'mastery' }
            }
        ]
    },
    {
        id: 16,
        text: "Big decision, could go either way. How does it actually get made?",
        options: [
            {
                id: 'a',
                text: "I list it out—pros, cons, framework",
                value: "list_framework",
                substrates: { processing: 'internal' }
            },
            {
                id: 'b',
                text: "I talk to people until I hear myself land somewhere",
                value: "talk_land",
                substrates: { processing: 'external' }
            },
            {
                id: 'c',
                text: "I sit with it until my gut tells me",
                value: "sit_gut",
                substrates: { processing: 'internal' }
            },
            {
                id: 'd',
                text: "Honestly? I wait until I have to decide",
                value: "wait_decide",
                substrates: { uncertainty: 'avoidant' }
            }
        ]
    },
    {
        id: 17,
        text: "Someone offers you something exciting with real downside. What happens first?",
        options: [
            {
                id: 'a',
                text: "I feel the pull toward yes",
                value: "pull_yes",
                substrates: { uncertainty: 'curious' }
            },
            {
                id: 'b',
                text: "I start thinking about what could go wrong",
                value: "what_wrong",
                substrates: { uncertainty: 'cautious' }
            },
            {
                id: 'c',
                text: "I start figuring out how to get the upside while limiting the downside",
                value: "limit_downside",
                substrates: { uncertainty: 'controlling' }
            },
            {
                id: 'd',
                text: "I feel my stomach clench",
                value: "stomach_clench",
                substrates: { uncertainty: 'anxious' }
            }
        ]
    },
    {
        id: 18,
        text: "The thing is finally done. Tomorrow is wide open. What do you actually do?",
        options: [
            {
                id: 'a',
                text: "Something totally different—novelty, exploration",
                value: "novelty_exploration",
                substrates: { energy: 'exploratory' }
            },
            {
                id: 'b',
                text: "Nothing. Just quiet and alone",
                value: "quiet_alone",
                substrates: { processing: 'internal' }
            },
            {
                id: 'c',
                text: "Be with people I've been neglecting",
                value: "people_neglecting",
                substrates: { drive: 'connection' }
            },
            {
                id: 'd',
                text: "Something small and satisfying—clean, organize, finish a little thing",
                value: "small_satisfying",
                substrates: { drive: 'mastery' }
            }
        ]
    },
    {
        id: 19,
        text: "You and someone you love are on opposite sides of something. The argument ended an hour ago. Where are you?",
        options: [
            {
                id: 'a',
                text: "Already talking again—I hate leaving things unresolved",
                value: "talking_unresolved",
                substrates: { threat: 'fight' }
            },
            {
                id: 'b',
                text: "Somewhere else—I need space before I can come back",
                value: "space_comeback",
                substrates: { threat: 'flight' }
            },
            {
                id: 'c',
                text: "Stuck—I want to fix it but don't know how to re-approach",
                value: "stuck_fix",
                substrates: { threat: 'freeze' }
            },
            {
                id: 'd',
                text: "Composing an apology, even if I'm not sure I was wrong",
                value: "composing_apology",
                substrates: { threat: 'fawn' }
            }
        ]
    },
    {
        id: 20,
        text: "If you could design your ideal Tuesday, it would have a lot of...",
        options: [
            {
                id: 'a',
                text: "Hard problems that make you think",
                value: "hard_problems",
                substrates: { energy: 'intellectual' }
            },
            {
                id: 'b',
                text: "Making things—writing, building, creating",
                value: "making_creating",
                substrates: { energy: 'creative' }
            },
            {
                id: 'c',
                text: "Clear goals and a way to measure if you hit them",
                value: "clear_goals",
                substrates: { energy: 'competitive' }
            },
            {
                id: 'd',
                text: "Space to wander—no tight agenda, room to follow threads",
                value: "space_wander",
                substrates: { energy: 'exploratory' }
            }
        ]
    },
    {
        id: 21,
        text: "You've been stuck on the same thing for three days. What would actually help?",
        options: [
            {
                id: 'a',
                text: "Someone asking the right questions until I find it myself",
                value: "questions_find",
                substrates: { agencyOrientation: 'driver' }
            },
            {
                id: 'b',
                text: "A real thought partner—someone to figure it out with",
                value: "thought_partner",
                substrates: { agencyOrientation: 'collaborator' }
            },
            {
                id: 'c',
                text: "Someone who just tells me what to do so I can move",
                value: "tell_move",
                substrates: { agencyOrientation: 'passenger' }
            },
            {
                id: 'd',
                text: "Honestly? Time alone. I'll get there",
                value: "time_alone",
                substrates: { agencyOrientation: 'independent' }
            }
        ]
    }
];
