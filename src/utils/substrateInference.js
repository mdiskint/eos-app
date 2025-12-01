// Substrate Inference Logic
// Takes user answers and calculates their emotional substrate profile

/**
 * Infer substrate profile from quiz answers
 * @param {Object} answers - Map of questionId -> selected option value
 * @param {Array} questions - Array of question objects with substrate mappings
 * @returns {Object} - Substrate profile with 7 dimensions
 */
export function inferSubstrates(answers, questions) {
    // Initialize vote counters for each substrate
    const votes = {
        threat: {},
        drive: {},
        energy: {},
        selfConcept: {},
        processing: {},
        agencyOrientation: {},
        uncertainty: {}
    };

    // Count votes from each answer
    Object.entries(answers).forEach(([questionId, selectedValue]) => {
        const question = questions.find(q => q.id === parseInt(questionId));
        if (!question) return;

        const selectedOption = question.options.find(opt => opt.value === selectedValue);
        if (!selectedOption || !selectedOption.substrates) return;

        // Add votes for each substrate this answer maps to
        Object.entries(selectedOption.substrates).forEach(([substrate, value]) => {
            if (!votes[substrate][value]) {
                votes[substrate][value] = 0;
            }
            votes[substrate][value]++;
        });
    });

    // Determine winner for each substrate (highest vote count)
    const profile = {};
    Object.entries(votes).forEach(([substrate, valueCounts]) => {
        if (Object.keys(valueCounts).length === 0) {
            profile[substrate] = 'mixed'; // Default if no votes
            return;
        }

        // Find the value with the most votes
        let maxVotes = 0;
        let winner = null;
        let tieCount = 0;

        Object.entries(valueCounts).forEach(([value, count]) => {
            if (count > maxVotes) {
                maxVotes = count;
                winner = value;
                tieCount = 1;
            } else if (count === maxVotes) {
                tieCount++;
            }
        });

        // If there's a tie, resolve to 'mixed' or first encountered
        if (tieCount > 1) {
            profile[substrate] = 'mixed';
        } else {
            profile[substrate] = winner;
        }
    });

    return profile;
}

/**
 * Get a human-readable summary of the substrate profile
 * @param {Object} profile - Substrate profile object
 * @returns {Object} - Summary with labels and descriptions
 */
export function getSubstrateSummary(profile) {
    const labels = {
        threat: {
            fight: 'Fight (Direct engagement)',
            flight: 'Flight (Strategic withdrawal)',
            freeze: 'Freeze (Processing pause)',
            fawn: 'Fawn (Harmony-seeking)',
            secure: 'Secure (Grounded response)'
        },
        drive: {
            mastery: 'Mastery (Growth-oriented)',
            agency: 'Agency (Impact-driven)',
            connection: 'Connection (Relationship-focused)',
            security: 'Security (Stability-seeking)'
        },
        energy: {
            intellectual: 'Intellectual (Understanding-driven)',
            creative: 'Creative (Making-oriented)',
            competitive: 'Competitive (Achievement-focused)',
            exploratory: 'Exploratory (Discovery-driven)'
        },
        selfConcept: {
            guilt: 'Guilt (Action-focused)',
            shame: 'Shame (Identity-sensitive)',
            mixed: 'Mixed (Context-dependent)',
            secure: 'Secure (Stable self-view)'
        },
        processing: {
            external: 'External (Talk-to-think)',
            internal: 'Internal (Think-to-talk)',
            mixed: 'Mixed (Flexible)',
            visual: 'Visual (See-to-understand)',
            reset: 'Reset (Action-based)'
        },
        agencyOrientation: {
            driver: 'Driver (Self-directed)',
            collaborator: 'Collaborator (Partnership-oriented)',
            passenger: 'Passenger (Guidance-seeking)',
            independent: 'Independent (Solo-oriented)'
        },
        uncertainty: {
            curious: 'Curious (Opportunity-focused)',
            cautious: 'Cautious (Risk-aware)',
            controlling: 'Controlling (Planning-oriented)',
            anxious: 'Anxious (Worry-prone)',
            avoidant: 'Avoidant (Delay-oriented)'
        }
    };

    const summary = {};
    Object.entries(profile).forEach(([substrate, value]) => {
        summary[substrate] = {
            value,
            label: labels[substrate]?.[value] || value
        };
    });

    return summary;
}
