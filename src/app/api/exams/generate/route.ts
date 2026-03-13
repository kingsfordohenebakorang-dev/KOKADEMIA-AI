import { NextResponse } from 'next/server';
import { geminiFlashModel, geminiModel } from '@/lib/gemini';
import { checkRateLimit, getClientIp } from '@/lib/api';

export async function POST(req: Request) {
    try {
        const ip = getClientIp(req as any);
        const { allowed } = checkRateLimit(ip, 10, 60000); // 10 exams per minute per IP limit
        if (!allowed) {
            return NextResponse.json({ error: 'Too many requests.' }, { status: 429 });
        }

        const body = await req.json();
        const { difficulty, topics, contextText, numQuestions } = body;

        // Prompt engineering for full exam generation
        const systemPrompt = `You are an expert actuarial and mathematics professor.
An exam needs to be generated.
Difficulty Level: ${difficulty}/100 
Topics: ${topics ? topics.join(', ') : 'General Actuarial Science'}
Number of Questions requested: ${numQuestions || 3}
Additional Context (Uploads): ${contextText ? contextText.substring(0, 1500) : 'None provided'}

Generate a structured exam with realistic, rigorous questions and detailed step-by-step solutions with marking schemes.
Return precisely a valid JSON object mirroring this TypeScript interface structure:
{
    "examTitle": "Actuarial Mathematics Midterm",
    "durationMinutes": 60,
    "questions": [
        {
            "id": "q1",
            "text": "Question using $LaTeX$ for math...",
            "marks": 10,
            "solution": "Step by step solution in $LaTeX$...",
            "marking_scheme": [
                { "step": "Description of step", "marks": 2 }
            ]
        }
    ]
}
DO NOT include markdown block markers like \`\`\`json. Return only pure JSON context.`;

        // We use geminiModel (Pro) for higher reasoning power for exam generation
        const result = await geminiModel.generateContent(systemPrompt);
        let text = result.response.text().trim();

        if (text.startsWith('\`\`\`json')) {
            text = text.replace(/^\`\`\`json\n/, '').replace(/\n\`\`\`$/, '');
        }

        const data = JSON.parse(text);

        return NextResponse.json({ exam: data }, { status: 200 });

    } catch (error: any) {
        console.error("Exam Generation Error (Gemini):", error);
        return NextResponse.json({ error: 'Failed to generate exam: ' + error.message }, { status: 500 });
    }
}
