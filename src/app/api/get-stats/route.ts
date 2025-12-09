import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { z } from 'zod';

const DB_PATH = path.join(process.cwd(), 'submissions.json');

type SubmissionRecord = {
    id: number;
    q12_gender_identity?: string;
    q15_rent_budget?: string;
    q14_location?: string;
    [key: string]: unknown;
};

async function readDb(): Promise<SubmissionRecord[]> {
    try {
        const data = await fs.readFile(DB_PATH, 'utf8');
        return JSON.parse(data) as SubmissionRecord[];
    } catch (error: unknown) {
        if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
            return [];
        }
        throw error;
    }
}

const countFrequency = (arr: (string | undefined)[]) => {
    return arr.reduce((acc, value) => {
        if (!value) return acc;
        acc[value] = (acc[value] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);
};

const DISTRICT_MAP: Record<string, string> = {
    // Taipei
    '中正': '中正區', '大同': '大同區', '中山': '中山區', '松山': '松山區',
    '大安': '大安區', '萬華': '萬華區', '信義': '信義區', '士林': '士林區',
    '北投': '北投區', '內湖': '內湖區', '南港': '南港區', '文山': '文山區',
    // New Taipei
    '板橋': '板橋區', '三重': '三重區', '中和': '中和區', '永和': '永和區',
    '新莊': '新莊區', '新店': '新店區', '樹林': '樹林區', '鶯歌': '鶯歌區',
    '三峽': '三峽區', '淡水': '淡水區', '汐止': '汐止區', '瑞芳': '瑞芳區',
    '土城': '土城區', '蘆洲': '蘆洲區', '五股': '五股區', '泰山': '泰山區',
    '林口': '林口區', '深坑': '深坑區', '石碇': '石碇區', '坪林': '坪林區',
    '三芝': '三芝區', '石門': '石門區', '八里': '八里區', '平溪': '平溪區',
    '雙溪': '雙溪區', '貢寮': '貢寮區', '金山': '金山區', '萬里': '萬里區', '烏來': '烏來區',
};

const normalizeLocation = (rawLocation: string): string | null => {
    for (const key in DISTRICT_MAP) {
        if (rawLocation.includes(key)) {
            return DISTRICT_MAP[key];
        }
    }
    return null;
};

const parseAndCountLocations = (locations: (string | undefined)[]) => {
    const allLocations = locations
        .flatMap(l => l?.split(/[\s,，、]+/)) // Split by various delimiters
        .filter((l): l is string => !!l)      // Remove empty strings
        .map(normalizeLocation)                // Normalize each location
        .filter((l): l is string => !!l);      // Remove non-matches
    return countFrequency(allLocations);
}

export async function GET(req: NextRequest) {
    try {
        const db = await readDb();
        const totalSubmissions = db.length;
        
        const { searchParams } = new URL(req.url);
        const userId = z.coerce.number().optional().parse(searchParams.get('userId'));

        let rank = userId ? db.findIndex(submission => submission.id === userId) + 1 : totalSubmissions;
        if (rank === 0) rank = totalSubmissions;


        const genderIdentities = db.map(s => s.q12_gender_identity);
        const rentBudgets = db.map(s => s.q15_rent_budget);
        const locations = db.map(s => s.q14_location);

        const stats = {
            rank,
            total: totalSubmissions,
            genderRatio: countFrequency(genderIdentities),
            budgetDistribution: countFrequency(rentBudgets),
            locationRanking: parseAndCountLocations(locations),
        };

        return NextResponse.json(stats, { status: 200 });
    } catch (error) {
        console.error(error);
        if (error instanceof z.ZodError) {
            return NextResponse.json({ message: 'Invalid userId parameter', error: error.issues }, { status: 400 });
        }
        return NextResponse.json({ message: 'An error occurred', error }, { status: 500 });
    }
}
