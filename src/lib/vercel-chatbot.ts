import { generateText } from 'ai';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { getEnv } from "./env";

const env = getEnv();

// Initialize the Vercel AI SDK wrapper for Google Gemini
const google = createGoogleGenerativeAI({
    apiKey: env.GOOGLE_API_KEY || "",
});

/**
 * Generates an response for an actuarial query using Vercel AI SDK Core / Chatbot architecture
 */
export async function generateActuarialResponseVercel(prompt: string, mode: string): Promise<string> {
    if (!env.GOOGLE_API_KEY) {
        throw new Error("GOOGLE_API_KEY is not configured.");
    }

    const systemPromptText = `You are KOK Trust AI Tutor, an advanced actuarial platform.
Mode: ${mode === 'tutor' ? 'Tutor Mode - provide comprehensive, step-by-step mathematical explanations, using markdown and LaTeX where appropriate. Start with Problem Statement, Assumptions, Derivation, and Final Result.' : 'Study Mode - Provide concise and direct answers focusing on the mathematical output and symbolic verification.'}
Structure your response professionally, emphasizing accuracy. Use LaTeX inside $$ for math equations (e.g. $$ E[X] = \\mu $$) and ensure all symbolic derivations are clear.`;

    const { text } = await generateText({
        model: google('gemini-1.5-flash-latest'),
        system: systemPromptText,
        prompt: prompt,
        temperature: 0.1,
    });

    // Inject Vercel style logging framework around the response for visual demonstration
    const prefix = `### Vercel AI SDK / Chatbot Inference 🚀
* **Model**: @ai-sdk/google (gemini-1.5-flash)
* **Status**: Stream Complete
* **Engine**: Vercel Serverless Core

---

`;
    return prefix + text;
}
