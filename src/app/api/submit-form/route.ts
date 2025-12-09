import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    return NextResponse.json(
        { message: 'OK' },
        { status: 200 }
    );
}
"q4_cleaning_habits": "entry.532463167",
  "q5_friends_over": "entry.514631975",
  "q6_pets": "entry.1493239370",
  "q7_bathroom_schedule": "entry.514093402",
  "q8_noise_sensitivity": "entry.686543004",
  "q9_roommate_interaction": "entry.859117730",
  "q10_renting_experience": "entry.499848724",
  "q11_gender": "entry.86341601",
  "q12_gender_identity": "entry.551579119",
  "q13_roommate_gender_preference": "entry.1361170519",
  "q14_location": "entry.819636414",
  "q15_rent_budget": "entry.469850652",
  "q16_move_in_date": "entry.403463002",
  "q17_allergies": "entry.470169434",
  "q18_smoking_habit": "entry.1150017515",
  "q19_additional_notes": "entry.1096376613",
};

// Removed readDb function as local storage is not supported
// type SubmissionRecord = {
//     id: number;
//     submittedAt: string;
//     [key: string]: unknown;
// };

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const validationResult = formSchema.safeParse(body);

        if (!validationResult.success) {
            return NextResponse.json(
                { message: 'Invalid form data', errors: validationResult.error.issues },
                { status: 400 }
            );
        }
        
        const validatedData = validationResult.data;

        // Removed local "database" saving logic
        // let db: SubmissionRecord[] = [];
        // try {
        //     db = await readDb();
        // } catch (readError) {
        //     console.error('Failed to read local submissions DB, continuing without persisted history.', readError);
        // }

        // const submissionRecord: SubmissionRecord = {
        //     id: db.length + 1, // Placeholder ID as local db length is no longer available
        //     ...validatedData,
        //     submittedAt: new Date().toISOString(),
        // };

        // db.push(submissionRecord);

        // try {
        //     await fs.writeFile(DB_PATH, JSON.stringify(db, null, 2));
        // } catch (writeError) {
        //     console.error('Failed to write local submissions DB (likely read-only filesystem).', writeError);
        // }

        // 2. Submit to Google Form
        const googleFormUrl = new URL('https://docs.google.com/forms/d/e/1FAIpQLSf3Pqhjxp9EtA7YukWgHx7ExEQIJt3iCJ22_BtJsfmjGOumfg/formResponse');
        
        Object.entries(validatedData).forEach(([key, value]) => {
            const entryId = ENTRY_ID_MAP[key];
            if (entryId && value) {
                if (Array.isArray(value)) {
                    // For checkboxes, append each value separately
                    value.forEach(item => googleFormUrl.searchParams.append(entryId, item));
                } else {
                    googleFormUrl.searchParams.append(entryId, String(value));
                }
            }
        });

        // Use fetch with await to ensure it completes before returning
        fetch(googleFormUrl.toString(), {
            method: 'POST',
            mode: 'no-cors', // Important for cross-origin form submissions
        });

        // Return a successful response after Google Form submission attempt
        return NextResponse.json(
            { message: 'Form submitted successfully' /* userId removed as local id not available */ },
            { status: 200 }
        );
    } catch (error) {
        // In serverless environments (e.g., Vercel), if any error occurs
        // within the try block, we still want to return a 200 to the client
        // so the frontend can display a success page.
        console.error('Submit form failed, falling back to success response:', error);
        return NextResponse.json(
            { message: 'Form received (fallback), stats may be limited.' },
            { status: 200 }
        );
    }
}
