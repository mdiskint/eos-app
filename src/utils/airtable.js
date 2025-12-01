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

export const completeQuizSession = async (recordId, answers, eosResult, optionalText = {}, sliders = {}, finalText = "") => {
    if (!recordId) return;

    try {
        // Merge sliders into answers for storage
        const fullAnswers = {
            ...answers,
            calibration: sliders
        };

        // Merge final text into optional details
        const fullOptionalText = {
            ...optionalText,
            final_context: finalText
        };

        const fields = {
            "Answers": JSON.stringify(fullAnswers),
            "Optional Details": JSON.stringify(fullOptionalText),
            "EOS Result": eosResult,
            "Status": "Completed",
            "Completed At": new Date().toISOString()
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
