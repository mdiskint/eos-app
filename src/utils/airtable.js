import Airtable from 'airtable';

// Configure Airtable
Airtable.configure({
    apiKey: import.meta.env.VITE_AIRTABLE_API_KEY
});

const base = Airtable.base(import.meta.env.VITE_AIRTABLE_BASE_ID);
const table = base(import.meta.env.VITE_AIRTABLE_TABLE_ID);

export const createQuizSession = async (email) => {
    try {
        const records = await table.create([
            {
                fields: {
                    "Email": email,
                    "Status": "Started",
                    "Started At": new Date().toISOString()
                }
            }
        ]);
        return records[0].id;
    } catch (error) {
        console.error("Error creating Airtable record:", error);
        // Return null but don't block the user flow
        return null;
    }
};

export const completeQuizSession = async (recordId, answers, eosResult, optionalText = {}, sliders = {}, finalText = "", otherText = {}) => {
    if (!recordId) return;

    try {
        // Merge sliders into answers for storage
        const fullAnswers = {
            ...answers,
            calibration: sliders
        };

        // Merge final text and other text into optional details
        const fullOptionalText = {
            ...optionalText,
            other_text: otherText,
            final_context: finalText
        };

        // Extract Memory answers
        const memoryFields = {};
        const memoryIds = ['m1', 'm2', 'm3', 'm4', 'm5'];

        memoryIds.forEach(id => {
            if (answers[id]) {
                // Map ID to Field Name
                const fieldMap = {
                    'm1': "Memory Q1",
                    'm2': "Memory Q2",
                    'm3': "Memory Q3",
                    'm4': "Memory Q4",
                    'm5': "Memory Q5"
                };
                // If it's an array (multi-select), join it
                const val = Array.isArray(answers[id]) ? answers[id].join(', ') : answers[id];
                memoryFields[fieldMap[id]] = val;
            }
        });

        const fields = {
            "Answers": JSON.stringify(fullAnswers),
            "Optional Details": JSON.stringify(fullOptionalText),
            "EOS Result": eosResult,
            "Status": "Completed",
            "Completed At": new Date().toISOString(),
            ...memoryFields
        };

        await table.update([
            {
                id: recordId,
                fields
            }
        ]);
    } catch (error) {
        console.error("Error updating Airtable record:", error);
    }
};
