// Personality Type Detection System
// Determines user's primary personality type from quiz answers

export const PERSONALITY_TYPES = {
    DRIVER: 'DRIVER',
    THINKER: 'THINKER',
    COLLABORATOR: 'COLLABORATOR',
    CREATOR: 'CREATOR',
    SUPPORTER: 'SUPPORTER',
    CHALLENGER: 'CHALLENGER'
};

export const PERSONALITY_GREETINGS = {
    DRIVER: "Hi! Where are you taking me today, my friend?",
    THINKER: "Hello. I'm here for whatever you need. No rush.",
    COLLABORATOR: "Hey partner. What are we getting into today?",
    CREATOR: "So excited to be here! What are we making?",
    SUPPORTER: "Hey you. What do you need from me today?",
    CHALLENGER: "Let's hear it. I'll tell you what I really think."
};

/**
 * Answer mappings to personality types with weights
 * Format: { questionId: { answerValue: { type: weight } } }
 */
const answerMappings = {
    // Q1: When wrong (Secondary - weight 2)
    1: {
        'pivot_argue': { DRIVER: 2, CHALLENGER: 2 },
        'joke_redirect': { CREATOR: 2 },
        'quiet_recalibrate': { THINKER: 2 },
        'immediate_apologize': { SUPPORTER: 2 },
        'curious_correction': { COLLABORATOR: 2 }
    },

    // Q5: Learning style (Primary - weight 3)
    5: {
        'context_options': { DRIVER: 3 },
        'think_together': { COLLABORATOR: 3 },
        'show_me': { SUPPORTER: 1 },
        'figure_myself': { THINKER: 3 }
    },

    // Q6: Confrontation (Secondary - weight 2)
    6: {
        'same_day': { DRIVER: 2, CHALLENGER: 2 },
        'let_go': { CREATOR: 1 },
        'still_figuring': { THINKER: 2 },
        'hinted_joke': { SUPPORTER: 2 },
        'waited_understood': { COLLABORATOR: 2 }
    },

    // Q13: Deadline pressure (Secondary - weight 2)
    13: {
        'go_harder': { DRIVER: 2, CHALLENGER: 2 },
        'workaround_shortcut': { CREATOR: 2 },
        'brain_freeze': { THINKER: 1, SUPPORTER: 1 },
        'reaching_help': { SUPPORTER: 2, COLLABORATOR: 1 }
    },

    // Q14: Whiteboard (Primary - weight 3)
    14: {
        'leading_organizing': { DRIVER: 3, CHALLENGER: 1 },
        'debating_building': { COLLABORATOR: 3 },
        'listening_adding': { SUPPORTER: 2 },
        'thinking_quietly': { THINKER: 3 }
    },

    // Q21: When stuck - MOST IMPORTANT (Primary - weight 3, used as tiebreaker)
    21: {
        'questions_find': { DRIVER: 3 },
        'thought_partner': { COLLABORATOR: 3 },
        'tell_move': { SUPPORTER: 2 },
        'time_alone': { THINKER: 3 }
    },

    // Q4: 1am energy (Tertiary - weight 1)
    4: {
        'deep_learning': { THINKER: 1 },
        'making_building': { CREATOR: 1 },
        'competing_chasing': { DRIVER: 1, CHALLENGER: 1 },
        'wandering_following': { CREATOR: 1 }
    },

    // Q7: After failure (Tertiary - weight 1)
    7: {
        'what_fix': { DRIVER: 1, COLLABORATOR: 1 },
        'quiet_processing': { THINKER: 1 },
        'wrong_with_me': { SUPPORTER: 1 },
        'next_thing': { CHALLENGER: 1 }
    },

    // Q8: Uncertainty (Tertiary - weight 1)
    8: {
        'open_door': { CREATOR: 1, CHALLENGER: 1 },
        'fog_cautious': { THINKER: 1 },
        'puzzle_mapping': { DRIVER: 1 },
        'cliff_tightens': { SUPPORTER: 1 }
    },

    // Q12: Great conversation (Tertiary - weight 1)
    12: {
        'understand_new': { THINKER: 1 },
        'want_make': { CREATOR: 1 },
        'won_solved': { DRIVER: 1, CHALLENGER: 1, COLLABORATOR: 1 },
        'rabbit_holes': { CREATOR: 1 }
    }
};

/**
 * Determine personality type from quiz answers
 * @param {Object} answers - Quiz answers object { questionId: answerValue }
 * @returns {string} - Personality type (one of PERSONALITY_TYPES)
 */
export function determinePersonalityType(answers) {
    // Initialize scores
    const scores = {
        [PERSONALITY_TYPES.DRIVER]: 0,
        [PERSONALITY_TYPES.THINKER]: 0,
        [PERSONALITY_TYPES.COLLABORATOR]: 0,
        [PERSONALITY_TYPES.CREATOR]: 0,
        [PERSONALITY_TYPES.SUPPORTER]: 0,
        [PERSONALITY_TYPES.CHALLENGER]: 0
    };

    // Calculate scores based on answers
    Object.entries(answers).forEach(([questionId, answerValue]) => {
        const qId = parseInt(questionId);
        const mappings = answerMappings[qId];

        if (mappings && mappings[answerValue]) {
            const typeWeights = mappings[answerValue];
            Object.entries(typeWeights).forEach(([type, weight]) => {
                scores[type] += weight;
            });
        }
    });

    // Find the highest score
    let maxScore = 0;
    let winningTypes = [];

    Object.entries(scores).forEach(([type, score]) => {
        if (score > maxScore) {
            maxScore = score;
            winningTypes = [type];
        } else if (score === maxScore && score > 0) {
            winningTypes.push(type);
        }
    });

    // If there's a tie, use Q21 as tiebreaker
    if (winningTypes.length > 1 && answers[21]) {
        const q21Mapping = answerMappings[21][answers[21]];
        if (q21Mapping) {
            for (const type of winningTypes) {
                if (q21Mapping[type]) {
                    return type;
                }
            }
        }
    }

    // Return the winning type (or first if still tied)
    return winningTypes[0] || PERSONALITY_TYPES.COLLABORATOR; // Default fallback
}

/**
 * Get greeting for a personality type
 * @param {string} type - Personality type
 * @returns {string} - Opening greeting
 */
export function getGreeting(type) {
    return PERSONALITY_GREETINGS[type] || PERSONALITY_GREETINGS.COLLABORATOR;
}
