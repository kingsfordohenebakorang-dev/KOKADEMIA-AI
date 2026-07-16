import { GoogleGenerativeAI } from "@google/generative-ai";
import { getEnv } from "./env";

const env = getEnv();

// Initialize the Gemini API client
const genAI = new GoogleGenerativeAI(env.GOOGLE_API_KEY || "");

// The primary model for complex actuarial tasks
export const geminiModel = genAI.getGenerativeModel({
    model: "gemini-flash-latest",
});

// A faster model for simple tasks
export const geminiFlashModel = genAI.getGenerativeModel({
    model: "gemini-flash-latest",
});

/**
 * Generates an AI response for an actuarial query using Google AI Studio.
 */
export async function generateActuarialResponse(prompt: string, mode: string): Promise<string> {
    if (!env.GOOGLE_API_KEY) {
        throw new Error("GOOGLE_API_KEY is not configured.");
    }

    const systemPrompt = `You are Kokademia Tutor, an advanced actuarial platform.
Mode: ${mode === 'tutor' ? 'Tutor Mode - provide comprehensive, step-by-step mathematical explanations, using markdown and LaTeX where appropriate. Start with Problem Statement, Assumptions, Derivation, and Final Result.' : 'Study Mode - Provide concise and direct answers focusing on the mathematical output and symbolic verification.'}
Structure your response professionally, emphasizing accuracy. Use LaTeX inside $$ for math equations (e.g. $$ E[X] = \\mu $$) and ensure all symbolic derivations are clear.`;

    const chat = geminiModel.startChat({
        history: [
            { role: "user", parts: [{ text: systemPrompt }] },
            { role: "model", parts: [{ text: "Understood. I am ready to operate as the Kokademia Tutor." }] },
        ],
    });

    const result = await chat.sendMessage(prompt);
    return result.response.text();
}
