import { NextRequest, NextResponse } from 'next/server';
import { formSchema } from '@/lib/formSchema';

const ENTRY_ID_MAP: Record<string, string> = {
  "email": "entry.1123493236",
  "q2_routine": "entry.492108754",
  "q3_bathroom_preference": "entry.1843025121",
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

        const googleFormUrl = new URL('https://docs.google.com/forms/d/e/1FAIpQLSf3Pqhjxp9EtA7YukWgHx7ExEQIJt3iCJ22_BtJsfmjGOumfg/formResponse');
        
        Object.entries(validatedData).forEach(([key, value]) => {
            const entryId = ENTRY_ID_MAP[key];
            if (entryId && value) {
                if (Array.isArray(value)) {
                    value.forEach(item => googleFormUrl.searchParams.append(entryId, item));
                } else {
                    googleFormUrl.searchParams.append(entryId, String(value));
                }
            }
        });

        console.log("Submitting to Google Form URL:", googleFormUrl.toString());

        await fetch(googleFormUrl.toString(), {
            method: 'POST',
        }).catch(err => console.error("Google Form submission failed:", err));

        return NextResponse.json(
            { message: 'Form submitted successfully' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Submit form failed:', error);
        return NextResponse.json(
            { message: 'Form submission failed on server', error: (error as Error).message },
            { status: 500 }
        );
    }
}