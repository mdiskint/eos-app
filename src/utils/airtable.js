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

export const completeQuizSession = async (recordId, answers, eosResult, optionalText = {}, substrateProfile = null) => {
    if (!recordId) return;

    try {
        const fields = {
            "Answers": JSON.stringify(answers),
            "Optional Details": JSON.stringify(optionalText),
            "EOS Result": eosResult,
            "Status": "Completed",
            "Completed At": new Date().toISOString()
        };

        // Add substrate fields if profile is provided
        if (substrateProfile) {
            fields["substrate_threat"] = substrateProfile.threat || 'mixed';
            fields["substrate_drive"] = substrateProfile.drive || 'mixed';
            fields["substrate_energy"] = substrateProfile.energy || 'mixed';
            fields["substrate_self_concept"] = substrateProfile.selfConcept || 'mixed';
            fields["substrate_processing"] = substrateProfile.processing || 'mixed';
            fields["substrate_agency_orientation"] = substrateProfile.agencyOrientation || 'mixed';
            fields["substrate_uncertainty"] = substrateProfile.uncertainty || 'mixed';
        }

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
